import { createSlice } from '@reduxjs/toolkit';

interface IDisplayPic {
  url: string | undefined;
  picNameInStorage: string | undefined;
}

interface IUserInfo {
  age: number | undefined;
  country: string | undefined;
  dp: IDisplayPic | undefined;
  email: string | undefined;
  firstName: string | undefined;
  gender: string | undefined;
  lastName: string | undefined;
  role: string | undefined;
}

interface IInitialState {
  value: {
    hasUserLoggedIn: boolean;
    role: null | string;
    id: undefined | string;
    userLoading: boolean;
    userInfo: IUserInfo;
  };
}

const initialState: IInitialState = {
  value: {
    hasUserLoggedIn: false,
    userLoading: true,
    role: null,
    id: undefined,
    userInfo: {
      age: undefined,
      country: undefined,
      dp: undefined,
      email: undefined,
      firstName: undefined,
      gender: undefined,
      lastName: undefined,
      role: undefined,
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

    userSuccess: (state: IInitialState) => {
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
        id: action.payload.id,
      };
    },

    // Dp Change Success

    userInfoUpdateSuccess: (state: IInitialState, action) => {
      state.value = {
        ...state.value,
        userLoading: false,
        userInfo: action.payload,
      };
    },

    signOut: (state: IInitialState) => {
      state.value = {
        ...state.value,
        role: null,
        hasUserLoggedIn: false,
        id: undefined,
        userInfo: {
          age: undefined,
          country: undefined,
          dp: undefined,
          email: undefined,
          firstName: undefined,
          gender: undefined,
          lastName: undefined,
          role: undefined,
        },
        userLoading: false,
      };
    },
  },
});

export const {
  customSignUpSuccess,
  customSignInSuccess,
  userInfoUpdateSuccess,
  signOut,
  userError,
  userSuccess,
  userLoadingBegin,
} = userSclice.actions;

export default userSclice.reducer;
