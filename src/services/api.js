const ENV_URL = import.meta.env.VITE_API_URL;
const BASE_URLS = ENV_URL
  ? [ENV_URL, "/api"]
  : ["/api", "http://localhost:4000"];

async function request(path) {
  let lastError;
  let lastStatus;

  for (const base of BASE_URLS) {
    try {
      const response = await fetch(`${base}${path}`);
      if (response.ok) {
        return response.json();
      }
      lastStatus = response.status;
      lastError = new Error(`API error: ${response.status}`);
    } catch (err) {
      lastError = err;
    }
  }

  if (lastStatus) {
    throw new Error(`API error: ${lastStatus}`);
  }
  throw lastError || new Error("API error: unknown");
}

export async function getRestaurants() {
  const data = await request("/restaurants");
  return data.map(item => ({
    id: item.id ?? item.restauranteID ?? item.restauranteId,
    name: item.name ?? item.restaurante ?? item.nombre,
    city: item.city ?? item.barrio ?? item.localidad,
    ...item,
  }));
}

export async function getDishes() {
  const data = await request("/dishes");
  return data.map(item => ({
    id: item.id ?? item.platoID ?? item.platoId,
    name: item.name ?? item.plato ?? item.nombre,
    price: item.price ?? item.precio ?? item.cost,
    category: item.category ?? item.categoria ?? item.tipo,
    restaurantId: item.restaurantId ?? item.restauranteID ?? item.restauranteId,
    ...item,
  }));
}

export async function getOrders() {
  const data = await request("/orders");
  return data.map(item => ({
    id: item.id ?? item.pedidoID ?? item.pedidoId,
    customerId: item.customerId ?? item.clienteID ?? item.clienteId,
    restaurantId: item.restaurantId ?? item.restauranteID ?? item.restauranteId,
    status: item.status ?? item.estado ?? item.state,
    total: item.total ?? item.importe ?? item.amount,
    date: item.date ?? item.fecha ?? item.createdAt,
    ...item,
  }));
}

export async function getCustomers() {
  const data = await request("/customers");
  return data.map(item => ({
    id: item.id ?? item.clienteID ?? item.clienteId,
    name: item.name ?? item.cliente ?? item.nombre,
    email: item.email ?? item.correo ?? item.mail,
    phone: item.phone ?? item.telefono ?? item.movil,
    ...item,
  }));
}
