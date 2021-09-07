import { useEffect, useRef, useState } from 'react';
import { playerPauses, playerPlays } from '../../../features/player';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import clearAllIntervalsAndTimeOuts from '../../../utils/clearAllIntervalsAndTimeOuts';

type TSongTetails = {
  duration: {
    minutes: number;
    seconds: number | string;
  };
};

const useMusicPlayerLogic = () => {
  const dispatch = useAppDispatch();

  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState('0.2');

  const [songProgress, setSongProgress] = useState('0');
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

  // If song has ended playing then ---->
  const handleSongEnded = (): void => {
    if (setIntervals) {
      clearAllIntervalsAndTimeOuts(Number(setIntervals.current));
    }

    const progressBar = songProgressBar.current;
    if (progressBar) {
      progressBar.style.setProperty('--song-completed-width', `0%`);
      setSongProgress('0');
      dispatch(playerPauses());
    }
  };

  // If i move thumb change player current time ---->
  const handleSongProgressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSongProgress(value);

    const player = audioPlayer.current;

    if (player) player.currentTime = Number(value);
  };

  const getherPlayedSongDetails = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ): void => {
    const player = e.currentTarget;
    const progressBar = songProgressBar.current;

    // Get song details
    if (player) {
      const minutes: number = Math.floor(player.duration / 60);

      let seconds: number | string = player.duration % 60;
      seconds = Number(seconds.toFixed(0));
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      setSongDetails({
        ...songDetails,
        duration: {
          minutes,
          seconds,
        },
      });
    }

    if (progressBar) {
      progressBar.max = player.duration.toString();
      setSongProgress(player.currentTime.toString());
    }
  };

  // Music progress and all
  const handlePlaying = (): void => {
    const player = audioPlayer.current;
    const progressBar = songProgressBar.current;

    // --how-much-buffered-width: 0%;
    // Showing Buffer Progress
    if (player && progressBar && player.readyState > 0) {
      const bufferedAmount = Math.floor(
        player.buffered.end(player.buffered.length - 1)
      );

      progressBar.style.setProperty(
        '--how-much-buffered-width',
        `${(bufferedAmount / player.duration) * 100}%`
      );
    }

    // --song-completed-width: 0%;
    // Showing Song Progress
    setIntervals.current = setInterval(() => {
      if (player && songProgressBar.current) {
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

  // $##$##$#######$$$$$##### SEPERATION LINE $$$$$$####$$$$$#####$$$$####$$$$$###

  // @@@@@@@@@@@@@@@@@@   Handling Volume   @@@@@@@@@@@@@@@@@@@@@@@@
  const toggleMute = (): void => {
    const player = audioPlayer.current;

    if (player) {
      setMute((prevState) => {
        if (prevState && player) {
          player.volume = 1;
        }

        if (!prevState && player) {
          player.volume = 0;
        }

        return !prevState;
      });
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setVolume(value);
    const player = audioPlayer.current;

    if (player) {
      player.volume = Number(value);
    }
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
    mute,
    toggleMute,
    volume,
    handleVolume,
  };
};

export default useMusicPlayerLogic;
