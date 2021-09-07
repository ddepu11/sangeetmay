import { useEffect, useRef, useState } from 'react';
import { playerPauses, playerPlays } from '../../../features/player';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

type TSongTetails = {
  duration: {
    minutes: number;
    seconds: number | string;
  };
};

const useMusicPlayerLogic = () => {
  const dispatch = useAppDispatch();

  const [songProgress, setSongProgress] = useState<string>('0');
  const [songDetails, setSongDetails] = useState<TSongTetails>({
    duration: {
      minutes: 0,
      seconds: 0,
    },
  });

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const songProgressBar = useRef<HTMLInputElement | null>(null);
  const setIntervals = useRef<NodeJS.Timer | number>(0);

  const { currentSong, play, pause } = useAppSelector(
    (state) => state.player.value
  );

  useEffect(() => {
    //These two conditions are for play,pause songs from song screen
    if (play && !pause && audioPlayer.current !== null && currentSong) {
      audioPlayer.current?.play();
      // console.log('Plays');
    }

    if (!play && pause && audioPlayer.current !== null && currentSong) {
      audioPlayer.current?.pause();
      // console.log('Pause');
    }

    // console.log(songDetails);
  }, [dispatch, play, currentSong, pause, songDetails]);

  const handlePlaySong = (): void => {
    dispatch(playerPlays());
  };

  const handlePauseSong = (): void => {
    dispatch(playerPauses());
  };

  const handleSongEnded = (): void => {
    if (setIntervals) {
      let id = +setIntervals.current;

      while (id) {
        clearInterval(id);
        id--;
      }
    }

    if (songProgressBar.current !== null) {
      songProgressBar.current.style.setProperty('--song-completed-width', `0%`);
      setSongProgress('0');
      dispatch(playerPauses());
    }
  };

  const handleSongProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSongProgress(value);

    if (audioPlayer.current !== null) {
      audioPlayer.current.currentTime = +value;
    }
  };

  const getherPlayedSongDetails = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ): void => {
    const player = e.currentTarget;
    const progressBar = songProgressBar.current;

    if (player) {
      const minutes: number = Math.floor(player.duration / 60);
      let seconds: number | string = player.duration % 60;

      seconds = Number(seconds.toFixed(0));

      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      setSongDetails((prevState) => {
        return {
          ...prevState,
          duration: {
            minutes,
            seconds,
          },
        };
      });
    }
    //   --song-completed-width: 0%;
    // --how-much-buffered-width: 0%;

    if (progressBar !== null) {
      progressBar.max = player.duration.toString();
      setSongProgress(player.currentTime.toString());
    }
  };

  const handlePlaying = (): void => {
    const player = audioPlayer.current;
    const progressBar = songProgressBar.current;

    if (player && progressBar && player.readyState > 0) {
      const bufferedAmount = Math.floor(
        player.buffered.end(player.buffered.length - 1)
      );

      progressBar.style.setProperty(
        '--how-much-buffered-width',
        `${(bufferedAmount / player.duration) * 100}%`
      );
    }

    // Showing Progress
    setIntervals.current = setInterval(() => {
      if (player !== null && songProgressBar.current !== null) {
        const howMuchTheSongHasBeenPlayed =
          (player.currentTime / player.duration) * 100;

        songProgressBar.current.style.setProperty(
          '--song-completed-width',
          `${howMuchTheSongHasBeenPlayed}%`
        );

        setSongProgress(player.currentTime.toString());
      }
    }, 1000);
  };

  return {
    handleSongEnded,
    handlePlaying,
    getherPlayedSongDetails,
    handleSongProgressChange,
    handlePauseSong,
    handlePlaySong,
    songProgress,
    currentSong,
    audioPlayer,
    play,
    pause,
    songProgressBar,
  };
};

export default useMusicPlayerLogic;
