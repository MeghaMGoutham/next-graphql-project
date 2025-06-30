import React from 'react';
import { customRender, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/ui/Layout';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Layout Component', () => {
  const pushMock = jest.fn();
  const logoutMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('renders the children content', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: logoutMock,
    });

    customRender(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders nav buttons when user is logged in (desktop)', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: logoutMock,
    });

    customRender(
      <Layout>
        <div />
      </Layout>
    );

    const user = userEvent.setup();

    const openDrawerButton = screen.getByText('Menu');
    await user.click(openDrawerButton);

    expect(
      await screen.findByRole('button', { name: /home/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /edit details/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /logout/i })
    ).toBeInTheDocument();
  });

  it('navigates to home on Home button click', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: logoutMock,
    });

    customRender(
      <Layout>
        <div />
      </Layout>
    );

    const user = userEvent.setup();
    const openDrawerButton = screen.getByText('Menu');
    await user.click(openDrawerButton);

    const homeButton = await screen.findByRole('button', { name: /home/i });
    await user.click(homeButton);

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('navigates to edit on Edit Details button click', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: logoutMock,
    });

    customRender(
      <Layout>
        <div />
      </Layout>
    );

    const user = userEvent.setup();
    const openDrawerButton = screen.getByText('Menu');
    await user.click(openDrawerButton);

    const editButton = await screen.findByRole('button', {
      name: /edit details/i,
    });
    await user.click(editButton);

    expect(pushMock).toHaveBeenCalledWith('/?edit=true');
  });

  it('calls logout on Logout button click', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      logout: logoutMock,
    });

    customRender(
      <Layout>
        <div />
      </Layout>
    );

    const user = userEvent.setup();
    const openDrawerButton = screen.getByText('Menu');
    await user.click(openDrawerButton);

    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });

  it('hides nav buttons when user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      logout: jest.fn(),
    });

    customRender(
      <Layout>
        <div />
      </Layout>
    );

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
