import { useState } from 'react';
import Select from 'react-select';
import WtShowcaseBlock from './WtShowcaseBlock';

const SORT_OPTIONS = [
  { value: 'asc', label: 'Crescente' },
  { value: 'desc', label: 'Decrescente' },
  { value: 'name', label: 'Nome' },
  { value: 'queue', label: 'Fila' },
];

const reactSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 38,
    fontSize: '0.875rem',
    borderColor: state.isFocused ? '#232a36' : '#e2e5ea',
    boxShadow: state.isFocused ? '0 0 0 1px #232a36' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#232a36' : '#cdd2da',
    },
  }),
  menu: (base) => ({
    ...base,
    fontSize: '0.875rem',
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#232a36' : state.isFocused ? '#eef0f3' : undefined,
    color: state.isSelected ? '#fff' : '#374151',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#131822',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9aa1ad',
  }),
};

export default function ReactSelectShowcaseSection() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  return (
    <div className="wt-catalog-page section-spacer">
      <div className="wt-catalog-shell">
        <WtShowcaseBlock name="REACT SELECT" hint="react-select — combobox estilo cliente">
          <div className="wt-react-select-demo" style={{ maxWidth: 280 }}>
            <Select
              classNamePrefix="react-select"
              options={SORT_OPTIONS}
              value={sort}
              onChange={(opt) => setSort(opt)}
              isClearable
              isSearchable
              placeholder="Selecione..."
              aria-label="Ordenacao"
              styles={reactSelectStyles}
            />
          </div>
          {sort && (
            <small className="text-muted d-block mt-2">
              Valor: {sort.value} ({sort.label})
            </small>
          )}
        </WtShowcaseBlock>
      </div>
    </div>
  );
}
