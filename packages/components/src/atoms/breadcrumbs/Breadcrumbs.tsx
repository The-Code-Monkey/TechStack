import { TypographyProps } from '@aw-web-design/styled-system';
import { useEffect, useState } from 'react';

import { Box, Text, BoxProps } from '../../primal';
import { Link } from '../link';

export interface Props extends BoxProps {
  homeUrl?: string;
  homeText?: string;
  url?: string;
  breadcrumbs?: Array<string>;
  typography?: TypographyProps;
}

const Breadcrumbs = ({
  homeUrl,
  homeText,
  url,
  breadcrumbs,
  typography,
  ...rest
}: Props) => {
  const [crumbs, setCrumbs] = useState([]);

  const getHref = index => {
    let href = '/';

    for (let i = 0; i < index + 1; i++) {
      href += `${i !== 0 ? '/' : ''}${crumbs[i]}`;
    }

    return href;
  };

  useEffect(() => {
    if (!breadcrumbs && !url && typeof window !== 'undefined') {
      setCrumbs(window.location.pathname.replace(/^\/|\/$/g, '').split('/'));
    } else if (breadcrumbs) {
      setCrumbs(breadcrumbs);
    } else if (url) {
      setCrumbs(url.replace(/^\/|\/$/g, '').split('/'));
    }
  }, [breadcrumbs, url, window]);

  return (
    <Box {...rest}>
      <Text {...typography}>
        <Link href={homeUrl ?? '/'}>{homeText ?? 'common.home'}</Link>
        {' > '}
        {crumbs.length > 0 &&
          crumbs
            .map((c, i) => (
              <Link key={c} href={getHref(i)}>
                {c}
              </Link>
            ))
            .reduce(
              (prev, curr) => [prev, ' > ', curr] as unknown as JSX.Element
            )}
      </Text>
    </Box>
  );
};

export default Breadcrumbs;
