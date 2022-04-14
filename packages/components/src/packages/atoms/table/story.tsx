import React from 'react';

import Table from './';

export default {
  title: 'Components / Atoms / Table',
  component: Table,
};

export const story = () => (
  <Table columns={[{ Header: 'id', accessor: 'id' }]} data={[{ id: '0' }]} />
);
