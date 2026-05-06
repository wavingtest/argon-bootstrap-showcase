import { useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from 'reactstrap';

const DEFAULT_PAGE_SIZE = 5;

export default function DataTable({
  columns,
  data,
  searchableKeys = [],
  pageSize = DEFAULT_PAGE_SIZE,
  toolbarTitle = 'Registros',
  onAdd,
  filterOptions = [],
  filterValue = 'all',
  onFilterChange,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    const keys = searchableKeys.length
      ? searchableKeys
      : columns.map((c) => c.key);
    return data.filter((row) =>
      keys.some((key) => String(row[key] ?? '').toLowerCase().includes(term)),
    );
  }, [data, search, searchableKeys, columns]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.direction === 'asc' ? av - bv : bv - av;
      }
      return sort.direction === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const visible = sorted.slice(startIdx, startIdx + pageSize);

  const handleSort = (key, sortable) => {
    if (sortable === false) return;
    setSort((current) => {
      if (current.key !== key) return { key, direction: 'asc' };
      if (current.direction === 'asc') return { key, direction: 'desc' };
      return { key: null, direction: 'asc' };
    });
  };

  return (
    <Card className="data-table-card">
      <div className="table-toolbar">
        <div>
          <h3 className="m-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
            {toolbarTitle}
          </h3>
          <small className="text-muted">{sorted.length} registros</small>
        </div>
        <div className="toolbar-search">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="search"
            className="form-control"
            placeholder="Buscar…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="toolbar-actions">
          <Button
            color="secondary"
            size="sm"
            className="btn-icon"
            onClick={() => setShowFilters((v) => !v)}
          >
            <i className="fa-solid fa-filter" /> Filtros
          </Button>
          <Button color="secondary" size="sm" className="btn-icon">
            <i className="fa-solid fa-download" /> Exportar
          </Button>
          {onAdd && (
            <Button color="primary" size="sm" className="btn-icon" onClick={onAdd}>
              <i className="fa-solid fa-plus" /> Novo
            </Button>
          )}
        </div>
      </div>
      {showFilters && (
        <div className="table-toolbar border-top">
          <div className="d-flex flex-wrap align-items-end gap-2">
            <div>
              <label className="form-label mb-1">Status</label>
              <select
                className="form-select form-select-sm"
                value={filterValue}
                onChange={(e) => onFilterChange?.(e.target.value)}
              >
                <option value="all">Todos</option>
                {filterOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sort.key === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key, col.sortable)}
                    className={classNames({ 'is-sorted': isSorted })}
                    style={{ width: col.width }}
                  >
                    {col.label}
                    {col.sortable !== false && (
                      <i
                        className={classNames(
                          'fa-solid sort-icon',
                          isSorted
                            ? sort.direction === 'asc'
                              ? 'fa-arrow-up'
                              : 'fa-arrow-down'
                            : 'fa-sort',
                        )}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-4">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              visible.map((row, idx) => (
                <tr key={row.id ?? idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Mostrando <strong>{visible.length === 0 ? 0 : startIdx + 1}</strong>–
          <strong>{startIdx + visible.length}</strong> de{' '}
          <strong>{sorted.length}</strong>
        </span>
        <Pagination size="sm" aria-label="Paginação da tabela">
          <PaginationItem disabled={safePage === 1}>
            <PaginationLink onClick={() => setPage(safePage - 1)} previous />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p} active={p === safePage}>
              <PaginationLink onClick={() => setPage(p)}>{p}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={safePage === totalPages}>
            <PaginationLink onClick={() => setPage(safePage + 1)} next />
          </PaginationItem>
        </Pagination>
      </div>
    </Card>
  );
}
