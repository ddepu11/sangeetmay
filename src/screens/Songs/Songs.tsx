import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore, storage, firebase } from '../../config/firebase';
import { ISong } from '../../interfaces';
import { FcDeleteRow } from 'react-icons/fc';
import { sendNotification } from '../../features/notification';
import {
  playlistError,
  playlistLoadingBegin,
  playlistSuccess,
} from '../../features/playlist';
import { useAppDispatch } from '../../redux/hooks';

const Songs = ({
  songsIds,
  playlistId,
}: {
  songsIds: string[];
  playlistId: string | undefined;
}) => {
  const dispatch = useAppDispatch();

  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchSongs = () => {
      return songsIds.forEach((item: string) => {
        return firestore
          .collection('songs')
          .doc(item)
          .get()
          .then((doc) => {
            if (songs !== undefined && doc.data() !== undefined) {
              setSongs((prevState) => {
                return [...prevState, doc.data() as ISong];
              });
            }
          });
      });
    };

    songs.length === 0 && fetchSongs();
  }, [songsIds, songs]);

  const removeSongIdFromPlaylistSongsArray = (songId: string) => {
    firestore
      .collection('playlists')
      .doc(playlistId)
      .update({ songs: firebase.firestore.FieldValue.arrayRemove(songId) })
      .then(() => {
        //3. Song id removed from songs array of playlist
        console.log('3. Song id removed from songs array of playlist');
        dispatch(playlistSuccess());
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, success: true }));
        dispatch(playlistError());
      });
  };

  const deleteSongDoc = (songId: string): void => {
    firestore
      .collection('songs')
      .where('id', '==', songId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.data();

          doc.ref
            .delete()
            .then(() => {
              //3. Song Doc Deleted
              console.log('3. Song Doc Deleted');
              removeSongIdFromPlaylistSongsArray(doc.id);
            })
            .catch((err) => {
              dispatch(
                sendNotification({ message: err.message, success: true })
              );
              dispatch(playlistError());
            });
        });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, success: true }));
        dispatch(playlistError());
      });
  };

  const handleDeleteSong = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    console.log('0.Song delete process started');

    dispatch(playlistLoadingBegin());

    const songId = e.currentTarget.getAttribute('data-id');
    const songToDelete = songs.filter((item: ISong) => item.id === songId)[0];

    setSongs((prevState) => {
      return [...prevState.filter((item: ISong) => item.id !== songId)];
    });

    const songRef = storage.ref(`songs/${songToDelete.song.name}`);
    const songPicRef = storage.ref(`song_pics/${songToDelete.pic.name}`);

    songRef
      .delete()
      .then(() => {
        console.log('1. Song Deleted');
        //1. Song Deleted
        songPicRef
          .delete()
          .then(() => {
            console.log('2. Song Pic Deleted');
            //2. Song Pic Deleted
            deleteSongDoc(songToDelete.id);
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, success: true }));
            dispatch(playlistError());
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, success: true }));
        dispatch(playlistError());
      });
  };

  return (
    <Wrapper>
      {songs.length !== 0 ? (
        songs.map((item: ISong, index: number) => {
          console.log(item, songs);

          if (item !== undefined) {
            return (
              <div key={item.id} className='song flex'>
                <span className='index'>{index + 1}.</span>

                <p className='name'>{item.song.name}</p>

                <p className='likes'>Likes : {item.likes}</p>

                <FcDeleteRow
                  className='delete_btn'
                  onClick={handleDeleteSong}
                  data-id={item.id}
                />
              </div>
            );
          }
        })
      ) : (
        <h1 className='no_songs_heading'>
          there are no songs in this playlists
        </h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 15px 10px;
  margin-top: 15px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em,
    rgb(0 0 0 / 25%) 0px 0.125em 0.5em,
    rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;

  .no_songs_heading {
    padding: 10px 0;
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.3em;
    text-transform: lowercase;
    font-weight: 400;
  }

  .song {
    justify-content: space-between;
    margin-bottom: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 12px 10px;

    .index {
      font-size: 1.2em;
    }

    .name {
      font-size: 1.2em;
      /* margin-left: 30px; */
    }

    .likes {
      font-size: 1.2em;
      /* margin-left: 20px; */
    }

    .delete_btn {
      font-size: 1.3em;
      transition: transform 0.5s ease;
    }

    .delete_btn:hover {
      transform: scale(1.3);
      cursor: pointer;
    }
  }
`;

export default Songs;
