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
import Search from '../../screens/Search/Search';
import Library from '../../screens/Library/Library';
import Dashboard from '../../screens/Dashboard/Dashboard';
import AdminCreatePlaylist from '../../screens/AdminCreatePlaylist/AdminCreatePlaylist';
import AddSongsToPlaylists from '../../screens/AddSongsToPlaylist/AddSongsToPlaylist';

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

          <Route path='/search' exact>
            <Search />
          </Route>

          <Route path='/library' exact>
            <Library />
          </Route>

          <Route path='/dashboard' exact>
            <Dashboard />
          </Route>

          <Route path='/admin-create-playlist' exact>
            <AdminCreatePlaylist />
          </Route>

          <Route path='/add-songs-to-playlist/:id' exact>
            <AddSongsToPlaylists />
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
  height: 'auto',
  'grid-template-columns': 'repeat(4,minmax(200px,auto));',

  'grid-auto-rows': ' minmax(30px, auto);',

  'grid-template-areas':
    "'navbar navbar navbar navbar' 'aside main main main' 'aside main main main' 'footer footer footer footer'",

  gap: '8px 20px',
};

const Wrapper = styled.main<IWrapper>`
  ${({ hasUserLoggedIn }) => hasUserLoggedIn && styleForLoggedInPeople}
  position: relative;
`;

export default App;
