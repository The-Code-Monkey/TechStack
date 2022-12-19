import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { Icon } from '../../../primal';

export interface Props {
  value?: string;
}

const DateTime = ({ value }: Props) => {
  const [v, onChange] = useState(value ? new Date(value) : new Date());

  return (
    <DateTimePicker
      value={v}
      onChange={onChange}
      calendarIcon={<Icon name='calendar' />}
    />
  );
};

export default DateTime;
