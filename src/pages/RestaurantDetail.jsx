import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getDishes, getOrders, getCustomers } from "../services/api";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = Number(id);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [allDishes, allOrders, allCustomers] = await Promise.all([
          getDishes(),
          getOrders(),
          getCustomers(),
        ]);

        const restaurantDishes = allDishes.filter(
          dish => dish.restaurantId === restaurantId
        );
        const restaurantOrders = allOrders.filter(
          order => order.restaurantId === restaurantId
        );

        const customersMap = new Map();
        restaurantOrders.forEach(order => {
          const customer = allCustomers.find(
            item => item.id === order.customerId
          );
          if (customer) {
            customersMap.set(customer.id, customer);
          }
        });

        setDishes(restaurantDishes);
        setOrders(restaurantOrders);
        setCustomers(Array.from(customersMap.values()));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [restaurantId]);

  const formatCurrency = value => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    const number = Number(value);
    if (Number.isNaN(number)) {
      return value;
    }
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formatDate = value => {
    if (!value) {
      return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const dishColumns = [
    { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
    {
      name: "Plato",
      selector: row => row.name || "Sin nombre",
      sortable: true,
      grow: 2,
    },
    {
      name: "Precio",
      selector: row => formatCurrency(row.price || row.cost),
      right: true,
    },
    {
      name: "Categoria",
      selector: row => row.category || row.type || "-",
    },
  ];

  const orderColumns = [
    {
      name: "Pedido",
      selector: row => `#${row.id}`,
      sortable: true,
      width: "90px",
    },
    {
      name: "Cliente",
      selector: row => (row.customerId ? `#${row.customerId}` : "-"),
    },
    {
      name: "Estado",
      selector: row => row.status || row.state || "En proceso",
    },
    {
      name: "Total",
      selector: row => formatCurrency(row.total || row.amount),
      right: true,
    },
    {
      name: "Fecha",
      selector: row => formatDate(row.date || row.createdAt),
    },
  ];

  const customerColumns = [
    { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
    {
      name: "Cliente",
      selector: row => row.name || row.fullName || "Sin nombre",
      sortable: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: row => row.email || "-",
      grow: 2,
    },
    {
      name: "Telefono",
      selector: row => row.phone || row.mobile || "-",
    },
  ];

  const tableTheme = {
    rows: {
      style: {
        minHeight: "54px",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: "12px",
        fontWeight: 700,
      },
    },
  };

  return (
    <div className="detail">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Detalle de restaurante</p>
          <h1>Restaurante #{id}</h1>
          <p className="muted">
            Datos consolidados de platos, pedidos y clientes.
          </p>
        </div>
        <Link className="button-secondary" to="/">
          Volver al listado
        </Link>
      </div>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Platos</span>
          <strong>{dishes.length}</strong>
        </article>
        <article className="stat-card">
          <span>Pedidos</span>
          <strong>{orders.length}</strong>
        </article>
        <article className="stat-card">
          <span>Clientes</span>
          <strong>{customers.length}</strong>
        </article>
      </section>

      {isLoading ? <Loader label="Cargando detalle" /> : null}
      {error ? (
        <div className="error-box">
          No se pudo cargar el detalle. Verifica la API y el id solicitado.
        </div>
      ) : null}

      {!isLoading && !error && dishes.length === 0 ? (
        <EmptyState
          title="Sin platos asociados"
          description="Este restaurante no tiene platos registrados."
        />
      ) : null}

      <SectionCard
        title="Platos"
        subtitle="Listado de platos registrados en la cocina."
      >
        <DataTable
          columns={dishColumns}
          data={dishes}
          customStyles={tableTheme}
          pagination
          responsive
          highlightOnHover
          noDataComponent="No hay platos disponibles."
        />
      </SectionCard>

      <SectionCard
        title="Pedidos"
        subtitle="Historial de pedidos recibidos para este restaurante."
      >
        <DataTable
          columns={orderColumns}
          data={orders}
          customStyles={tableTheme}
          pagination
          responsive
          highlightOnHover
          noDataComponent="No hay pedidos disponibles."
        />
      </SectionCard>

      <SectionCard
        title="Clientes"
        subtitle="Clientes asociados a los pedidos."
      >
        <DataTable
          columns={customerColumns}
          data={customers}
          customStyles={tableTheme}
          pagination
          responsive
          highlightOnHover
          noDataComponent="No hay clientes disponibles."
        />
      </SectionCard>
    </div>
  );
}
