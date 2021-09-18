import { createSlice } from '@reduxjs/toolkit';
import { ISong } from '../interfaces';

type TInitialState = {
  value: {
    playerLoading: boolean;
    currentPlaylistId: string;
    currentSong: string;
    currentSongPic: string;
    currentSongName: string;
    play: boolean;
    pause: boolean;
    playlistSongs: ISong[] | null;
  };
};

const initialState: TInitialState = {
  value: {
    playerLoading: false,
    currentPlaylistId: '',
    currentSong: '',
    currentSongPic: '',
    currentSongName: '',
    play: false,
    pause: false,
    playlistSongs: null,
  },
};

const playerSlice = createSlice({
  name: 'player',

  initialState,

  reducers: {
    playerLoadingBegins: (state) => {
      state.value = { ...state.value, playerLoading: true };
    },

    playerLoadingEnds: (state) => {
      state.value = { ...state.value, playerLoading: false };
    },

    playerSetCurrentSongAndPlaylist: (state, action) => {
      const { currentSong, playlistId, currentSongPic, currentSongName } =
        action.payload;

      state.value = {
        ...state.value,
        currentSong,
        currentPlaylistId: playlistId,
        currentSongPic,
        currentSongName,
        playerLoading: false,
      };
    },

    playerPlays: (state) => {
      state.value = {
        ...state.value,
        play: true,
        pause: false,
      };
    },

    playerPauses: (state) => {
      state.value = {
        ...state.value,
        play: false,
        pause: true,
      };
    },

    playerSetPlaylistSongs: (state, action) => {
      state.value = {
        ...state.value,
        playlistSongs: action.payload,
      };
    },

    playerPlayAllSongs: (state) => {
      state.value = { ...state.value, play: false, pause: false };
    },

    playerError: (state) => {
      state.value = { ...state.value, playerLoading: false };
    },
  },
});

export const {
  playerError,
  playerLoadingBegins,
  playerSetCurrentSongAndPlaylist,
  playerPlays,
  playerPauses,
  playerSetPlaylistSongs,
  playerPlayAllSongs,
  playerLoadingEnds,
} = playerSlice.actions;

export default playerSlice.reducer;
