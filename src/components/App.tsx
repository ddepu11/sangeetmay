import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';
import SignIn from '../screens/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp';

const App: FC = (): JSX.Element => {
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  return (
    <Wrapper className='flex'>
      <Router>
        <Switch>
          {hasUserLoggedIn ? (
            <h1>User has logged in!</h1>
          ) : (
            <>
              <Route path='/sign-in' exact>
                <SignIn />
              </Route>

              <Route path='/sign-up'>
                <SignUp />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 100px 20px;
  flex-direction: column;

  h1 {
    font-size: 1.4em;
    letter-spacing: 5px;
    text-transform: capitalize;
  }
`;

export default App;
