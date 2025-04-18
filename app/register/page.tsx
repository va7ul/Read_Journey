import { UnauthorizedLayout } from '../components/UnauthorizedLayout';
import { Register } from '../components/Register';

export default function Page() {
  return (
    <UnauthorizedLayout>
      <Register />
    </UnauthorizedLayout>
  );
}
