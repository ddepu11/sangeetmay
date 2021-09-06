import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    playerLoading: false,
    playerSongs: [],
    currentSong: '',
    isSongBeingPlayed: false,
  },
};

const playerSlice = createSlice({
  name: 'player',

  initialState,

  reducers: {
    playerLoadingBegins: (state) => {
      state.value = { ...state.value, playerLoading: true };
    },

    playerSongsToPlayerSongs: (state, action) => {
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

    playerPlaySong: (state) => {
      state.value = {
        ...state.value,
        isSongBeingPlayed: true,
        playerLoading: false,
      };
    },

    playerPauseSong: (state) => {
      state.value = {
        ...state.value,
        isSongBeingPlayed: false,
        playerLoading: false,
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
  playerSongsToPlayerSongs,
  playerPlaySong,
  playerPauseSong,
} = playerSlice.actions;

export default playerSlice.reducer;
