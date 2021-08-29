import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/hooks';

const Home = () => {
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');
  }, [history, hasUserLoggedIn]);

  return (
    <Wrapper>
      <h2>Home</h2>
      <nav>
        <h1>Navigation</h1>
      </nav>

      <aside>
        <h1>Aside</h1>
      </aside>

      <main>
        <h1>Main</h1>
      </main>

      <footer>
        <h1>Footer</h1>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
`;

export default Home;
