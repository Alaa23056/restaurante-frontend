import { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div>
          <p className="eyebrow">Panel operativo</p>
          <h1>Restaurantes activos</h1>
          <p className="muted">
            Selecciona un restaurante para ver sus platos, pedidos y clientes
            asociados.
          </p>
        </div>
        <div className="hero-card">
          <h3>Total cargados</h3>
          <p className="hero-number">{restaurants.length}</p>
          <p className="muted">Registros disponibles desde la API externa.</p>
        </div>
      </section>

      {isLoading ? <Loader label="Cargando restaurantes" /> : null}
      {error ? (
        <div className="error-box">
          No se pudo cargar la lista. Verifica que el backend este activo.
        </div>
      ) : null}

      {!isLoading && !error && restaurants.length === 0 ? (
        <EmptyState
          title="Sin restaurantes disponibles"
          description="La API no devolvio registros. Intenta mas tarde."
        />
      ) : null}

      <section className="card-grid">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </section>
    </div>
  );
}
