import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';
import Login from '../screens/Login';

const App: FC = (): JSX.Element => {
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  return (
    <Wrapper className='flex'>
      {hasUserLoggedIn ? <h1>User has logged in!</h1> : <Login />}
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
