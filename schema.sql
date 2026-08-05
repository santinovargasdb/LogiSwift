-- ============================================================
-- LogiSwift — Schema Supabase (Postgres)
-- Ejecutar en el SQL Editor de Supabase, en orden.
-- ============================================================

-- ---------- Perfil / configuración del usuario ----------

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  nombre        text,
  gastos_fijos  numeric(12,2) not null default 0,
  ganancia_meta numeric(12,2) not null default 0,
  creado_en     timestamptz not null default now()
);

-- Crea el perfil automáticamente al registrarse
create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, new.raw_user_meta_data->>'nombre');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Catálogo ----------

create table public.productos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  nombre     text not null,
  precio     numeric(12,2) not null default 0,
  unidad     text not null default 'unidad',
  activo     boolean not null default true,
  creado_en  timestamptz not null default now()
);

create table public.clientes (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  nombre       text not null,
  direccion    text,
  lat          double precision,
  lng          double precision,
  telefono     text,
  notas        text,
  activo       boolean not null default true,
  creado_en    timestamptz not null default now()
);

-- Pedido habitual: se precarga al registrar una venta a este cliente
create table public.cliente_productos (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  cliente_id   uuid not null references public.clientes(id) on delete cascade,
  producto_id  uuid not null references public.productos(id) on delete cascade,
  cantidad     integer not null default 1 check (cantidad > 0),
  unique (cliente_id, producto_id)
);

-- ---------- Jornada ----------

create type public.estado_jornada as enum ('abierta', 'cerrada');

create table public.jornadas (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  fecha            date not null default current_date,
  estado           public.estado_jornada not null default 'abierta',
  total_bultos     integer,          -- se congela al cerrar
  total_facturado  numeric(12,2),    -- se congela al cerrar
  cerrada_en       timestamptz,
  creado_en        timestamptz not null default now(),
  unique (user_id, fecha)
);

-- ---------- Stock del vehículo ----------

create type public.tipo_movimiento as enum ('carga', 'reposicion', 'ajuste');

create table public.stock_movimientos (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  jornada_id   uuid not null references public.jornadas(id) on delete cascade,
  producto_id  uuid not null references public.productos(id) on delete restrict,
  tipo         public.tipo_movimiento not null default 'carga',
  cantidad     integer not null,  -- negativo permitido solo en 'ajuste'
  creado_en    timestamptz not null default now()
);

-- ---------- Hoja de ruta ----------

create table public.hojas_ruta (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  jornada_id  uuid not null references public.jornadas(id) on delete cascade,
  creado_en   timestamptz not null default now(),
  unique (jornada_id)
);

create type public.estado_parada as enum ('pendiente', 'visitado', 'omitido');

create table public.paradas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  hoja_ruta_id  uuid not null references public.hojas_ruta(id) on delete cascade,
  cliente_id    uuid not null references public.clientes(id) on delete restrict,
  orden         integer not null default 0,
  estado        public.estado_parada not null default 'pendiente',
  visitado_en   timestamptz,
  unique (hoja_ruta_id, cliente_id)
);

-- ---------- Ventas ----------

create table public.ventas (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  jornada_id  uuid not null references public.jornadas(id) on delete cascade,
  cliente_id  uuid not null references public.clientes(id) on delete restrict,
  parada_id   uuid references public.paradas(id) on delete set null,
  total       numeric(12,2) not null default 0,
  notas       text,
  creado_en   timestamptz not null default now()
);

create table public.venta_items (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  venta_id         uuid not null references public.ventas(id) on delete cascade,
  producto_id      uuid not null references public.productos(id) on delete restrict,
  cantidad         integer not null check (cantidad > 0),
  precio_unitario  numeric(12,2) not null   -- congelado al momento de la venta
);

-- ---------- Índices ----------

create index on public.clientes (user_id, nombre);
create index on public.productos (user_id, activo);
create index on public.jornadas (user_id, fecha desc);
create index on public.ventas (user_id, jornada_id, creado_en desc);
create index on public.venta_items (venta_id);
create index on public.stock_movimientos (jornada_id, producto_id);
create index on public.paradas (hoja_ruta_id, orden);

-- ---------- Vistas ----------

-- Inventario del vehículo por jornada y producto
create view public.v_inventario_jornada
with (security_invoker = true) as
select
  j.id                                              as jornada_id,
  j.user_id,
  p.id                                              as producto_id,
  p.nombre,
  coalesce(sm.cargado, 0)                           as inicial,
  coalesce(vi.vendido, 0)                           as vendidos,
  coalesce(sm.cargado, 0) - coalesce(vi.vendido, 0) as restante
from public.jornadas j
cross join public.productos p
left join lateral (
  select sum(cantidad) as cargado
  from public.stock_movimientos m
  where m.jornada_id = j.id and m.producto_id = p.id
) sm on true
left join lateral (
  select sum(i.cantidad) as vendido
  from public.venta_items i
  join public.ventas v on v.id = i.venta_id
  where v.jornada_id = j.id and i.producto_id = p.id
) vi on true
where p.user_id = j.user_id
  and (sm.cargado is not null or vi.vendido is not null);

-- Totales por jornada (para el Panel del Día)
create view public.v_totales_jornada
with (security_invoker = true) as
select
  j.id      as jornada_id,
  j.user_id,
  j.fecha,
  j.estado,
  coalesce(sum(i.cantidad), 0)                        as bultos,
  coalesce(sum(i.cantidad * i.precio_unitario), 0)    as facturado
from public.jornadas j
left join public.ventas v      on v.jornada_id = j.id
left join public.venta_items i on i.venta_id  = v.id
group by j.id, j.user_id, j.fecha, j.estado;

-- ---------- Row Level Security ----------

alter table public.profiles           enable row level security;
alter table public.productos          enable row level security;
alter table public.clientes           enable row level security;
alter table public.cliente_productos  enable row level security;
alter table public.jornadas           enable row level security;
alter table public.stock_movimientos  enable row level security;
alter table public.hojas_ruta         enable row level security;
alter table public.paradas            enable row level security;
alter table public.ventas             enable row level security;
alter table public.venta_items        enable row level security;

create policy "perfil propio" on public.profiles
  for all to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

do $$
declare t text;
begin
  foreach t in array array[
    'productos','clientes','cliente_productos','jornadas',
    'stock_movimientos','hojas_ruta','paradas','ventas','venta_items'
  ] loop
    execute format($f$
      create policy "filas propias" on public.%I
        for all to authenticated
        using ((select auth.uid()) = user_id)
        with check ((select auth.uid()) = user_id);
    $f$, t);
  end loop;
end $$;
