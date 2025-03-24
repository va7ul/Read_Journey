import Image from 'next/image';
import Books from '@images/books-small.png';
import { AuthorizedLayout } from './components/AuthorizedLayout';
import { Dashboard } from './components/Dashboard';
import { FindBook } from './components/forms/FindBook';
import { StartWorkout } from './components/StartWorkout';

export default function Page() {
  return (
    <AuthorizedLayout>
      <Dashboard>
        <FindBook />
        <StartWorkout />
        <div className="bg-black-tertiary text-white-secondary mt-5 flex gap-x-3.5 rounded-xl px-5 py-3.5 max-xl:hidden">
          <Image src={Books} alt="Icon of books" width={40} height={40} />
          <p className="block text-sm leading-3.5">
            {`"`}Books are {` `}
            <span className="text-white-primary">windows</span> {` `}
            to the world, and reading is a journey into the unknown.{`"`}
          </p>
        </div>
      </Dashboard>
      Home
    </AuthorizedLayout>
  );
}
