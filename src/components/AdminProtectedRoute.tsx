import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  component: FC;
  path: string;
  role: string | null;
}

const AdminProtectedRoute: FC<Props> = ({
  isLoggedIn,
  component: Component,
  path,
  role,
}) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (isLoggedIn && role === 'ADMIN') {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/sign-in', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default AdminProtectedRoute;
