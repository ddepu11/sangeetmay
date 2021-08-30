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
import Navbar from '../../screens/Navbar/Navbar';
import Footer from '../../screens/Footer/Footer';
import Aside from '../../screens/Aside/Aside';
import Account from '../../screens/Account/Account';

const App: FC = (): JSX.Element => {
  const { userLoading, notify, message, hasUserLoggedIn } = AppLogic();

  if (userLoading) {
    return <Loading />;
  }

  return (
    <Wrapper hasUserLoggedIn={hasUserLoggedIn} className='w-960'>
      <Router>
        {message !== '' && notify()}

        <ToastContainer />

        {hasUserLoggedIn && <Navbar />}

        {hasUserLoggedIn && <Aside />}

        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/account' exact>
            <Account />
          </Route>

          <Route path='/sign-in' exact>
            <SignIn />
          </Route>

          <Route path='/sign-up' exact>
            <SignUp />
          </Route>
        </Switch>

        {hasUserLoggedIn && <Footer />}
      </Router>
    </Wrapper>
  );
};

interface IWrapper {
  hasUserLoggedIn?: boolean;
}

const styleForLoggedInPeople = {
  display: 'grid',
  height: '100vh',
  'grid-template-columns': 'repeat(4,minmax(200px,auto))',
  'grid-template-rows': '0.25fr 1fr 1fr 0.3fr',
  'grid-template-areas':
    "'navbar navbar navbar navbar' 'aside main main main' 'aside main main main' 'footer footer footer footer'",
  gap: '1em',
};

const Wrapper = styled.main<IWrapper>`
  padding: 5px;
  ${({ hasUserLoggedIn }) => hasUserLoggedIn && styleForLoggedInPeople}
`;

export default App;