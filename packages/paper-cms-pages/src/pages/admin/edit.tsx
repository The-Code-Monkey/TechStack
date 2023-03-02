'use client';

import Header from '../../components/header';
import { StyledMain } from '../../styles/styled';
import { RecordType } from '../../utils/types';

import EditForm from './EditForm';

interface PageProps {
  params?: Record<string, string>;
  data?: Record<string, Array<RecordType>>[];
  fieldData?: Record<string, string>[];
}

const EditPage = ({ params, data, fieldData }: PageProps) => {
  const { tid, id } = params ?? {};

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
