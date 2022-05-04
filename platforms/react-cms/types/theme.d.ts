import 'styled-components';

import { ITheme } from '@aw-web-design/components';

import Variants from '../styles/theme/variants';

// and extend them!
declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends ITheme<typeof Variants> {}
}
