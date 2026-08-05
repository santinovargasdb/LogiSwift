# LogiSwift — Logística Urbana

PWA mobile-first de gestión para un repartidor/vendedor que sale con mercadería
cargada en su vehículo, recorre una ruta de clientes, registra ventas en el
momento y cierra el día con un resumen de bultos y facturación.

Se usa desde el celular, arriba de la camioneta, con una mano. Todo el diseño
parte de esa restricción. El spec funcional completo vive en [`CLAUDE.md`](CLAUDE.md).

## Pantallas

| Tab | Ruta | Qué hace |
|---|---|---|
| PANEL | `/` | Resumen del día (bultos y facturado), cierre de jornada y acumulado mensual |
| RUTA | `/ruta` | Hoja de ruta del día: paradas, estado de visita y venta por parada |
| STOCK | `/stock` | Inventario del vehículo, calculadora de meta y registro de ventas |
| CLIENTES | `/clientes` | ABM de clientes con pedido habitual |

## Stack

- **Frontend:** Vite · React 19 · TypeScript (estricto) · Tailwind CSS v4 · shadcn/ui
- **Datos:** TanStack Query · Supabase (Postgres + Auth + RLS)
- **Routing:** React Router
- **PWA:** `vite-plugin-pwa` (instalable, service worker con precache)
- **Deploy:** Vercel

## Puesta en marcha

Requisitos: Node.js 20+ y un proyecto de [Supabase](https://supabase.com).

```bash
git clone https://github.com/santinovargasdb/LogiSwift.git
cd LogiSwift
npm install
cp .env.example .env   # completar con las credenciales del proyecto
npm run dev            # http://localhost:5173
```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto (Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Clave pública `anon` (Settings → API) |

Las credenciales **no se commitean**: `.env` está ignorado por git y
`.env.example` es la única plantilla versionada. En Vercel se cargan como
variables de entorno del proyecto.

### Base de datos

Ejecutar [`schema.sql`](schema.sql) en el SQL Editor de Supabase. Crea tablas,
enums, vistas, índices y políticas de Row Level Security.

Reglas del modelo que el código debe respetar:

- Toda tabla lleva `user_id` con RLS: cada usuario ve solo sus filas. El modelo
  es multi-usuario desde el día uno aunque hoy lo use una sola persona.
- El precio se **copia** a `venta_items.precio_unitario` al crear la venta;
  cambiar el precio de un producto no altera el histórico.
- El stock restante se **calcula** en la vista `v_inventario_jornada`
  (`cargas − ventas`), nunca se guarda desnormalizado.
- Al cerrar la jornada se congelan `total_bultos` y `total_facturado`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Chequeo de tipos + build de producción + service worker |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | oxlint |

## Estructura

```
src/
  components/
    layout/        # Header, bottom nav, layout general
    ui/            # Componentes shadcn/ui
    *.tsx          # KpiCard, SectionTitle, EmptyState...
  hooks/           # Un hook de datos por entidad (useClientes, useJornada...)
  lib/             # Cliente de Supabase, formateadores es-AR, utils
  pages/           # Panel, Ruta, Stock, Clientes
schema.sql         # DDL completo (fuente de verdad del modelo)
```

## Offline

El usuario trabaja en la calle con señal intermitente: **registrar una venta no
puede fallar por falta de conexión**. Las mutaciones se encolan en IndexedDB y
se sincronizan cuando vuelve la red. Es el requisito funcional más importante
de la app (pendiente de implementar, ver roadmap).

## Roadmap

Orden de construcción definido en `CLAUDE.md` — no se avanza al paso siguiente
sin que el anterior funcione end-to-end contra Supabase real:

- [x] 1. Setup: Vite + Tailwind + shadcn + layout con bottom nav
- [ ] 2. Schema en Supabase + RLS + seed de productos
- [ ] 3. CLIENTES completo (ABM + pedido habitual)
- [ ] 4. STOCK: productos, carga inicial, inventario del vehículo
- [ ] 5. RUTA: crear hoja de ruta, listar paradas
- [ ] 6. VENTAS: registrar venta desde una parada, descuento de stock
- [ ] 7. PANEL: KPIs del día, cerrar jornada, acumulado mensual
- [ ] 8. Exportación CSV/PDF
- [ ] 9. PWA + cola offline

## Convenciones

- Texto de UI en **español rioplatense** (voseo: "Creá", "Cerrá", "Registrá").
- Fechas y montos en formato `es-AR`, moneda en pesos argentinos.
- Tablas y columnas en español, `snake_case`.
- Un hook de datos por entidad que encapsula TanStack Query.
