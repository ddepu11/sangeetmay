import { useEffect, useState } from 'react';
import {
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
} from '../../../features/player';
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

  return {
    hideConfirmDialogBox,
    showConfirmDialogBox,
    isThisSongBeingplayed,
    handlePlaySong,
    handlePauseSong,
    viewDashBoard,
    role,
  };
};

export default useSongLogic;
