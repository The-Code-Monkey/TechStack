

import Table from './index';

export default {
  title: 'Components / Atoms / Table',
  component: Table,
};

export const story = () => (
  <Table columns={[{ Header: 'id', accessor: 'id' }]} data={[{ id: '0' }]} />
);
