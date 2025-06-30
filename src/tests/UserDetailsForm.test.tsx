import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDetailsForm from '@/ui/UserDetailsForm';
import { useAuth } from '@/context/AuthContext';
import { Provider } from '@/components/ui/provider';

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('UserDetailsForm', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
  });

  it('renders form fields and submit button', () => {
    render(
      <Provider>
        <UserDetailsForm onComplete={jest.fn()} />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText(/Enter your username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Entere your job title/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates inputs and calls login and onComplete on submit when isUpdate is false', async () => {
    const onCompleteMock = jest.fn();
    const user = userEvent.setup();

    render(
      <Provider>
        <UserDetailsForm onComplete={onCompleteMock} isUpdate={false} />
      </Provider>
    );

    await user.type(
      screen.getByPlaceholderText(/Enter your username/i),
      'Alice'
    );
    await user.type(
      screen.getByPlaceholderText(/Entere your job title/i),
      'Developer'
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('Alice', 'Developer');
      expect(onCompleteMock).toHaveBeenCalledWith({
        userName: 'Alice',
        jobTitle: 'Developer',
      });
    });
  });

  it('calls only onComplete on submit when isUpdate is true', async () => {
    const onCompleteMock = jest.fn();
    const user = userEvent.setup();

    render(
      <Provider>
        <UserDetailsForm onComplete={onCompleteMock} isUpdate={true} />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/Enter your username/i), 'Bob');
    await user.type(
      screen.getByPlaceholderText(/Entere your job title/i),
      'Tester'
    );

    await user.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(loginMock).not.toHaveBeenCalled();
      expect(onCompleteMock).toHaveBeenCalledWith({
        userName: 'Bob',
        jobTitle: 'Tester',
      });
    });
  });
});
