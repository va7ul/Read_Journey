import { UnauthorizedDashboard } from '../components/UnauthorizedDashboard';
import { Register } from '../components/Register';

export default function Page() {
  return (
    <UnauthorizedDashboard>
      <Register />
    </UnauthorizedDashboard>
  );
}
