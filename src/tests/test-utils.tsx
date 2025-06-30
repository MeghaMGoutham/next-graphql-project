import { Provider } from '@/components/ui/provider';
import { render } from '@testing-library/react';

// Custom render method to wrap tests with ChakraProvider
export const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <Provider>{children}</Provider>,
    ...options,
  });

export * from '@testing-library/react';
