// import { Text, ConfigContext, Context, Box } from '@aw-web-design/components';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext } from 'react';

import { SignoutLi, StyledNav, StyledUl } from './styled';

const Nav = () => {
  // const config = useContext<Context>(ConfigContext);

  return (
    <StyledNav>
      <StyledUl>
        {/*<Box*/}
        {/*  as='li'*/}
        {/*  p='4'*/}
        {/*  bgColor='neutrals.4'*/}
        {/*  borderBottom='1'*/}
        {/*  borderBottomColor='neutrals.0'*/}
        {/*>*/}
        {/*  <Text>{config.title ?? 'React CMS'}</Text>*/}
        {/*</Box>*/}
        <li>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={'/users'}>
            <a>Users</a>
          </Link>
        </li>
        <SignoutLi className='logout' onClick={() => signOut()}>
          Sign out
        </SignoutLi>
      </StyledUl>
    </StyledNav>
  );
};

export default Nav;
