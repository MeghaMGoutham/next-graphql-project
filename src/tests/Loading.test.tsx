import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/ui/Loading';
import { Provider } from '@/components/ui/provider';

describe('Loading', () => {
  it('renders spinner and loading text', () => {
    render(
      <Provider>
        <Loading />
      </Provider>
    );
    expect(screen.getByText(/Loading characters.../i)).toBeInTheDocument();
  });
});
