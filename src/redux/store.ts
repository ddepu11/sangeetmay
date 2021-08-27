import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import notoficationReducer from '../features/notification';

const store = configureStore({
  reducer: { user: userReducer, notification: notoficationReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
