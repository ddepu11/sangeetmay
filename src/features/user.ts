import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  value: {
    hasUserLoggedIn: boolean;
    role: null | string;
    userLoading: boolean;
  };
}

const initialState: IInitialState = {
  value: {
    hasUserLoggedIn: false,
    userLoading: false,
    role: null,
  },
};

export const userSclice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    userLoadingBegin: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: true };
    },

    userError: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },

    // Sign Up
    customSignUpSuccess: (state: IInitialState) => {
      state.value = {
        ...state.value,
        userLoading: false,
      };
    },

    // Sign In
    customSignInSuccess: (state: IInitialState) => {
      state.value = {
        ...state.value,
        userLoading: false,
        hasUserLoggedIn: true,
      };
    },

    signOut: (state: IInitialState) => {
      state.value = {
        ...state.value,
        hasUserLoggedIn: false,
      };
    },
  },
});

export const {
  customSignUpSuccess,
  customSignInSuccess,
  signOut,
  userError,
  userLoadingBegin,
  clearCustomSignUpSuccess,
} = userSclice.actions;

export default userSclice.reducer;
