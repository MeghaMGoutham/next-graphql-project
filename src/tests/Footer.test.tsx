import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/ui/Footer';
import { Provider } from '@/components/ui/provider';

describe('Footer', () => {
  it('renders version text', () => {
    render(
      <Provider>
        <Footer />
      </Provider>
    );
    expect(screen.getByText('v3.5')).toBeInTheDocument();
  });
});
