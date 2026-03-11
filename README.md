# Restaurante Frontend

Aplicacion React (Vite) que consume una API externa y muestra
restaurantes, platos, pedidos y clientes asociados.

## Requisitos cubiertos
- Consumo de API externa con `fetch` + `async/await`.
- Hooks `useState` y `useEffect` en pantallas principales.
- React Router con rutas `#/` y `#/restaurant/:id` (HashRouter).
- UI responsive con Bootstrap y estilos propios.
- Tabla de terceros con `react-data-table-component`.
- Actualizacion dinamica sin recargar pagina.

## Desarrollo local
1. Instalar dependencias: `npm install`
2. Levantar frontend: `npm run dev`

## Backend esperado
- Repo: `restaurante-backend`
- Arranque: `docker compose up -d`
- API base: `http://localhost:4000`
- Variable opcional: `VITE_API_URL`

## Despliegue (GitHub Pages)
1. Ejecutar `npm run deploy` (genera `dist/` y publica en `gh-pages`).
2. Activar GitHub Pages: Source = `gh-pages` / root.
3. URL final: completar aqui cuando se publique.

## Estructura clave
- `src/pages/Home.jsx`: listado de restaurantes.
- `src/pages/RestaurantDetail.jsx`: platos, pedidos y clientes.
- `src/services/api.js`: cliente de API.

## Control de versiones
- Minimo 5 commits con mensajes claros de funcionalidad.
