export default function Loader({ label = "Cargando datos" }) {
  return (
    <div className="loader">
      <span className="loader-dot" />
      <span>{label}</span>
    </div>
  );
}
