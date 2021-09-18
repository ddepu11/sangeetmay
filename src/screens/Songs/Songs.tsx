import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore, storage, firebase } from '../../config/firebase';
import { ISong } from '../../interfaces';
import { sendNotification } from '../../features/notification';
import {
  playlistError,
  playlistLoadingBegin,
  playlistSuccess,
} from '../../features/playlist';
import { useAppDispatch } from '../../redux/hooks';
import Song from '../../components/song/Song';
import { playerSetPlaylistSongs } from '../../features/player';

type Props = {
  songsIds: string[];
  playlistId: string | undefined;
};

const Songs: FC<Props> = ({ songsIds, playlistId }): JSX.Element => {
  const dispatch = useAppDispatch();

  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    let hasComponentBeenUnmounted = false;

    const fetchSongs = () => {
      !hasComponentBeenUnmounted &&
        songsIds.forEach((item: string) => {
          firestore
            .collection('songs')
            .doc(item)
            .get()
            .then((doc) => {
              if (songs && doc.data()) {
                setSongs((prevState) => {
                  return [...prevState, doc.data() as ISong];
                });
              }
            })
            .catch((err) => {
              dispatch(sendNotification({ message: err.message, error: true }));
              dispatch(playlistError());
            });
        });
    };

    songs.length === 0 && fetchSongs();

    dispatch(playerSetPlaylistSongs(songs));

    return () => {
      hasComponentBeenUnmounted = true;
    };
  }, [songsIds, songs, dispatch, playlistId]);

  //############### Handle Deleting Song Starts #########################
  const removeSongIdFromPlaylistSongsArray = (songId: string) => {
    console.log(playlistId);

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
        dispatch(sendNotification({ message: err.message, error: true }));
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
          doc.ref
            .delete()
            .then(() => {
              //3. Song Doc Deleted
              console.log('3. Song Doc Deleted');
              removeSongIdFromPlaylistSongsArray(doc.id);
            })
            .catch((err) => {
              dispatch(sendNotification({ message: err.message, error: true }));
              dispatch(playlistError());
            });
        });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const handleDeleteSong = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    console.log('0.Song delete process started');

    dispatch(playlistLoadingBegin());

    const songId = e.currentTarget.getAttribute('data-id');
    const songToDelete = songs.filter((item: ISong) => item.id === songId)[0];

    setSongs((prevState) => {
      return [...prevState.filter((item: ISong) => item.id !== songId)];
    });

    const songRef = storage.ref(`songs/${songToDelete.name}`);
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
            dispatch(sendNotification({ message: err.message, error: true }));
            dispatch(playlistError());
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  //############### Handle Deleting Song Ends #########################

  return (
    <Wrapper>
      {songs.length !== 0 ? (
        songs.map((item: ISong, index: number) => {
          if (item !== undefined) {
            return (
              <Song
                playlistId={playlistId}
                key={item.id}
                song={item}
                index={index}
                handleDeleteSong={handleDeleteSong}
              />
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
`;

export default Songs;
