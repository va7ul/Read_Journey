import { AuthorizedLayout } from '../components/AuthorizedLayout';
import { Dashboard } from '../components/Dashboard';
import { AddBook } from '../components/forms/AddBook';
import { RecomendedBooks } from '../components/RecomendedBooks';

export default function Page() {
  return (
    <AuthorizedLayout>
      <Dashboard>
        <AddBook />
        <RecomendedBooks />
      </Dashboard>
      My library
    </AuthorizedLayout>
  );
}
