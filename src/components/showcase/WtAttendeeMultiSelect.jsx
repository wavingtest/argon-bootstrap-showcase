import { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from 'reactstrap';

const ATTENDEES = [
  { id: 'admin', label: 'ADMINISTRADOR' },
  { id: 'alice', label: 'ALICE COSTA' },
  { id: 'alyson', label: 'ALYSON VERAS' },
  { id: 'beatriz', label: 'BEATRIZ LIMA' },
  { id: 'cristiano', label: 'CRISTIANO SOBRINHO' },
  { id: 'laura', label: 'LAURA OLIVEIRA' },
  { id: 'marcos', label: 'MARCOS RIBEIRO' },
  { id: 'teste02', label: 'TESTE02' },
];

export default function WtAttendeeMultiSelect({ label = 'ATENDENTE', onChange }) {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(() => new Set());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ATTENDEES;
    return ATTENDEES.filter((a) => a.label.toLowerCase().includes(q));
  }, [search]);

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((a) => selected.has(a.id));

  useEffect(() => {
    if (!open) return undefined;

    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const notifyChange = (next) => {
    onChange?.(ATTENDEES.filter((a) => next.has(a.id)));
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      notifyChange(next);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filtered.forEach((a) => next.delete(a.id));
      } else {
        filtered.forEach((a) => next.add(a.id));
      }
      notifyChange(next);
      return next;
    });
  };

  const triggerLabel =
    selected.size === 0
      ? 'Selecionar...'
      : selected.size === 1
        ? ATTENDEES.find((a) => selected.has(a.id))?.label ?? '1 selecionado'
        : `${selected.size} selecionados`;

  return (
    <div className="wt-multiselect-filter" ref={rootRef}>
      <div className="wt-multiselect-filter__label-row">
        <span className="wt-multiselect-filter__label">{label}</span>
        <button
          type="button"
          className="wt-multiselect-filter__sort-btn"
          aria-label="Ordenar atendentes"
          title="Ordenar"
        >
          <i className="fa-solid fa-sort" />
        </button>
      </div>

      <button
        type="button"
        className={`wt-multiselect-filter__trigger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="wt-multiselect-filter__trigger-text">{triggerLabel}</span>
        <span className="wt-multiselect-filter__trigger-icon" aria-hidden>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="wt-multiselect-filter__menu" role="listbox">
          <div className="wt-multiselect-filter__search">
            <Input
              bsSize="sm"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar atendente"
            />
          </div>

          <label className="wt-multiselect-filter__option wt-multiselect-filter__option--all">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleSelectAll}
            />
            <span>Selecionar todos</span>
          </label>

          <div className="wt-multiselect-filter__list">
            {filtered.length === 0 ? (
              <div className="wt-multiselect-filter__empty">Nenhum resultado</div>
            ) : (
              filtered.map((item) => (
                <label key={item.id} className="wt-multiselect-filter__option">
                  <input
                    type="checkbox"
                    checked={selected.has(item.id)}
                    onChange={() => toggleOne(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
