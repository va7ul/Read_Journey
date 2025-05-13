import { Login } from '../components/forms/Login';
import { UnauthorizedLayout } from '../components/UnauthorizedLayout';

export default function Page() {
  return (
    <UnauthorizedLayout>
      <Login />
    </UnauthorizedLayout>
  );
}
