import ThemedWrapper from "./ThemedWrapper";
import './i18n';

export const decorators = [
  (Story) => (
    <ThemedWrapper>
      <Story />
    </ThemedWrapper>
  ),
];
