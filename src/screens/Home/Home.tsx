import { useEffect, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { IPlaylist } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Playlist from '../../components/Playlist/Playlist';

const Home: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  const { hasUserLoggedIn, role } = useAppSelector((state) => state.user.value);
  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');

    role === 'ADMIN' && history.push('/dashborad');

    let didComponentUnmount = false;

    if (playlist.length === 0 && role !== 'ADMIN' && hasUserLoggedIn) {
      const collectionref = firestore.collection('playlists');

      collectionref
        .get()
        .then((docs) => {
          !didComponentUnmount &&
            docs.forEach((item) => {
              setPlaylist((prevState) => {
                return [...prevState, item.data()];
              });
            });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });
    }

    return () => {
      didComponentUnmount = true;
    };
  }, [history, hasUserLoggedIn, dispatch, playlist, role]);

  return (
    <Wrapper>
      <h1 className='heading'>Playlist</h1>

      <section className='playlists'>
        {playlist.length !== 0 &&
          playlist.map((item: IPlaylist) => (
            <Playlist key={item.id} playlist={item} />
          ))}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100%;
  height: 77.5vh;
  color: var(--little-light-color);
  overflow-y: scroll;
  padding: 15px 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .heading {
    font-size: 1.5em;
    font-weight: 400;
  }

  .playlists {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 15px 12px;
  }
`;

export default Home;
