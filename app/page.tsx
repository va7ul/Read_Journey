import { cookies, headers } from 'next/headers';
import Image from 'next/image';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getRecomendedBooks } from '@/assets/api';
import { getLimitByUserAgent } from '@/assets/utils/getLimitByUserAgent';
import { getQueryClient } from '@/assets/utils/getQueryClient';
import Books from '@images/books-small.png';

import { AuthorizedLayout } from './components/AuthorizedLayout';
import { Dashboard } from './components/Dashboard';
import { FindBook } from './components/forms/FindBook';
import { Recomended } from './components/Recomended';
import { StartWorkout } from './components/StartWorkout';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return;

  let limit = 0;
  const userAgent = (await headers()).get('user-agent');
  if (userAgent) {
    limit = getLimitByUserAgent(userAgent);
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recomendedBooks', { title: '', author: '', page: 1, limit }],
    queryFn: () => getRecomendedBooks({ token, limit }),
    staleTime: 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthorizedLayout>
        <Dashboard>
          <FindBook />
          <StartWorkout />
          <div className="bg-black-tertiary text-white-secondary mt-5 flex items-center gap-x-3.5 rounded-xl px-5 py-3.5 max-xl:hidden">
            <Image
              src={Books}
              alt="Icon of books"
              width={40}
              height={40}
              className="max-h-10"
            />
            <p className="block text-sm/[18px]">
              {`"`}Books are {` `}
              <span className="text-white-primary">windows</span> {` `}
              to the world, and reading is a journey into the unknown.{`"`}
            </p>
          </div>
        </Dashboard>
        <Recomended />
      </AuthorizedLayout>
    </HydrationBoundary>
  );
}
