import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { getSession, SessionProvider, signIn } from "next-auth/react";
import { ConfigContext, ThemeModeEnum, ThemeProvider } from "@aw-web-design/components";

import Nav from "../components/Nav";
import Theme from "../styles/theme";
import "../styles/globals.scss";
import config from "../orchard.theme.config.json";

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

  return (
    <ConfigContext.Provider value={config}>
      <ThemeProvider theme={Theme} mode={ThemeModeEnum.DARK} direction="row">
        <SessionProvider session={session}>
          <Nav />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
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
