import Header from '../../components/header';
import useDB from '../../db';
import { StyledMain } from '../../styles/styled';
import { RecordType } from '../../utils/types';

import EditForm from './EditForm';

interface PageProps {
  params?: Record<string, string>;
}

const EditPage = async ({ params }: PageProps) => {
  const { tid, id } = params ?? {};

  const DB = useDB();

  const { data: fieldData } = await DB.dbFunction<Record<string, string>[]>(
    'get_table_fields',
    {
      name: tid,
    }
  );

  const { data } = await DB.get<Record<string, Array<RecordType>>[]>(
    tid as any,
    {
      where: ['id', id],
    }
  );

  return (
    <StyledMain>
      <Header tid={tid} id={id} />
      <EditForm
        tid={tid}
        id={id}
        data={id === 'new' ? {} : data?.[0] ?? {}}
        fields={fieldData ?? []}
      />
    </StyledMain>
  );
};

export default EditPage;
