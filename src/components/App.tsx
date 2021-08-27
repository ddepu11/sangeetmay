import { FC } from 'react';
import styled from 'styled-components';
import SignIn from '../screens/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp/SignUp';
import Home from '../screens/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearNotification } from '../features/notification';
import Loading from './Loading';

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const errorNotification = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      theme: 'colored',
      onClose: () => dispatch(clearNotification()),
    });
  };

  const successNotification = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      theme: 'colored',
      onClose: () => dispatch(clearNotification()),
    });
  };

  const { message, success, error } = useAppSelector(
    (state) => state.notification.value
  );

  const { userLoading } = useAppSelector((state) => state.user.value);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Router>
        {message !== '' && error && errorNotification(message)}

        {message !== '' && success && successNotification(message)}

        <ToastContainer />

        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/sign-in' exact>
            <SignIn />
          </Route>

          <Route path='/sign-up' exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px;
`;

export default App;
