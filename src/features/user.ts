import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  value: {
    hasUserLoggedIn: boolean;
    role: null | string;
    name: string;
    age: number;
    email: string;
  };
}

const initialState: IInitialState = {
  value: {
    hasUserLoggedIn: false,
    role: null,
    name: '',
    age: 0,
    email: '',
  },
};

export const userSclice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    login: (state: IInitialState, action) => {
      state.value = { ...state.value, ...action.payload };
    },

    logOut: (state: IInitialState, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { login, logOut } = userSclice.actions;

export default userSclice.reducer;
