import React from 'react';
import { customRender, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import ClientWrapper from '@/ui/ClientWrapper';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock AuthContext hook
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock child components to focus on testing ClientWrapper logic only
jest.mock('@/ui/UserDetailsDisplay', () => (props: any) => (
  <div data-testid="user-display">
    UserDetailsDisplay - {props.userName} / {props.jobTitle}
  </div>
));
jest.mock('@/ui/UserDetailsForm', () => (props: any) => (
  <form
    data-testid="user-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.onComplete({ userName: 'TestUser', jobTitle: 'Tester' });
    }}
  >
    UserDetailsForm - {props.isUpdate ? 'Update' : 'Submit'}
    <button type="submit">Submit</button>
  </form>
));

describe('ClientWrapper', () => {
  const loginMock = jest.fn();
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });

    // Default: no edit param
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
      has: jest.fn(() => false),
      toString: jest.fn(() => ''),
    });

    (useAuth as jest.Mock).mockReturnValue({
      userName: 'Alice',
      jobTitle: 'Developer',
      isLoggedIn: true,
      login: loginMock,
      loading: false,
    });
  });

  it('renders UserDetailsDisplay when logged in and not editing', () => {
    customRender(<ClientWrapper />);

    expect(screen.getByTestId('user-display')).toHaveTextContent(
      'Alice / Developer'
    );
    expect(screen.queryByTestId('user-form')).not.toBeInTheDocument();
  });

  it('renders UserDetailsForm when not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      userName: '',
      jobTitle: '',
      isLoggedIn: false,
      login: loginMock,
      loading: false,
    });

    customRender(<ClientWrapper />);

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
    expect(screen.queryByTestId('user-display')).not.toBeInTheDocument();
  });

  it('renders UserDetailsForm when edit query param is true', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => (key === 'edit' ? 'true' : null)),
      has: jest.fn((key) => key === 'edit'),
      toString: jest.fn(() => 'edit=true'),
    });

    customRender(<ClientWrapper />);

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
    expect(screen.queryByTestId('user-display')).not.toBeInTheDocument();
  });

  it('calls login on form completion', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
      has: jest.fn(() => false),
      toString: jest.fn(() => ''),
    });
    (useAuth as jest.Mock).mockReturnValue({
      userName: '',
      jobTitle: '',
      isLoggedIn: false,
      login: loginMock,
    });

    const user = userEvent.setup();

    customRender(<ClientWrapper />);

    const form = screen.getByTestId('user-form');
    expect(form).toBeInTheDocument();

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // login should be called with data from onComplete
    expect(loginMock).toHaveBeenCalledWith('TestUser', 'Tester');

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('calls login and replaces URL when isUpdate is true (edit=true)', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => (key === 'edit' ? 'true' : null)),
      has: jest.fn((key) => key === 'edit'),
      toString: jest.fn(() => 'edit=true'),
    });

    const user = userEvent.setup();
    customRender(<ClientWrapper />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(loginMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith('/?');
  });
});
