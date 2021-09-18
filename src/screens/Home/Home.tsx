import { useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { IPlaylist, ISong } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Playlist from '../../components/Playlist/Playlist';
import Song from '../../components/song/Song';
import {
  playerPlayAllSongs,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
  playerSetPlaylistSongs,
} from '../../features/player';
import { playlistFetchSuccess } from '../../features/playlist';
import Button from '../../components/Button';

const Home: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { playlists } = useAppSelector((state) => state.playlist.value);
  const { hasUserLoggedIn, role } = useAppSelector((state) => state.user.value);
  const { playlistSongs, play, pause, currentPlaylistId } = useAppSelector(
    (state) => state.player.value
  );
  const history = useHistory();

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');

    role === 'ADMIN' && history.push('/dashboard');

    let hasComponentBeenUnmounted = false;

    if (role !== 'ADMIN' && hasUserLoggedIn) {
      if (!play && !pause) {
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
      }

      // Fetch PLaylists
      const playlistsRef = firestore.collection('playlists');

      let plylistIndex = 0;
      const playlists: IPlaylist[] = [];

      playlistsRef
        .get()
        .then((docs) => {
          !hasComponentBeenUnmounted &&
            docs.forEach((item) => {
              playlists.push(item.data() as IPlaylist);

              if (plylistIndex === docs.size - 1) {
                dispatch(playlistFetchSuccess(playlists));
              }

              plylistIndex++;
            });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });
    }

    return () => {
      hasComponentBeenUnmounted = true;
    };
  }, [history, hasUserLoggedIn, dispatch, role, play, pause]);

  const playAllSongs = (): void => {
    dispatch(playerPlayAllSongs());

    setTimeout(() => {
      dispatch(playerPlays());
    }, 2000);
  };

  return (
    <Wrapper>
      <div className='header flex'>
        <h1 className='heading'>Playlists:</h1>

        <Button
          type='button'
          buttonStyle={{
            padding: '8px 16px',
            borderRadius: '10px',
            transition: 'transform 0.5s ease ',
            hoverTransform: 'scale(1.2) translateX(-5px)',
          }}
          handleClick={playAllSongs}
        >
          Play All Song
        </Button>
      </div>

      <section className='playlists'>
        {playlists.length !== 0 &&
          playlists.map((item: IPlaylist) => (
            <Playlist key={item.id} playlist={item} />
          ))}
      </section>

      <div className='songs'>
        {currentPlaylistId === 'ALL_SONGS' ? (
          <h1>All Songs:</h1>
        ) : (
          <h1>Songs of currently playing playlist:</h1>
        )}

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
  width: 80%;
  height: 77.5vh;
  color: var(--little-light-color);
  overflow-y: scroll;
  padding: 15px 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .heading {
    font-size: 1.5em;
    font-weight: 400;
  }

  .header {
    justify-content: space-between;
  }

  .playlists {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 15px 12px;
  }

  .songs {
    margin-top: 20px;

    h1 {
      font-size: 1.2em;
      font-weight: 400;
    }
  }
  @media screen and (max-width: 929px) {
    width: 100%;
  }
`;

export default Home;
