// Server component for /information

import InformationPage from '@/ui/InformationPage';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    redirect('/');
  }

  const page = parseInt(params.page || '1', 10);

  return <InformationPage currentPage={page} />;
}
