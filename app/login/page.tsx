import { UnauthorizedLayout } from '../components/UnauthorizedLayout';
import { Login } from '../components/Login';

export default function Page() {
  return (
    <UnauthorizedLayout>
      <Login />
    </UnauthorizedLayout>
  );
}
