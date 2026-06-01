export default function WtShowcaseBlock({ name, children, hint, overflowVisible = false }) {
  return (
    <section
      className={`wt-showcase-block${overflowVisible ? ' wt-showcase-block--overflow-visible' : ''}`}
    >
      <header className="wt-showcase-block__header">
        <code className="wt-showcase-block__title">[WT] {name}</code>
        {hint && <span className="wt-showcase-block__hint">{hint}</span>}
      </header>
      <div className="wt-showcase-block__body">{children}</div>
    </section>
  );
}
