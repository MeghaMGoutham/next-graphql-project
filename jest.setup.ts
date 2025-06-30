import '@testing-library/jest-dom';
import polyfillStructuredClone from '@ungap/structured-clone';

// Force TypeScript to treat it like the native signature
global.structuredClone = polyfillStructuredClone as typeof structuredClone;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
