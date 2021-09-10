import { FC } from 'react';
import styled from 'styled-components';
import SignIn from '../../screens/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../../screens/SignUp/SignUp';
import Home from '../../screens/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../Loading';
import useAppLogic from './Logic/useAppLogic';
import Navbar from '../../screens/Navbar/Navbar';
import MusicPlayer from '../../screens/MusicPlayer/MusicPlayer';
import Aside from '../../screens/Aside/Aside';
import Account from '../../screens/Account/Account';
import Search from '../../screens/Search/Search';
import Library from '../../screens/Library/Library';
import Dashboard from '../../screens/Dashboard/Dashboard';
import AdminCreatePlaylist from '../../screens/AdminCreatePlaylist/AdminCreatePlaylist';
import AddSongsToPlaylists from '../../screens/AddSongsToPlaylist/AddSongsToPlaylist';
import PlaylistScreen from '../../screens/Playlist/PlaylistScreen';
import AdminProtectedRoute from '../AdminProtectedRoute';
import UserProtectedRoute from '../UserProtectedRoute';

const App: FC = (): JSX.Element => {
  const { userLoading, notify, message, hasUserLoggedIn, role } = useAppLogic();

  if (userLoading) {
    return <Loading size='FULL' />;
  }

  return (
    <>
      <Wrapper className='w-960 flex'>
        {message !== '' && notify()}

        <ToastContainer />

        <Router>
          {hasUserLoggedIn && <Navbar />}

          <div className='middle-section flex'>
            {hasUserLoggedIn && role !== 'ADMIN' && <Aside />}

            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>

              <UserProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={Search}
                path='/search'
                role={role}
              />

              <UserProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={Library}
                path='/library'
                role={role}
              />

              <UserProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={PlaylistScreen}
                path='/playlist'
                role={role}
              />

              {/* Admin Routes */}
              <AdminProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={Dashboard}
                path='/dashboard'
                role={role}
              />

              <AdminProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={AdminCreatePlaylist}
                path='/admin-create-playlist'
                role={role}
              />

              <AdminProtectedRoute
                isLoggedIn={hasUserLoggedIn}
                component={AddSongsToPlaylists}
                path='/admin-create-playlist/:id'
                role={role}
              />

              <Route path='/sign-in' exact>
                <SignIn />
              </Route>

              <Route path='/sign-up' exact>
                <SignUp />
              </Route>

              <Route path='/account' exact>
                <Account />
              </Route>
            </Switch>
          </div>
        </Router>
      </Wrapper>

      {hasUserLoggedIn && <MusicPlayer />}
    </>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  justify-content: flex-start;

  .middle-section {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export default App;
