import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Layout from '@/ui/Layout';
import ClientWrapper from '@/ui/ClientWrapper';
import { redirect } from 'next/navigation';

// Home page: Verifies JWT from HTTP-only cookie and passes user data to the client
// If no token or invalid token, redirect to '/' (login flow)
const SECRET = process.env.JWT_SECRET!;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('userToken')?.value;

  const params = await searchParams;
  const editing = params?.edit === 'true';

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      console.error('Invalid or expired token:', err);
      return redirect('/');
    }
  }

  // Pass decoded JWT values to ClientWrapper, which handles conditional rendering (form vs user data) on the client side.
  // Used a separate client component to manage state and routing logic, since React hooks can't run in server components.
  return (
    <Layout>
      <ClientWrapper editMode={editing} />
    </Layout>
  );
}
