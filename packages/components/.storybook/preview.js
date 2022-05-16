import ThemedWrapper from "./ThemedWrapper";
import './i18n';

export const decorators = [
  (Story, context) => (
    <ThemedWrapper context={context}>
      <Story />
    </ThemedWrapper>
  ),
];
