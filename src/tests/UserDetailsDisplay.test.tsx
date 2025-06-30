import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDetailsDisplay from '@/ui/UserDetailsDisplay';
import { useRouter } from 'next/navigation';
import { Provider } from '@/components/ui/provider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('UserDetailsDisplay', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders userName and jobTitle', () => {
    render(
      <Provider>
        <UserDetailsDisplay userName="Alice" jobTitle="Developer" />
      </Provider>
    );
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('calls router.push on Explore Rick and Morty button click', () => {
    render(
      <Provider>
        <UserDetailsDisplay userName="Alice" jobTitle="Developer" />
      </Provider>
    );
    const button = screen.getByRole('button', {
      name: /Explore Rick and Morty/i,
    });
    button.click();
    expect(pushMock).toHaveBeenCalledWith('/information');
  });
});
