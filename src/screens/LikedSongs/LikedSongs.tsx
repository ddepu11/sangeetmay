import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import Song from '../../components/song/Song';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { ISong } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const LikedSongs = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [songs, setSongs] = useState<ISong[]>([]);

  const {
    userInfo: { likedSongs },
  } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    let hasComponentBeenUnmounted = false;

    // Fetch Songs
    const songsRef = firestore.collection('songs');

    // let index = 0;
    const songs: ISong[] = [];

    if (likedSongs) {
      setLoading(true);

      for (let i = likedSongs.length - 1; i >= 0; i--) {
        songsRef
          .where('id', '==', likedSongs[i])
          .get()
          .then((doc) => {
            const song = doc.docs[0];
            if (doc.docs.length > 0) {
              if (!hasComponentBeenUnmounted) {
                songs.push(song.data() as ISong);

                // When Finnaly all songs fetched save first one of them , as well all songs in sonsg[] state

                if (i === 0) {
                  setSongs(songs);
                  setLoading(false);
                } else {
                  setLoading(false);
                }

                // index++;
              } else {
                setLoading(false);
              }
            }
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
            setLoading(false);
          });
      }
    }

    return () => {
      hasComponentBeenUnmounted = true;
    };
  }, [likedSongs, dispatch]);

  if (loading) {
    return <Loading size='MEDIUM' />;
  }

  return (
    <Wrapper>
      <h2 className='heading'>Songs that you have liked</h2>

      {likedSongs?.length !== 0 ? (
        <div className='songs'>
          {songs &&
            songs.map((item: ISong, index: number) => {
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
  overflow-y: scroll;

  .heading {
    font-weight: 400;
    font-size: 1.2em;
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

  @media screen and (max-width: 929px) {
    width: 100%;
  }
`;

export default LikedSongs;
