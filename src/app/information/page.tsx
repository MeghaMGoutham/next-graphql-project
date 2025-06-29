// Server component for /information

import InformationPage from '@/ui/InformationPage';
import Layout from '@/ui/Layout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function InfoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Extracts page number and checks JWT token before rendering InformationPage
  const params = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get('userToken')?.value;

  if (!token) {
    return redirect('/');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.error('Invalid or expired token:', err);
    return redirect('/');
  }
  const page = parseInt(params.page || '1', 10);

  return (
    <Layout>
      <InformationPage currentPage={page} />
    </Layout>
  );
}
