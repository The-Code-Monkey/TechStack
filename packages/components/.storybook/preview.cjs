import ThemedWrapper from "./ThemedWrapper";

export const decorators = [
  (Story) => (
    <ThemedWrapper>
      <Story />
    </ThemedWrapper>
  ),
];
