import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    playlistLoading: false,
    playlists: [],
  },
};

const userSlice = createSlice({
  name: 'playlist',

  initialState,

  reducers: {
    playlistLoadingBegin: (state) => {
      state.value = { ...state.value, playlistLoading: true };
    },

    playlistFetchSuccess: (state, action) => {
      state.value = {
        ...state.value,
        playlistLoading: false,
        playlists: action.payload,
      };
    },

    playlistSuccess: (state) => {
      state.value = { ...state.value, playlistLoading: false };
    },

    playlistError: (state) => {
      state.value = { ...state.value, playlistLoading: false };
    },
  },
});

export const {
  playlistSuccess,
  playlistError,
  playlistFetchSuccess,
  playlistLoadingBegin,
} = userSlice.actions;

export default userSlice.reducer;
