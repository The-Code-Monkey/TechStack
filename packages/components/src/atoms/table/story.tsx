import Table from './index';

export default {
  title: 'Components / Atoms / Table',
  component: Table,
};

export const story = () => (
  <Table
    columns={['id', 'test', '100', 'something']}
    data={[{ id: '0' }, { id: '0' }, { id: '0' }, { id: '0' }, { id: '0' }]}
  />
);

export const WithEdit = () => {
  return (
    <Table
      columns={['id', 'test', '100', 'something', 'edit-delete']}
      data={[{ id: '0' }, { id: '0' }, { id: '0' }, { id: '0' }, { id: '0' }]}
    />
  );
};
