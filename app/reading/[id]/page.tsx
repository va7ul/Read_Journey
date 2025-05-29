import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AuthorizedLayout } from '@/app/components/AuthorizedLayout';
import { Dashboard } from '@/app/components/Dashboard';
import { Details } from '@/app/components/Details';
import { AddReading } from '@/app/components/forms/AddReading';
import { MyReading } from '@/app/components/MyReading';
import { getBook } from '@/assets/api';
import { getQueryClient } from '@/assets/utils/getQueryClient';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    redirect('/login');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookInfo', id],
    queryFn: () => getBook({ token, id }),
    staleTime: 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthorizedLayout>
        <Dashboard>
          <AddReading id={id} />
          <Details id={id} />
        </Dashboard>
        <MyReading id={id} />
      </AuthorizedLayout>
    </HydrationBoundary>
  );
}
