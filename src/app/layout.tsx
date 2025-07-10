import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { ApolloWrapper } from '../lib/ApolloWrapper';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Next GraphQL Project',
  description: 'Challenge Brief (v3.5)',
};

// Root layout that wraps the entire application
// Injects Chakra UI styling and Apollo Client context

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Provider>
          <AuthProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
