import { useState } from 'react';
import ReactDatePicker from 'react-date-picker';

import { Icon } from '../../../primal';

export interface Props {
  value?: string;
}

const DatePicker = ({ value }: Props) => {
  const [v, onChange] = useState(value ? new Date(value) : new Date());

  return (
    <ReactDatePicker
      value={v}
      onChange={onChange}
      calendarIcon={<Icon name='calendar' />}
    />
  );
};

export default DatePicker;
