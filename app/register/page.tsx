import { RestrictedRoute } from '../components/RestrictedRoute';
import { UnauthorizedLayout } from '../components/UnauthorizedLayout';
import { Register } from '../components/Register';

export default function Page() {
  return (
    <RestrictedRoute>
      <UnauthorizedLayout>
        <Register />
      </UnauthorizedLayout>
    </RestrictedRoute>
  );
}
