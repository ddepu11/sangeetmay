import { useEffect } from 'react';
import styled from 'styled-components';
import Song from '../../components/song/Song';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import {
  playerSetCurrentSongAndPlaylist,
  playerSetPlaylistSongs,
} from '../../features/player';
import { ISong } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const LikedSongs = () => {
  const dispatch = useAppDispatch();
  // const [songs, setSongs] = useState<ISong[]>([]);

  const {
    userInfo: { likedSongs },
  } = useAppSelector((state) => state.user.value);

  const { playlistSongs, play, pause } = useAppSelector(
    (state) => state.player.value
  );

  useEffect(() => {
    // shjiahsi
    let hasComponentBeenUnmounted = false;

    if (!play && !pause) {
      // Fetch Songs
      const songsRef = firestore.collection('songs');

      let index = 0;
      const songs: ISong[] = [];

      likedSongs?.forEach((item) => {
        songsRef
          .where('id', '==', item)
          .get()
          .then((doc) => {
            const song = doc.docs[0];

            if (doc.docs.length > 0) {
              if (!hasComponentBeenUnmounted) {
                songs.push(song.data() as ISong);

                //When Finnaly all songs fetched save first one of them , as well all songs in player redux store
                if (index === likedSongs.length - 1) {
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
            }
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
          });
      });
    }

    return () => {
      hasComponentBeenUnmounted = true;
    };
  }, [likedSongs, dispatch, play, pause]);

  return (
    <Wrapper>
      <h2 className='heading'>Songs That have you liked</h2>

      {likedSongs?.length !== 0 ? (
        <div className='songs'>
          {playlistSongs &&
            playlistSongs.map((item: ISong, index: number) => {
              return (
                <Song
                  key={item.id}
                  index={index}
                  playlistId='LIKED_SONGS'
                  song={item}
                />
              );
            })}
        </div>
      ) : (
        <h3 className='no_songs'>You have not liked any song!</h3>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 15px 5px;
  width: 80%;
  height: 77vh;
  color: var(--little-light-color);

  .heading {
    font-weight: 400;
  }

  .no_songs {
    margin-top: 100px;
    text-align: center;
    font-weight: 400;
    font-size: 1.5em;
  }

  .songs {
    margin-top: 20px;
  }
`;

export default LikedSongs;
