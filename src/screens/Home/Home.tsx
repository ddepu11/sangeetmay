import { useEffect, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { IPlaylist } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Playlist from '../Playlist/Playlist';

const Home: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);
  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');

    const fetchAllPlaylists = () => {
      firestore
        .collection('playlists')
        .get()
        .then((docs) => {
          docs.forEach((item) => {
            setPlaylist((prevState) => {
              return [...prevState, item.data()];
            });
          });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });
    };

    playlist.length === 0 && fetchAllPlaylists();
  }, [history, hasUserLoggedIn, dispatch, playlist]);

  return (
    <Wrapper>
      <h1 className='greet'>Good Morning</h1>

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
  width: 80%;
  height: 77.5vh;
  color: var(--little-light-color);
  overflow-y: scroll;

  .playlists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 15px 12px;
  }
`;

export default Home;
