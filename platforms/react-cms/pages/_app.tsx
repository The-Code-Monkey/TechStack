// import {
//   ConfigContext,
//   ThemeModeEnum,
//   ThemeProvider,
// } from '@aw-web-design/components';
import { Session } from 'next-auth';
import { getSession, SessionProvider, signIn } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import Nav from '../components/Nav';
import config from '../orchard.theme.config.json';
import Theme from '../styles/theme';
import '../styles/globals.scss';

interface Props extends AppProps {
  session: Session;
}

const App = ({ Component, pageProps, session }: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!session) {
      signIn();
    } else {
      setLoggedIn(true);
    }
  }, [session]);

  if (!loggedIn) return null;

  console.log("HERE");

  return (
    // <ConfigContext.Provider value={config}>
    //    <ThemeProvider theme={Theme} mode={ThemeModeEnum.DARK} direction='row'>
        <SessionProvider session={session}>
          <Nav />
          <Component {...pageProps} />
        </SessionProvider>
       // </ThemeProvider>
     // </ConfigContext.Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, session: await getSession(ctx) };
};

export default App;
