import { FC } from 'react';
import styled from 'styled-components';
import SignIn from '../screens/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';

const App: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Router>
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
