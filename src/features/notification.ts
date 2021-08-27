import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  value: {
    message: string;
    error: boolean;
    success: boolean;
  };
}

const initialState: IInitialState = {
  value: {
    message: '',
    error: false,
    success: false,
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,

  reducers: {
    sendNotification: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },

    clearNotification: (state) => {
      state.value = { error: false, success: false, message: '' };
    },
  },
});

export const { sendNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
