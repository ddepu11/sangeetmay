import { useEffect, useState } from 'react';
import { firestore, firebase } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
} from '../../../features/player';
import { userError, userInfoUpdateSuccess } from '../../../features/user';
import { ISong } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const useSongLogic = (playlistId: string | undefined, song: ISong) => {
  const dispatch = useAppDispatch();

  const [isThisSongBeingplayed, setIsThisSongBeingplayed] =
    useState<boolean>(false);

  const [viewDashBoard, setViewDashBoard] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentSong, play, pause } = useAppSelector(
    (state) => state.player.value
  );

  const { userInfo, id: userDocId } = useAppSelector(
    (state) => state.user.value
  );

  const { role } = useAppSelector((state) => state.user.value);

  const handlePauseSong = () => {
    setIsThisSongBeingplayed(false);
    dispatch(playerPauses());
  };

  const handlePlaySong = () => {
    setIsThisSongBeingplayed(true);

    if (currentSong !== song.url) {
      dispatch(
        playerSetCurrentSongAndPlaylist({
          currentSong: song.url,
          currentSongPic: song.pic.url,
          currentSongName: song.name,
          playlistId: playlistId,
        })
      );
    }

    dispatch(playerPlays());
  };

  useEffect(() => {
    // Both conditions to sync global player play, pause buttons with this screen play,pause button
    if (play && !pause && currentSong === song.url) {
      setIsThisSongBeingplayed(true);
    }

    if (!play && pause && currentSong === song.url) {
      setIsThisSongBeingplayed(false);
    }

    // THis is for when i play different song,this song's play button should display
    if (currentSong !== song.url) {
      setIsThisSongBeingplayed(false);
    }
  }, [play, pause, currentSong, song.url]);

  // Confirming or denying song delete request
  const showConfirmDialogBox = (): void => {
    setViewDashBoard(true);
  };
  const hideConfirmDialogBox = (): void => {
    setViewDashBoard(false);
  };

  // Figuiring out did user liked.
  let didYouLikeTheSong = false;

  if (
    userInfo.likedSongs &&
    userInfo.likedSongs?.length > 0 &&
    role !== 'ADMIN'
  ) {
    userInfo.likedSongs.forEach((item: string) => {
      if (item === song.id) {
        didYouLikeTheSong = true;
      }
    });
  }

  //Like Or Dislike Song
  const handleLikeSsong = () => {
    setLoading(true);

    const songId = song.id;

    const usersRef = firestore.collection('users');
    const songsRef = firestore.collection('songs');

    // save song id in user doc ---> likedSong array
    usersRef
      .doc(userDocId)
      .update({ likedSongs: firebase.firestore.FieldValue.arrayUnion(songId) })
      .then(() => {
        dispatch(
          sendNotification({
            message: 'Successfully liked the song!',
            success: true,
          })
        );
        setLoading(false);

        //Find which song you liked
        songsRef
          .where('id', '==', song.id)
          .get()
          .then((doc) => {
            doc.forEach((item) => {
              //increase likes of song
              if (item.get('id') === songId) {
                songsRef
                  .doc(item.id)
                  .update({ likes: song.likes + 1 })
                  .then(() => {
                    //Get Updated user info
                    firestore
                      .collection('users')
                      .doc(userDocId)
                      .get()
                      .then((doc) => {
                        dispatch(userInfoUpdateSuccess(doc.data()));
                      })
                      .catch((err) => {
                        dispatch(
                          sendNotification({
                            message: err.message,
                            error: true,
                          })
                        );
                        dispatch(userError());
                      });
                  })
                  .catch((err) => {
                    dispatch(
                      sendNotification({ message: err.message, error: true })
                    );
                    dispatch(userError());
                  });
              } else {
                //
                return;
              }
            });
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
        setLoading(false);
      });
  };

  const handleDisLikeSsong = () => {
    setLoading(true);

    const songId = song.id;

    const usersRef = firestore.collection('users');
    const songsRef = firestore.collection('songs');

    // remove song id in user doc ---> likedSong array
    usersRef
      .doc(userDocId)
      .update({ likedSongs: firebase.firestore.FieldValue.arrayRemove(songId) })
      .then(() => {
        dispatch(
          sendNotification({
            message: 'Successfully disliked the song!',
            success: true,
          })
        );
        setLoading(false);

        //Find which song to dislike
        songsRef
          .where('id', '==', song.id)
          .get()
          .then((doc) => {
            doc.forEach((item) => {
              //decrese likes of songs
              if (item.get('id') === songId) {
                songsRef
                  .doc(item.id)
                  .update({ likes: song.likes - 1 })
                  .then(() => {
                    //Get Updated user info
                    firestore
                      .collection('users')
                      .doc(userDocId)
                      .get()
                      .then((doc) => {
                        dispatch(userInfoUpdateSuccess(doc.data()));
                      })
                      .catch((err) => {
                        dispatch(
                          sendNotification({
                            message: err.message,
                            error: true,
                          })
                        );
                        dispatch(userError());
                      });
                  })
                  .catch((err) => {
                    dispatch(
                      sendNotification({ message: err.message, error: true })
                    );
                    dispatch(userError());
                  });
              } else {
                //
                return;
              }
            });
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  return {
    hideConfirmDialogBox,
    showConfirmDialogBox,
    isThisSongBeingplayed,
    handlePlaySong,
    handlePauseSong,
    viewDashBoard,
    role,
    handleDisLikeSsong,
    handleLikeSsong,
    didYouLikeTheSong,
    loading,
  };
};

export default useSongLogic;
