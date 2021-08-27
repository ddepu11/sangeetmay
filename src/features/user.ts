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
    signUpBegin: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: true };
    },

    customSignUpSuccess: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },

    signUpError: (state: IInitialState) => {
      state.value = { ...state.value, userLoading: false };
    },
  },
});

export const { signUpBegin, customSignUpSuccess, signUpError } =
  userSclice.actions;

export default userSclice.reducer;
