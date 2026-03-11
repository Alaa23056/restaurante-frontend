import { Link } from "react-router-dom";

function buildMeta(restaurant) {
  const meta = [
    { label: "Ciudad", value: restaurant.city || restaurant.location },
    { label: "Direccion", value: restaurant.address || restaurant.addressLine },
    { label: "Telefono", value: restaurant.phone || restaurant.contactPhone },
    { label: "Tipo", value: restaurant.cuisine || restaurant.type },
  ];

  return meta.filter(item => item.value);
}

export default function RestaurantCard({ restaurant }) {
  const meta = buildMeta(restaurant);

  return (
    <article className="restaurant-card">
      <div className="restaurant-card-header">
        <h3>{restaurant.name || `Restaurante ${restaurant.id}`}</h3>
        <span className="pill">ID {restaurant.id}</span>
      </div>
      {meta.length > 0 ? (
        <ul className="meta-list">
          {meta.map(item => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Sin datos adicionales disponibles.</p>
      )}
      <Link className="button-primary" to={`/restaurant/${restaurant.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}
