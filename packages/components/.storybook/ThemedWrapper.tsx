import React, { useEffect, useState } from "react";
import addons from "@storybook/addons";
import { ThemeProvider } from "styled-components";

import { ConfigContext } from "../src";
import modeTheme from "../src/theme";
import config from "../orchard.theme.config.json";

const channel = addons.getChannel();

function ThemedWrapper(props) {
    const [isDark, setDark] = useState(false);

    useEffect(() => {
        channel.on("DARK_MODE", setDark);
    }, [channel, setDark]);

    const theme = {
        ...modeTheme,
        colors: {
            common: modeTheme.colors.common,
            modes: modeTheme.colors.modes,
            ...modeTheme.colors.modes[isDark ? "dark" : "light"]
       }
    }

    return (
        <ConfigContext.Provider value={config}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ConfigContext.Provider>
    )
}

export default ThemedWrapper;