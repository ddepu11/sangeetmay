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
    <Wrapper className='w-960 flex'>
      <Router>
        {message !== '' && notify()}

        <ToastContainer />

        {hasUserLoggedIn && <Navbar />}

        <Switch>
          <div className='middle-section flex'>
            {hasUserLoggedIn && <Aside />}

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
          </div>
        </Switch>

        {hasUserLoggedIn && <Footer />}
      </Router>
    </Wrapper>
  );
};

// interface IWrapper {
//   hasUserLoggedIn?: boolean;
// }

// const styleForLoggedInPeople = {
//   display: 'grid',
//   height: '100vh',

//   'grid-template-columns': 'repeat(4,minmax(200px,auto));',

//   // 'grid-auto-rows': 'minmax(0px, auto);',

//   'grid-template-areas':
//     "'navbar navbar navbar navbar' 'aside main main main' 'aside main main main' ",

//   // 'footer footer footer footer'

//   gap: '20px 15px',
// };
/* ${({ hasUserLoggedIn }) => !hasUserLoggedIn && styleForLoggedInPeople} */
//

const Wrapper = styled.main`
  flex-direction: column;

  .middle-section {
    width: 100%;
    height: 100vh;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export default App;
