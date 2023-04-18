import ThemedWrapper from "./ThemedWrapper";
import './i18n';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <ThemedWrapper context={context}>
        <Story />
      </ThemedWrapper>
    )]}

export default preview;
