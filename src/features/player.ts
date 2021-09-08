import { createSlice } from '@reduxjs/toolkit';
import { ISong } from '../interfaces';

type TInitialState = {
  value: {
    playerLoading: boolean;
    playerSongs: ISong[] | null;
    currentSong: string;
    play: boolean;
    pause: boolean;
    playlistSongs: string[] | null;
  };
};

const initialState: TInitialState = {
  value: {
    playerLoading: false,
    playerSongs: null,
    currentSong: '',
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

    playerSetSongs: (state, action) => {
      state.value = {
        ...state.value,
        playerSongs: action.payload,
        playerLoading: false,
      };
    },

    playerSetCurrentSong: (state, action) => {
      state.value = {
        ...state.value,
        currentSong: action.payload,
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

    playerSetPlaylist: (state, action) => {
      state.value = {
        ...state.value,
        playlistSongs: [...action.payload],
      };
    },

    playerError: (state) => {
      state.value = { ...state.value, playerLoading: false };
    },
  },
});

export const {
  playerError,
  playerLoadingBegins,
  playerSetCurrentSong,
  playerSetSongs,
  playerPlays,
  playerPauses,
  playerSetPlaylist,
} = playerSlice.actions;

export default playerSlice.reducer;
