import { RestrictedRoute } from '../components/RestrictedRoute';
import { UnauthorizedLayout } from '../components/UnauthorizedLayout';
import { Login } from '../components/Login';

export default function Page() {
  return (
    <RestrictedRoute>
      <UnauthorizedLayout>
        <Login />
      </UnauthorizedLayout>
    </RestrictedRoute>
  );
}
