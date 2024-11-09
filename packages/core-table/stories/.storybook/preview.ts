export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
