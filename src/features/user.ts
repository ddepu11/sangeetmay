import { createSlice } from '@reduxjs/toolkit';

interface IUserInfo {
  age: string | null;
  country: string | null;
  displayPicUrl: string | null;
  email: string | null;
  firstName: string | null;
  gender: string | null;
  lastName: string | null;
  role: string | null;
}

interface IInitialState {
  value: {
    hasUserLoggedIn: boolean;
    role: null | string;
    userLoading: boolean;
    userInfo: IUserInfo;
  };
}

const initialState: IInitialState = {
  value: {
    hasUserLoggedIn: false,
    userLoading: false,
    role: null,
    userInfo: {
      age: null,
      country: null,
      displayPicUrl: null,
      email: null,
      firstName: null,
      gender: null,
      lastName: null,
      role: null,
    },
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
    customSignInSuccess: (state: IInitialState, action) => {
      state.value = {
        ...state.value,
        userLoading: false,
        hasUserLoggedIn: true,
        role: action.payload.role,
        userInfo: action.payload,
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
} = userSclice.actions;

export default userSclice.reducer;
