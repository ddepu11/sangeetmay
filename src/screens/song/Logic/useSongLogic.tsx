import { useEffect, useState } from 'react';
import { firestore, firebase } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
} from '../../../features/player';
import {
  userError,
  userInfoUpdateSuccess,
  userLoadingBegin,
} from '../../../features/user';
import { ISong } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const useSongLogic = (playlistId: string | undefined, song: ISong) => {
  const dispatch = useAppDispatch();

  const [isThisSongBeingplayed, setIsThisSongBeingplayed] =
    useState<boolean>(false);

  const [viewDashBoard, setViewDashBoard] = useState(false);

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

  //Like Or Dislike Song
  let disYouLikeTheSong = false;

  if (userInfo.likedSongs && userInfo.likedSongs?.length > 0) {
    userInfo.likedSongs.forEach((item: string) => {
      if (item === song.id) {
        disYouLikeTheSong = true;
      }
    });
  }

  const handleLikeSsong = () => {
    dispatch(userLoadingBegin());

    const songId = song.id;

    const usersRef = firestore.collection('users');
    // const songsRef = firestore.collection('songs');

    usersRef
      .doc(userDocId)
      .update({ likedSongs: firebase.firestore.FieldValue.arrayUnion(songId) })
      .then(() => {
        dispatch(
          sendNotification({
            message: 'Successfully like the song!',
            success: true,
          })
        );

        firestore
          .collection('users')
          .doc(userDocId)
          .get()
          .then((doc) => {
            dispatch(userInfoUpdateSuccess(doc.data()));
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
            dispatch(userError());
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  const handleDisLikeSsong = () => {
    //
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
    disYouLikeTheSong,
  };
};

export default useSongLogic;
