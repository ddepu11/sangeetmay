import { FC } from 'react';
import styled from 'styled-components';
import SignIn from '../../screens/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../../screens/SignUp/SignUp';
import Home from '../../screens/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../Loading';

import AppLogic from './Logic/AppLogic';

const App: FC = (): JSX.Element => {
  const {
    notificationState: { message, error, success },
    errorNotification,
    successNotification,
    userLoading,
  } = AppLogic();

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
