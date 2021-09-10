import { useEffect, useRef, useState } from 'react';
import {
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

  const [mute, setMute] = useState(false);
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
  const setIntervals = useRef<NodeJS.Timer | number>(0);

  const { currentSong, play, pause, playlistSongs, currentPlaylistId } =
    useAppSelector((state) => state.player.value);

  useEffect(() => {
    const player = audioPlayer.current;
    const volSeeker = volumeSeeker.current;

    //These two conditions are for play,pause songs from song screen
    if (play && !pause && player && currentSong && volSeeker) {
      player?.play();

      if (songProgress === '0') {
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
  }, [dispatch, play, currentSong, pause, songProgress]);

  const handlePlaySong = (): void => {
    dispatch(playerPlays());
  };

  const handlePauseSong = (): void => {
    dispatch(playerPauses());
  };

  // If song has ended playing then ---->
  const handleSongEnded = (): void => {
    if (setIntervals)
      clearAllIntervalsAndTimeOuts(Number(setIntervals.current));

    const progressBar = songProgressBar.current;

    if (progressBar) {
      progressBar.style.setProperty('--song-completed-width', `0%`);
      setSongProgress('0');
      dispatch(playerPauses());
    }

    setSongDetails({
      duration: { seconds: '00', minutes: '00' },
      currentTime: { seconds: '00', minutes: '00' },
    });
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

        // Updating time
        const m = Math.floor(player.currentTime / 60);
        let s: number | string = player.currentTime % 60;

        s = Number(s.toFixed(0));

        s = s < 10 ? `0${s}` : `${s}`;

        setSongDetails({
          ...songDetails,
          currentTime: { minutes: m, seconds: s },
        });
        // ############$$$$$$$$$$$###############$$$$$$$$$$$
      }
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

    // If volume 0 set mute true else false
    if (value === '0') setMute(true);
    else setMute(false);

    const volSeeker = volumeSeeker.current;

    if (volSeeker)
      volSeeker.style.setProperty(
        '--volume-seeker-width',
        `${(+value / 1) * 100}%`
      );
  };

  //Next and Previous song

  const playNextSong = () => {
    const player = audioPlayer.current;

    if (player && playlistSongs && playlistSongs?.length > 1) {
      handleSongEnded();

      let indexOfNextSongToPlay = 0;

      playlistSongs.forEach((item: ISong, index) => {
        if (item.url === currentSong) {
          indexOfNextSongToPlay = index + 1;

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

  const playPreviousSong = () => {
    const player = audioPlayer.current;

    if (player && playlistSongs && playlistSongs?.length > 1) {
      handleSongEnded();

      let indexOfNextSongToPlay = 0;

      playlistSongs.forEach((item: ISong, index) => {
        if (item.url === currentSong) {
          indexOfNextSongToPlay = index - 1;

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
