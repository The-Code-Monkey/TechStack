import { Box, Button } from '@techstack/components';
import { useRouter } from 'next/navigation';

import { capitalizeFirstLetter } from '../utils/types';

interface Props {
  tid: string;
  id: string;
}

const Header = ({ tid, id }: Props) => {
  const router = useRouter();

  const navigateToEditor = () => {
    router.push(`/editor/${tid}/${id}`);
  };

  return (
    <Box
      borderBottom='1'
      borderColor='neutrals.10'
      p='1em'
      pb='3'
      bg='neutrals.7'
      h='10'
    >
      Editing: {capitalizeFirstLetter(tid)} - {id}
      {tid === 'pages' && (
        <Button
          ml='auto'
          pos='absolute'
          right='3'
          top='8px'
          onClick={navigateToEditor}
        >
          Preview Editor
        </Button>
      )}
    </Box>
  );
};

export default Header;
