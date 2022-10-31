import ThemedWrapper from "./ThemedWrapper.tsx";
import './i18n.ts';

export const decorators = [
  (Story, context) => (
    <ThemedWrapper context={context}>
      <Story />
    </ThemedWrapper>
  ),
];
