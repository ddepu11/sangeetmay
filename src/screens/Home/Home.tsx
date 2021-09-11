import { useEffect, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { IPlaylist, ISong } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Playlist from '../../components/Playlist/Playlist';
import Song from '../song/Song';
import {
  playerSetCurrentSongAndPlaylist,
  playerSetPlaylistSongs,
} from '../../features/player';

const Home: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  const { hasUserLoggedIn, role } = useAppSelector((state) => state.user.value);
  const { playlistSongs } = useAppSelector((state) => state.player.value);
  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');

    role === 'ADMIN' && history.push('/dashboard');

    let hasComponentBeenUnmounted = false;

    if (role !== 'ADMIN' && hasUserLoggedIn) {
      // Fetch Songs
      const songsRef = firestore.collection('songs');

      let index = 0;
      const songs: ISong[] = [];

      songsRef
        .get()
        .then((docs) => {
          docs.forEach((item) => {
            if (!hasComponentBeenUnmounted) {
              songs.push(item.data() as ISong);

              //When Finnaly all songs fetched save first one of them , as well all songs in player redux store
              if (index === docs.size - 1) {
                dispatch(
                  playerSetCurrentSongAndPlaylist({
                    currentSong: songs[0].url,
                    currentSongPic: songs[0].pic.url,
                    currentSongName: songs[0].name,
                    playlistId: 'ALL_SONGS',
                  })
                );

                dispatch(playerSetPlaylistSongs(songs));
              }

              index++;
            }
          });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });

      // Fetch PLaylists
      const playlistsRef = firestore.collection('playlists');

      playlistsRef
        .get()
        .then((docs) => {
          !hasComponentBeenUnmounted &&
            docs.forEach((item) => {
              setPlaylist((prevState) => {
                return [...prevState, item.data() as IPlaylist];
              });
            });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });
    }

    return () => {
      console.log('Clean Up Function runs.');
      hasComponentBeenUnmounted = true;
    };
  }, [history, hasUserLoggedIn, dispatch, role]);

  return (
    <Wrapper>
      <h1 className='heading'>Playlist</h1>

      <section className='playlists'>
        {playlist.length !== 0 &&
          playlist.map((item: IPlaylist) => (
            <Playlist key={item.id} playlist={item} />
          ))}
      </section>

      <div className='songs'>
        {playlistSongs &&
          playlistSongs.length !== 0 &&
          playlistSongs.map((item: ISong, index: number) => (
            <Song
              key={item.id}
              song={item}
              index={index}
              playlistId='ALL_SONGS'
            />
          ))}
      </div>
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
