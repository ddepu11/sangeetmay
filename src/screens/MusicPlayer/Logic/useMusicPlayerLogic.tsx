import { useEffect, useRef, useState } from 'react';
import {
  playerLoadingBegins,
  playerLoadingEnds,
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
} from '../../../features/player';
import { ISong } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import clearAllIntervalsAndTimeOuts from '../../../utils/clearAllIntervalsAndTimeOuts';

type TSongTetails = {
  duration: {
    minutes: number | string;
    seconds: number | string;
  };

  currentTime: {
    minutes: number | string;
    seconds: number | string;
  };
};

const useMusicPlayerLogic = () => {
  const dispatch = useAppDispatch();

  const [mute, setMute] = useState(true);
  const [volume, setVolume] = useState('0');

  const [songProgress, setSongProgress] = useState('0');

  const [songDetails, setSongDetails] = useState<TSongTetails>({
    duration: {
      minutes: '00',
      seconds: '00',
    },

    currentTime: {
      minutes: '00',
      seconds: '00',
    },
  });

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const songProgressBar = useRef<HTMLInputElement | null>(null);
  const volumeSeeker = useRef<HTMLInputElement | null>(null);
  const lastIntervalId = useRef<NodeJS.Timer | number>(0);

  const {
    currentSong,
    play,
    pause,
    playlistSongs,
    currentPlaylistId,
    currentSongName,
    currentSongPic,
    playerLoading,
  } = useAppSelector((state) => state.player.value);

  useEffect(() => {
    const player = audioPlayer.current;
    const volSeeker = volumeSeeker.current;

    //These two conditions are for play,pause songs from song screen
    if (play && !pause && player && currentSong && volSeeker) {
      player?.play();

      // when you play any song set volume to 0.3
      if (songProgress === '0' && volume === '0') {
        player.volume = 0.3;
        setVolume('0.3');
        setMute(false);

        volSeeker.style.setProperty(
          '--volume-seeker-width',
          `${(0.3 / 1) * 100}%`
        );
      }

      // console.log('Play');
    }

    if (!play && pause && player && currentSong) {
      player?.pause();
      // console.log('Pause');
    }
  }, [dispatch, play, currentSong, pause, songProgress, volume]);

  useEffect(() => {
    if (play && !pause) {
      if (songProgress === '0' && !playerLoading) {
        dispatch(playerLoadingBegins());
      }
    }
  }, [play, pause, songProgress, dispatch, playerLoading]);

  // Clearing out all set timeouts
  useEffect(() => {
    return () => {
      clearAllIntervalsAndTimeOuts(lastIntervalId.current as number);
    };
  }, []);

  // $%$%$%$%$%$%$%$%$%$%$%$________________%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$
  const handlePlaySong = (): void => {
    dispatch(playerPlays());
  };

  const handlePauseSong = (): void => {
    dispatch(playerPauses());
  };

  const resetEveryThingAfterSongEnded = (): void => {
    if (lastIntervalId)
      clearAllIntervalsAndTimeOuts(Number(lastIntervalId.current));

    const progressBar = songProgressBar.current;

    // set progress bar 0
    if (progressBar) {
      progressBar.style.setProperty('--song-completed-width', `0%`);
      setSongProgress('0');
      dispatch(playerPauses());
    }

    // reset song details
    setSongDetails({
      duration: { seconds: '00', minutes: '00' },
      currentTime: { seconds: '00', minutes: '00' },
    });
  };

  // If song has ended playing then ---->
  const handleSongEnded = (): void => {
    resetEveryThingAfterSongEnded();

    //next song
    playNextSong();
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

  const showSongProgress = () => {
    const player = audioPlayer.current;
    if (player && songProgressBar.current) {
      const howMuchTheSongHasBeenPlayed =
        (player.currentTime / player.duration) * 100;

      songProgressBar.current.style.setProperty(
        '--song-completed-width',
        `${howMuchTheSongHasBeenPlayed}%`
      );

      setSongProgress(player.currentTime.toString());

      // Updating time
      const m = Math.floor(player.currentTime / 60);
      let s: number | string = player.currentTime % 60;

      s = Number(s.toFixed(0));

      s = s < 10 ? `0${s}` : `${s}`;

      setSongDetails((prevState) => {
        return { ...prevState, currentTime: { minutes: m, seconds: s } };
      });
    }
  };

  // Music progress and all
  const handlePlaying = (): void => {
    dispatch(playerLoadingEnds());

    setTimeout(() => {
      dispatch(playerLoadingEnds());
    }, 2000);

    setTimeout(() => {
      dispatch(playerLoadingEnds());
    }, 4000);

    const player = audioPlayer.current;
    const progressBar = songProgressBar.current;

    // Showing Buffer Progress
    // --how-much-buffered-width: 0%;
    if (player && progressBar && player.readyState > 0) {
      const bufferedAmount = Math.floor(
        player.buffered.end(player.buffered.length - 1)
      );

      progressBar.style.setProperty(
        '--how-much-buffered-width',
        `${(bufferedAmount / player.duration) * 100}%`
      );
    }

    // Showing Song Progress
    // --song-completed-width: 0%;
    showSongProgress();

    lastIntervalId.current = setInterval(() => {
      showSongProgress();
    }, 1000);
  };

  // $##$##$#######$$$$$##### SEPERATION LINE $$$$$$####$$$$$#####$$$$####$$$$$###

  // @@@@@@@@@@@@@@@@@@   Handling Volume   @@@@@@@@@@@@@@@@@@@@@@@@
  const toggleMute = (): void => {
    const player = audioPlayer.current;

    const volSeeker = volumeSeeker.current;

    setMute((prevState) => {
      // Unmute
      if (prevState) {
        if (player) player.volume = 0.3;
        setVolume('0.3');

        if (volSeeker)
          volSeeker.style.setProperty(
            '--volume-seeker-width',
            `${(0.3 / 1) * 100}%`
          );
      }

      // mute
      if (!prevState) {
        if (player) player.volume = 0;
        setVolume('0');

        if (volSeeker)
          volSeeker.style.setProperty('--volume-seeker-width', `0%`);
      }

      return !prevState;
    });
  };

  //Volume inc/dec
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    setVolume(value);

    const player = audioPlayer.current;
    if (player) player.volume = Number(value);

    // If volume 0, set mute true else false
    if (value === '0') setMute(true);
    else setMute(false);

    const volSeeker = volumeSeeker.current;

    if (volSeeker)
      volSeeker.style.setProperty(
        '--volume-seeker-width',
        `${(+value / 1) * 100}%`
      );
  };

  //Next  song
  const playNextSong = () => {
    const player = audioPlayer.current;

    if (player && playlistSongs && playlistSongs?.length > 1) {
      resetEveryThingAfterSongEnded();

      let indexOfNextSongToPlay = 0;

      playlistSongs.forEach((item: ISong, index) => {
        if (item.url === currentSong) {
          indexOfNextSongToPlay = index + 1;

          //this condition is for when current song is th last of the playlist then next song will be the first one of playlist
          if (index === playlistSongs.length - 1) {
            indexOfNextSongToPlay = 0;
          }
        }
      });

      const song = playlistSongs[indexOfNextSongToPlay];

      dispatch(
        playerSetCurrentSongAndPlaylist({
          currentSong: song.url,
          currentSongPic: song.pic.url,
          currentSongName: song.name,
          playlistId: currentPlaylistId,
        })
      );

      handlePlaySong();
    }
  };

  //Previous song
  const playPreviousSong = () => {
    const player = audioPlayer.current;

    if (player && playlistSongs && playlistSongs?.length > 1) {
      resetEveryThingAfterSongEnded();

      let indexOfNextSongToPlay = 0;

      playlistSongs.forEach((item: ISong, index) => {
        if (item.url === currentSong) {
          indexOfNextSongToPlay = index - 1;

          //this condition is for when current song is the first one of the playlist then previous song will be the last one of playlist
          if (index === 0) {
            indexOfNextSongToPlay = playlistSongs.length - 1;
          }
        }
      });

      const song = playlistSongs[indexOfNextSongToPlay];

      dispatch(
        playerSetCurrentSongAndPlaylist({
          currentSong: song.url,
          currentSongPic: song.pic.url,
          currentSongName: song.name,
          playlistId: currentPlaylistId,
        })
      );

      handlePlaySong();
    }
  };

  return {
    currentSongName,
    currentSongPic,
    playerLoading,
    playNextSong,
    playPreviousSong,
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
    volumeSeeker,
    songDetails,
  };
};

export default useMusicPlayerLogic;
