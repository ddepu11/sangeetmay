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

    clearPlaylist: (state) => {
      state.value = { playlistLoading: false, playlists: [] };
    },
  },
});

export const {
  playlistSuccess,
  playlistError,
  playlistFetchSuccess,
  playlistLoadingBegin,
  clearPlaylist,
} = userSlice.actions;

export default userSlice.reducer;
