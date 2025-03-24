import { AuthorizedLayout } from '../components/AuthorizedLayout';
import { Dashboard } from '../components/Dashboard';
import { AddBook } from '../components/forms/AddBook';

export default function Page() {
  return (
    <AuthorizedLayout>
      <Dashboard>
        <AddBook />
      </Dashboard>
      My Reading
    </AuthorizedLayout>
  );
}
