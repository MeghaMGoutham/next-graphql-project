import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Layout from '@/ui/Layout';
import ClientWrapper from '@/ui/ClientWrapper';
import { redirect } from 'next/navigation';

// Home page: Verifies JWT from HTTP-only cookie and passes user data to the client
// If no token or invalid token, redirect to '/' (login flow)
const SECRET = process.env.JWT_SECRET!;

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('userToken')?.value;

  let userName = '';
  let jobTitle = '';

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET) as {
        userName: string;
        jobTitle: string;
      };
      userName = decoded.userName;
      jobTitle = decoded.jobTitle;
    } catch (error) {
      console.error('Invalid or expired token:', error);
      redirect('/');
    }
  }

  // Pass decoded JWT values to ClientWrapper, which handles conditional rendering (form vs user data) on the client side.
  // Used a separate client component to manage state and routing logic, since React hooks can't run in server components.
  return (
    <Layout>
      <ClientWrapper userName={userName} jobTitle={jobTitle} />
    </Layout>
  );
}
