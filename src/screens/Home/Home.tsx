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
      <h1 className='greet'>Good Morning</h1>
      <section className='all_playlist'>
        <div className='playlist'>
          <div className='banner'>
            <img src='' alt='' />
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  grid-area: main;
  /* border: 1px solid #ffffffdd; */

  .greet {
  }
`;

export default Home;
