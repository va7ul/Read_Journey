import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getLibrary, getRecomendedBooks } from '@/assets/api';
import { getQueryClient } from '@/assets/utils/getQueryClient';

import { AuthorizedLayout } from '../components/AuthorizedLayout';
import { Dashboard } from '../components/Dashboard';
import { AddBook } from '../components/forms/AddBook';
import { MyLibrary } from '../components/MyLibrary';
import { RecomendedBooks } from '../components/RecomendedBooks';
import { SelectFilter } from '../components/SelectFilter';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    redirect('/login');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recomendedBooks', { title: '', author: '', page: 1, limit: 3 }],
    queryFn: () => getRecomendedBooks({ token, limit: 3 }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['myBooks'],
    queryFn: () => getLibrary(token),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthorizedLayout>
        <Dashboard>
          <AddBook />
          <RecomendedBooks />
        </Dashboard>
        <MyLibrary>
          <SelectFilter />
        </MyLibrary>
      </AuthorizedLayout>
    </HydrationBoundary>
  );
}
