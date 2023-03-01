import { Box } from '@techstack/components';

interface Props {
  menu: Array<[string, string]>;
  style: Record<string, string>;
}

const Nav = ({ menu, style }: Props) => {
  return (
    <Box d='flex' {...style}>
      {menu.map(item => {
        return <Box key={item[1]}>{item[0]}</Box>;
      })}
    </Box>
  );
};

export default Nav;
