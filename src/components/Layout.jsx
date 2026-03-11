import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            La Mesa Abierta
          </Link>
          <p className="brand-subtitle">
            Panel de restaurantes, platos y pedidos en tiempo real
          </p>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="footer">
        <span>Vite + React + API externa</span>
        <span>Entrega demo restaurante-frontend</span>
      </footer>
    </div>
  );
}
