import {useEffect, useMemo, useState} from "react";
import addons from "@storybook/addons";
import { ThemeProvider } from "styled-components";

import { ConfigContext } from "../src";
import modeTheme from "../src/theme";
import config from "../orchard.theme.config.json";

const channel = addons.getChannel();

function ThemedWrapper({ context, children }) {
    const [isDark, setDark] = useState(false);

    useEffect(() => {
        setDark(context?.globals?.backgrounds?.value === "#333333");
    }, [context, setDark])

    const theme = useMemo(() =>({
        ...modeTheme,
        colors: {
            common: modeTheme.colors.common,
            modes: modeTheme.colors.modes,
            ...modeTheme.colors.modes[isDark ? "dark" : "light"]
       }
    }), [isDark]);

    return (
        <ConfigContext.Provider value={config}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ConfigContext.Provider>
    )
}

export default ThemedWrapper;