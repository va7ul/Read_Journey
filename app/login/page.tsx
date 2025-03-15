import { UnauthorizedDashboard } from '../components/UnauthorizedDashboard';
import { Login } from '../components/Login';

export default function Page() {
  return (
    <>
      <UnauthorizedDashboard>
        <Login />
      </UnauthorizedDashboard>
    </>
  );
}
