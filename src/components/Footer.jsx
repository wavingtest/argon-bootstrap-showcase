export default function Footer() {
  return (
    <footer className="app-footer d-flex justify-content-between flex-wrap gap-2">
      <span>
        © {new Date().getFullYear()} Demo Dashboard — Showcase de componentes.
      </span>
      <span className="d-flex gap-3">
        <a href="#docs" className="text-muted text-decoration-none">Docs</a>
        <a href="#changelog" className="text-muted text-decoration-none">Changelog</a>
        <a href="#support" className="text-muted text-decoration-none">Suporte</a>
      </span>
    </footer>
  );
}
