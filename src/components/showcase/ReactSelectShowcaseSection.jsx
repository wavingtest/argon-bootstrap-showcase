import { useState } from 'react';
import moment from 'moment';
import { Col, Row } from 'reactstrap';
import Select from 'react-select';
import WtShowcaseBlock from './WtShowcaseBlock';
import WtAttendeeMultiSelect from './WtAttendeeMultiSelect';
import WtDateTimePicker, { WtTimeField } from './WtDateTimePicker';

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
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    fontSize: '0.875rem',
    zIndex: 9999,
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
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [startDate, setStartDate] = useState(moment('2026-05-01'));
  const [endDate, setEndDate] = useState(moment('2026-05-28'));
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');

  return (
    <div className="wt-catalog-page wt-catalog-page--react-select section-spacer">
      <div className="wt-catalog-shell">
        <WtShowcaseBlock
          name="REACT SELECT"
          hint="react-select — combobox estilo cliente"
          overflowVisible
        >
          <div className="wt-react-select-demo">
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
              menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
              menuPosition="fixed"
            />
          </div>
          {sort && (
            <small className="text-muted d-block mt-2">
              Valor: {sort.value} ({sort.label})
            </small>
          )}
        </WtShowcaseBlock>

        <WtShowcaseBlock
          name="MULTISELECT ATENDENTE"
          hint="Filtro multivalor com busca e Selecionar todos (estilo cliente)"
          overflowVisible
          className="wt-showcase-block--multiselect"
        >
          <WtAttendeeMultiSelect onChange={setSelectedAttendees} />
          <small className="text-muted d-block mt-3">
            Selecionados:{' '}
            {selectedAttendees.length === 0
              ? 'nenhum'
              : selectedAttendees.map((a) => a.label).join(', ')}
          </small>
        </WtShowcaseBlock>

        <WtShowcaseBlock
          name="DATE PICKER"
          hint="react-datetime + input-group com icone (estilo Argon)"
          overflowVisible
          className="wt-showcase-block--datetime"
        >
          <Row className="g-3">
            <Col xs={12} sm={6} lg={3}>
              <WtDateTimePicker
                label="Data inicial"
                required
                value={startDate}
                onChange={setStartDate}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <WtTimeField
                label="Hora inicial"
                required
                value={startTime}
                onChange={setStartTime}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <WtDateTimePicker
                label="Data final"
                required
                value={endDate}
                onChange={setEndDate}
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <WtTimeField label="Hora final" required value={endTime} onChange={setEndTime} />
            </Col>
          </Row>
          <small className="text-muted d-block mt-3">
            Periodo: {startDate.format('DD/MM/YYYY')} {startTime} ate {endDate.format('DD/MM/YYYY')}{' '}
            {endTime}
          </small>
        </WtShowcaseBlock>
      </div>
    </div>
  );
}
