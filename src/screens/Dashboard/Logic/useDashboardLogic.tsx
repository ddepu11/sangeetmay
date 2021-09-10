import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';

import {
  playlistError,
  playlistFetchSuccess,
  playlistLoadingBegin,
} from '../../../features/playlist';

import { IPlaylist, ISong } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const useDashboardLogic = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { playlistLoading, playlists } = useAppSelector(
    (state) => state.playlist.value
  );
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    !hasUserLoggedIn && history.push('/sign-in');

    const fetchDocs = () => {
      return firestore
        .collection('playlists')
        .get()
        .then((data) => {
          const newDocs: IPlaylist[] = [];

          // const noPlaylists = data.docs.length === 0;

          data.docs.forEach((item) => {
            if (item.data() !== undefined) {
              newDocs.push(item.data() as IPlaylist);
            }
          });

          dispatch(playlistFetchSuccess(newDocs));
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(playlistError());
        });
    };

    fetchDocs();

    return () => {
      fetchDocs();
    };
  
  }, [dispatch, playlistLoading, hasUserLoggedIn, history]);

  // ############## Playlist Removal Starts ###############

  const deletePlaylistDoc = (idOfPlaylistToDelete: string): void => {
    firestore
      .collection('playlists')
      .where('id', '==', idOfPlaylistToDelete)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.delete();
          console.log();
        });

        dispatch(
          sendNotification({
            message: 'Successfully deleted your playlist!',
            success: true,
          })
        );

        dispatch(
          playlistFetchSuccess(
            playlists.filter(
              (item: IPlaylist) => item.id !== idOfPlaylistToDelete
            )
          )
        );

        console.log('5.Playlist doc deleted');
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const deleteSongDoc = (
    songId: string,
    idOfPlaylistToDelete: string
  ): void => {
    firestore
      .collection('songs')
      .doc(songId)
      .delete()
      .then(() => {
        console.log("4.Playlist's song doc deleted");
        deletePlaylistDoc(idOfPlaylistToDelete);
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const deleteSongAndPic = (
    song: ISong,
    songId: string,
    idOfPlaylistToDelete: string
  ): void => {
    const songRef = storage.ref(`songs/${song.name}`);

    const songPicRef = storage.ref(`song_pics/${song.pic.name}`);

    songRef
      .delete()
      .then(() => {
        console.log("2.Playlist's song deleted");

        //2. Song Deleted
        songPicRef
          .delete()
          .then(() => {
            //3. Song Pic Deleted
            console.log("3.Playlist's song pic deleted");

            deleteSongDoc(songId, idOfPlaylistToDelete);
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

  const deleteSongsPicAndSongs = (
    playlist: IPlaylist,
    idOfPlaylistToDelete: string
  ): void => {
    // if song array has id then delete them else delete playlist doc

    if (playlist.songs !== undefined) {
      playlist.songs?.length !== 0
        ? playlist.songs?.forEach((item: string) => {
            firestore
              .collection('songs')
              .doc(item)
              .get()
              .then((snap) => {
                if (snap.data() !== undefined) {
                  deleteSongAndPic(
                    snap.data() as ISong,
                    item,
                    idOfPlaylistToDelete
                  );
                }
              })
              .catch((err) => {
                dispatch(
                  sendNotification({ message: err.message, error: true })
                );
                dispatch(playlistError());
              });
          })
        : deletePlaylistDoc(idOfPlaylistToDelete);
    } else {
      deletePlaylistDoc(idOfPlaylistToDelete);
    }
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const wannaDelete: boolean = confirm(
      ' ############### !DANGER! ################ \nDo you really want to delete this playlist?\nNote: Deleting the playlist will also delete the songs you have added in it.'
    );

    if (e !== undefined && wannaDelete) {
      dispatch(playlistLoadingBegin());

      const idOfPlaylistToDelete = e.currentTarget.getAttribute('data-id');

      const playlistToDelete: IPlaylist = playlists.filter(
        (item: IPlaylist) => item.id === idOfPlaylistToDelete
      )[0];

      console.log('0.Playlist delete process started');

      const playlistPicRef = storage.ref(
        `playlist_pics/${playlistToDelete.playlistPic?.picName}`
      );

      playlistPicRef
        .delete()
        .then(() => {
          // 1.Playlist pic deleted
          console.log('1.Playlist pic deleted');
          idOfPlaylistToDelete !== null &&
            deleteSongsPicAndSongs(playlistToDelete, idOfPlaylistToDelete);
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(playlistError());
        });
    }
  };

  // ############## Playlist Removal Ends ###############

  return {
    handleDelete,
    playlistLoading,
    playlists,
  };
};

export default useDashboardLogic;
