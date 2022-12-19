import { ChangeEvent, useState } from 'react';
import ReactDatePicker from 'react-date-picker';

import { Icon } from '../../../primal';

export interface Props {
  name: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker = ({ name, value, onChange }: Props) => {
  const [v, setV] = useState(value ? new Date(value) : new Date());

  const handleOnChange = value => {
    setV(value);
    onChange({
      target: {
        value,
        name,
      },
    } as any);
  };

  return (
    <ReactDatePicker
      name={name}
      value={v}
      onChange={handleOnChange}
      calendarIcon={<Icon name='calendar' />}
    />
  );
};

export default DatePicker;
