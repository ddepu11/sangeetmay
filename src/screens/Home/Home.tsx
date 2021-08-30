import { useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/hooks';

const Home: FC = (): JSX.Element => {
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');
  }, [history, hasUserLoggedIn]);

  return (
    <Wrapper>
      <main>
        <h1>Main</h1>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  grid-area: main;
  border: 1px solid #ffffffdd;
`;

export default Home;
