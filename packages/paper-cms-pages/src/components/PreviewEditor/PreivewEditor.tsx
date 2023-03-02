import { Box } from '@techstack/components';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import {useDB} from '../../db';
import { RecordType } from '../../utils/types';
import FormButtons from '../FormButtons';

import Nav from './components/Nav';
import { SiteThemeContext } from './context';
import ElementRenderer from './ElementRenderer';
import ElementsAside from './ElementsAside';

interface Props {
  fields: Array<Record<string, string>>;
  data: Record<string, Array<RecordType> | string>;
  tid: string;
  id: string;
}

const PreviewEditor = ({ fields, data, tid, id }: Props) => {
  const router = useRouter();
  const DB = useDB();
  const SiteConfig = useContext(SiteThemeContext);
  const [isPublishing, setIsPublishing] = useState(false);

  const contentIndex = fields.findIndex(
    field => field.column_name === 'content'
  );

  const [content, setContent] = useState<Array<RecordType>>(
    (contentIndex !== -1 ? data.content : []) as Array<RecordType>
  );

  const handleSave = async () => {
    setIsPublishing(true);

    if (content) {
      const newData: Props['data'] = {
        ...data,
        content,
      };
      if (id === 'new') {
        delete newData.id;
        newData.created_at = new Date().toDateString();
      }

      const { error } = await DB.put(
        tid as any,
        newData,
        id === 'new' ? undefined : id
      );

      if (!error) {
        setIsPublishing(false);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/edit/${tid}/${id}`);
  };

  const handleAddElement = (element: RecordType, index: number) => {
    setContent(prevState => {
      const newState = [...prevState];
      newState.splice(index, 0, element);
      return newState;
    });
  };

  return (
    <>
      <FormButtons
        onCancelClick={handleCancel}
        onSaveClick={handleSave}
        disabledSave={isPublishing}
        saveLabel={isPublishing ? 'Publishing...' : 'Publish'}
        cancelLabel='Close'
        flexDir='row-reverse'
      />
      <Box d='flex' flexDir='row' flex='1'>
        <ElementsAside onAddElement={handleAddElement} />
        <Box d='flex' flexDir='column' flex='1'>
          <Box
            border='1'
            borderColor='red'
            flex='1'
            height='full'
            {...(SiteConfig?.styles.body ?? {})}
          >
            <Nav
              menu={SiteConfig?.menu ?? []}
              style={SiteConfig?.styles.nav ?? {}}
            />
            <ElementRenderer content={content} setContent={setContent} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PreviewEditor;
