import React from "react";
import { addDecorator } from "@storybook/react";

import ThemedWrapper from "./ThemedWrapper";

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};

addDecorator(renderStory => <ThemedWrapper>{renderStory()}</ThemedWrapper>);