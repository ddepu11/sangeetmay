import { createSlice } from '@reduxjs/toolkit';
import { ISong } from '../interfaces';

type TInitialState = {
  value: {
    playerLoading: boolean;
    playerSongs: ISong[] | null;
    currentSong: string;
    isSongBeingPlayed: boolean;
    play: boolean;
    pause: boolean;
  };
};

const initialState: TInitialState = {
  value: {
    playerLoading: false,
    playerSongs: null,
    currentSong: '',
    isSongBeingPlayed: false,
    play: false,
    pause: false,
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
} = playerSlice.actions;

export default playerSlice.reducer;
