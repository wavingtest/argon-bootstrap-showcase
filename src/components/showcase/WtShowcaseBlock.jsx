export default function WtShowcaseBlock({ name, children, hint }) {
  return (
    <section className="wt-showcase-block">
      <header className="wt-showcase-block__header">
        <code className="wt-showcase-block__title">[WT] {name}</code>
        {hint && <span className="wt-showcase-block__hint">{hint}</span>}
      </header>
      <div className="wt-showcase-block__body">{children}</div>
    </section>
  );
}
