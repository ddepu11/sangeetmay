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
    // Sign Up
    signUpBegin: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: true };
    },

    customSignUpSuccess: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },

    signUpError: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },
    //################# Sign Up Ends ####################

    // Sign In
    signInBegin: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: true };
    },

    customSignInSuccess: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },

    signInError: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },
  },
});

export const {
  signUpBegin,
  customSignUpSuccess,
  signUpError,
  signInBegin,
  customSignInSuccess,
  signInError,
} = userSclice.actions;

export default userSclice.reducer;
