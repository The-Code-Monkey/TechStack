import { createContext, ReactNode } from 'react';

export type SiteThemeConfig = {
  menu: Array<[string, string]>;
  styles: {
    nav: Record<string, string>;
    body: Record<string, string>;
    content: Record<string, string>;
  };
};

export const SiteThemeContext = createContext<null | SiteThemeConfig>(null);

interface Props {
  children: ReactNode;
}

const SiteThemeProvider = ({ children }: Props) => {
  const config: SiteThemeConfig = {
    menu: [
      ['Homepage', '/'],
      ['test', '/test'],
    ],
    styles: {
      body: {
        bg: 'neutrals.5',
      },
      nav: {
        flexDir: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        p: '4',
        gap: '4',
        borderBottom: '1',
        borderColor: 'neutrals.20',
      },
      content: {
        bg: 'neutrals.5',
      },
    },
  };

  return (
    <SiteThemeContext.Provider value={config}>
      {children}
    </SiteThemeContext.Provider>
  );
};

export default SiteThemeProvider;
