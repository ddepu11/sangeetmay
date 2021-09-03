import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import notificationReducer from '../features/notification';
import playlistReducer from '../features/playlist';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    playlist: playlistReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
