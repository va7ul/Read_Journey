import { Register } from '../components/forms/Register';
import { UnauthorizedLayout } from '../components/UnauthorizedLayout';

export default function Page() {
  return (
    <UnauthorizedLayout>
      <Register />
    </UnauthorizedLayout>
  );
}
