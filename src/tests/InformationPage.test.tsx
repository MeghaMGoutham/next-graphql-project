import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InformationPage from '@/ui/InformationPage';
import { useQuery } from '@apollo/client';
import { useRouter, notFound } from 'next/navigation';
import { Provider } from '@/components/ui/provider';
import userEvent from '@testing-library/user-event';

// Mock gql and useQuery from @apollo/client
jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    gql: (literals: TemplateStringsArray) => literals[0], // passthrough
    useQuery: jest.fn(),
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  notFound: jest.fn(),
}));

// Wrapper to provide Chakra UI context in tests
const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

describe('InformationPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders loading state initially', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });

    render(<InformationPage currentPage={1} />, { wrapper: ProvidersWrapper });
    expect(screen.getByText(/Loading characters.../i)).toBeInTheDocument();
  });

  it('throws error if query errors', () => {
    const error = new Error('Network error');
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error,
      data: null,
    });

    expect(() =>
      render(<InformationPage currentPage={1} />, { wrapper: ProvidersWrapper })
    ).toThrow(error);
  });

  it('calls notFound if no characters', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: { characters: { results: [] } },
    });

    render(<InformationPage currentPage={1} />, { wrapper: ProvidersWrapper });
    expect(notFound).toHaveBeenCalled();
  });

  it('renders character list and handles pagination', async () => {
    const mockCharacters = [
      {
        id: '1',
        name: 'Rick Sanchez',
        image: 'rick.png',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Earth' },
      },
      {
        id: '2',
        name: 'Morty Smith',
        image: 'morty.png',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Earth' },
      },
    ];

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        characters: {
          results: mockCharacters,
          info: { next: 2 },
        },
      },
    });

    const user = userEvent.setup();

    render(<InformationPage currentPage={1} />, { wrapper: ProvidersWrapper });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    await user.click(nextButton);
    expect(pushMock).toHaveBeenCalledWith('/information?page=2');

    const prevButton = screen.getByText(/Previous/i);
    expect(prevButton).toBeDisabled();
  });
});
