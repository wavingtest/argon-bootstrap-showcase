import { useState } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import 'moment/locale/pt-br';
import 'react-datetime/css/react-datetime.css';

moment.locale('pt-br');

export default function WtDateTimePicker({
  label,
  required = false,
  value: controlledValue,
  onChange,
  defaultValue = moment(),
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (next) => {
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  return (
    <FormGroup className="wt-datetime-field mb-0">
      <Label className="wt-datetime-field__label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <InputGroup className="input-group-alternative wt-datetime-input-group">
        <InputGroupText>
          <i className="fa-solid fa-calendar-days" aria-hidden />
        </InputGroupText>
        <Datetime
          value={value}
          onChange={handleChange}
          dateFormat="DD/MM/YYYY"
          timeFormat={false}
          locale="pt-br"
          closeOnSelect
          inputProps={{
            className: 'form-control',
            'aria-label': label,
          }}
        />
      </InputGroup>
    </FormGroup>
  );
}

export function WtTimeField({ label, required = false, value, onChange, defaultValue = '08:00' }) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  return (
    <FormGroup className="wt-datetime-field mb-0">
      <Label className="wt-datetime-field__label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </Label>
      <Input
        type="time"
        className="form-control"
        value={current}
        onChange={(e) => {
          if (value === undefined) setInternal(e.target.value);
          onChange?.(e.target.value);
        }}
        aria-label={label}
      />
    </FormGroup>
  );
}
