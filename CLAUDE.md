# LogiSwift — Logística Urbana

App de gestión para un repartidor/vendedor que sale con mercadería cargada en su vehículo,
recorre una ruta de clientes, registra ventas en el momento y cierra el día con un resumen
de bultos y facturación.

Es una **PWA mobile-first**. Se usa desde el celular, arriba de la camioneta, con una mano.
Todo el diseño parte de esa restricción.

---

## 1. Contexto de uso

Un día típico:

1. A la mañana el usuario carga el vehículo → registra el **stock inicial** del día.
2. Arma la **hoja de ruta** eligiendo qué clientes va a visitar hoy.
3. Sale a repartir. En cada parada registra la **venta** (productos + cantidades).
4. El stock del vehículo se descuenta automáticamente con cada venta.
5. Al final del día toca **"Terminar el día"** → se consolida el día y suma al acumulado mensual.

El usuario es uno solo (el dueño del vehículo). No hay roles ni equipos, pero el modelo de
datos debe estar preparado para multi-usuario desde el día uno (cada fila lleva `user_id`).

---

## 2. Navegación

Bottom tab bar fija con 4 secciones. Es la única navegación primaria.

| Tab | Ruta | Qué hace |
|---|---|---|
| PANEL | `/` | Resumen del día y del mes |
| RUTA | `/ruta` | Hoja de ruta del día |
| STOCK | `/stock` | Inventario del vehículo, ventas y meta |
| CLIENTES | `/clientes` | ABM de clientes |

Header fijo arriba: logo (ícono de camión sobre cuadrado negro) + "LOGISWIFT" en bold +
"LOGÍSTICA URBANA" en caps chico y gris.

---

## 3. Pantallas

### 3.1 PANEL (`/`)

Título de sección **"Panel Del Día"** con la fecha en formato largo en español
("Miércoles 5 De Agosto").

Bloques, en orden:

1. **Estado de la hoja de ruta.** Si no hay ruta creada hoy, card con borde punteado:
   "No hay hoja de ruta creada para hoy." Si hay, mostrar progreso (visitados / total).
2. **Resumen Del Día** — dos KPI cards lado a lado:
   - `BULTOS` → unidades totales vendidas hoy
   - `FACTURADO` → suma en $ de las ventas de hoy

   Botón **Descargar** arriba a la derecha (exporta el detalle del día).
3. **Botón "Terminar el día"** — ancho completo, cierra la jornada.
   Debajo: "Aún no hay ventas registradas hoy." si corresponde.
4. **Resumen — [Mes Año]** — mismos dos KPIs pero acumulados del mes.
   `BULTOS` con subtítulo "N días con ventas", `FACTURADO` con "Sin datos aún" si está en cero.
   Botón **Exportar**.
5. Nota al pie en card punteada: "Cerrá el día al final para registrar las ventas del mes."

### 3.2 RUTA (`/ruta`)

**Estado vacío:** ícono `+` grande en cuadrado celeste, título "Sin ruta para hoy",
subtítulo "Creá tu hoja de ruta seleccionando clientes", botón **"+ Crear Hoja de Ruta"**.

**Modal de creación:** buscador "Buscar cliente...", lista scrolleable de clientes con
checkbox, cada uno mostrando nombre y dirección truncada. Footer sticky con
"N clientes seleccionados" + botón Cancelar y botón de confirmar.

**Estado con ruta:** lista ordenada de paradas. Cada parada muestra cliente, dirección,
y estado (pendiente / visitado). Debe poder marcarse como visitada y registrar la venta
desde ahí. Reordenar paradas manualmente (drag) es deseable.

### 3.3 STOCK (`/stock`)

Título **"Stock y Ventas"** con tres botones de acción: **Reponer**, **Config**, **Editar**.

1. **Tres KPI cards:** `INICIAL`, `VENDIDOS`, `RESTANTE` (unidades totales del vehículo).
2. **"¿Cuánto necesito vender para llegar a la meta?"** — calculadora de punto de equilibrio.
   Inputs: `GASTOS FIJOS` y `GANANCIA META` (ambos en $).
   Output destacado: `UNIDADES TOTALES PARA ALCANZAR LA META`.
3. **INVENTARIO DEL VEHÍCULO** — lista de productos. Por cada uno:
   nombre, `restante / inicial` a la derecha, barra de progreso, y debajo
   "VENDIDOS: N" a la izquierda y "N% RESTANTE" a la derecha.
4. **REGISTRO DE VENTAS** — lista cronológica de las ventas del día: ícono de check,
   nombre del cliente, hora (HH:mm).

Acciones:
- **Reponer** → sumar unidades al inventario del vehículo (recarga a mitad de día).
- **Config** → gastos fijos, ganancia meta.
- **Editar** → ABM de productos y precios.

### 3.4 CLIENTES (`/clientes`)

Título "Clientes" + botón **"+ Nuevo"**. Buscador "Buscar por nombre o dirección...".

Lista de cards, cada una con: nombre, dirección con ícono de pin, chips de
**pedido habitual** (ej. `Agua 1.5L ×1`), y lápiz de editar a la derecha.

Formulario de cliente: nombre, dirección (con autocompletado de direcciones), teléfono,
notas, y pedido habitual (lista de producto + cantidad que se precarga al registrar
una venta a ese cliente).

---

## 4. Modelo de datos

Ver `schema.sql` para el DDL completo. Resumen:

- `profiles` — usuario (extiende `auth.users`), guarda `gastos_fijos` y `ganancia_meta`.
- `clientes` — nombre, dirección formateada, lat/lng, teléfono, notas.
- `cliente_productos` — pedido habitual: cliente + producto + cantidad.
- `productos` — nombre, precio unitario, unidad, activo.
- `jornadas` — una fila por día. Estado `abierta` / `cerrada`, totales congelados al cerrar.
- `stock_movimientos` — carga inicial y reposiciones (`tipo`: `carga` | `reposicion` | `ajuste`).
- `hojas_ruta` — una por jornada.
- `paradas` — cliente + orden + estado dentro de una hoja de ruta.
- `ventas` — cliente, timestamp, total, jornada.
- `venta_items` — producto, cantidad, precio unitario congelado al momento de la venta.

**Reglas importantes:**

- El precio se **copia** a `venta_items.precio_unitario` al crear la venta. Cambiar el precio
  de un producto no debe alterar el histórico.
- `restante = SUM(stock_movimientos.cantidad) - SUM(venta_items.cantidad)` para la jornada.
  Calcularlo en una vista, no guardarlo desnormalizado.
- "Bultos" = suma de `venta_items.cantidad`. "Facturado" = suma de `ventas.total`.
- Al cerrar la jornada se congelan `total_bultos` y `total_facturado` en `jornadas`.
- Todas las tablas llevan `user_id` con RLS: cada usuario ve solo sus filas.

---

## 5. Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** para las 4 rutas
- **TanStack Query** para data fetching y cache
- **Supabase** — Postgres, Auth (email + magic link), RLS
- **Deploy:** Vercel, repo en GitHub
- **PWA:** `vite-plugin-pwa`, instalable, con service worker

### Offline

El usuario trabaja en la calle con señal intermitente. **Registrar una venta no puede
fallar por falta de conexión.** Encolar las mutaciones en IndexedDB y sincronizar cuando
vuelve la red. Esto no es opcional; es el requisito funcional más importante de la app.

---

## 6. Diseño visual

- **Acento:** cyan (`#06B6D4` / `cyan-500`), usado en botones primarios, íconos activos,
  barras de progreso y las barras verticales que preceden a cada título de sección.
- **Fondo:** gris muy claro (`#F5F5F5`). Cards blancas con borde sutil.
- **Negro** para el logo y los títulos. Gris medio para labels y metadatos.
- **Ámbar/naranja** solo para el ícono de "RESTANTE".
- **Labels de KPI en mayúsculas**, tamaño chico, letter-spacing amplio. El número debajo,
  grande y bold.
- **Estados vacíos** con borde punteado y texto centrado en gris.
- Contenido en columna centrada de ~600px máx, incluso en desktop.
- Tipografía sans geométrica (Inter o Poppins).

---

## 7. Orden de construcción

1. Setup: Vite + Tailwind + shadcn + Supabase client + layout con bottom nav.
2. Schema en Supabase + RLS + seed de productos.
3. CLIENTES completo (es la entidad raíz y la más simple).
4. STOCK: productos, carga inicial, inventario del vehículo.
5. RUTA: crear hoja de ruta, listar paradas.
6. VENTAS: registrar venta desde una parada, descuento de stock.
7. PANEL: KPIs del día, cerrar jornada, acumulado mensual.
8. Exportación CSV/PDF.
9. PWA + cola offline.

No avanzar al paso siguiente sin que el anterior funcione end-to-end contra Supabase real.

---

## 8. Convenciones

- Todo el texto de UI en **español rioplatense** (voseo: "Creá", "Cerrá", "Registrá").
- Fechas y montos formateados para `es-AR`. Moneda en pesos argentinos.
- Nombres de tablas y columnas en español, snake_case (coherente con el dominio).
- Componentes en `src/components`, páginas en `src/pages`, hooks de datos en `src/hooks`.
- Un hook por entidad (`useClientes`, `useJornada`, `useVentas`) que encapsule TanStack Query.

---

## 9. Pendientes de definir

Preguntar antes de asumir:

- ¿Cómo se registra exactamente una venta? ¿Se abre desde la parada de la ruta o se puede
  cargar suelta desde STOCK?
- ¿Se puede vender a un cliente que no está en la ruta del día?
- ¿Hay descuentos, listas de precios distintas o cuenta corriente por cliente?
- ¿Qué formato exacto tienen los exports de "Descargar" y "Exportar"?
- ¿El "pedido habitual" del cliente se precarga automáticamente o es solo informativo?
