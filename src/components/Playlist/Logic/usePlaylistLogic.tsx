import { useEffect, useState } from 'react';
import { firestore } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
  playerSetPlaylistSongs,
} from '../../../features/player';
import { playlistError } from '../../../features/playlist';
import { IPlaylist, ISong } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const usePlayListLogic = (playlist: IPlaylist) => {
  const dispatch = useAppDispatch();

  const [isThisPlaylistBeingPlayed, setIsThisPlaylistBeingPlayed] =
    useState(false);

  const [viewDashBoard, setViewDashBoard] = useState(false);

  const { role } = useAppSelector((state) => state.user.value);

  const { currentPlaylistId, play, pause } = useAppSelector(
    (state) => state.player.value
  );

  useEffect(() => {
    // Both conditions to sync global player play, pause buttons with this screen play,pause button
    if (play && !pause && currentPlaylistId === playlist.id) {
      setIsThisPlaylistBeingPlayed(true);
    }

    if (!play && pause && currentPlaylistId === playlist.id) {
      setIsThisPlaylistBeingPlayed(false);
    }

    if (currentPlaylistId !== playlist.id) {
      setIsThisPlaylistBeingPlayed(false);
    }
  }, [currentPlaylistId, playlist.id, play, pause]);

  // Confirming or denying song delete request
  const showConfirmDialogBox = (): void => {
    setViewDashBoard(true);
  };
  const hideConfirmDialogBox = (): void => {
    setViewDashBoard(false);
  };

  // Play Or Pause Playlist
  const handlePlayPlaylist = () => {
    setIsThisPlaylistBeingPlayed(true);

    if (currentPlaylistId !== playlist.id) {
      const songs: ISong[] = [];

      playlist.songs &&
        playlist.songs.forEach((item: string, index: number, array) => {
          firestore
            .collection('songs')
            .doc(item)
            .get()
            .then((doc) => {
              const song: ISong = doc.data() as ISong;

              // Set first song from playlist as current song
              if (index === 0) {
                dispatch(
                  playerSetCurrentSongAndPlaylist({
                    currentSong: song.url,
                    currentSongPic: song.pic.url,
                    currentSongName: song.name,
                    playlistId: playlist.id,
                  })
                );
                dispatch(playerPlays());
              }

              if (song) {
                songs.push(song);
              }

              // Set songs url from playlist to playlistArray of player
              if (index === array.length - 1) {
                dispatch(playerSetPlaylistSongs(songs));
              }
            })
            .catch((err) => {
              dispatch(sendNotification({ message: err.message, error: true }));
              dispatch(playlistError());
            });
        });
    }

    dispatch(playerPlays());
  };

  const handlePausePlaylist = () => {
    setIsThisPlaylistBeingPlayed(false);
    dispatch(playerPauses());
  };

  return {
    handlePausePlaylist,
    handlePlayPlaylist,
    hideConfirmDialogBox,
    showConfirmDialogBox,
    role,
    viewDashBoard,
    isThisPlaylistBeingPlayed,
  };
};

export default usePlayListLogic;
