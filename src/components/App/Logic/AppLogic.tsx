import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth, firestore } from '../../../config/firebase';
import {
  clearNotification,
  sendNotification,
} from '../../../features/notification';
import {
  customSignInSuccess,
  signOut,
  userError,
  userLoadingBegin,
} from '../../../features/user';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const AppLogic = () => {
  const dispatch = useAppDispatch();

  const errorNotification = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      theme: 'colored',
      onClose: () => dispatch(clearNotification()),
    });
  };

  const successNotification = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      theme: 'colored',
      onClose: () => dispatch(clearNotification()),
    });
  };

  const notificationState = useAppSelector((state) => state.notification.value);

  const { userLoading } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    dispatch(userLoadingBegin());

    const fetchUserData = async (email: string | null) => {
      try {
        const users = await firestore.collection('users').get();

        console.log(users);
        const user = users.docs.filter((user) => user.data().email === email);

        console.log(user[0].data());

        dispatch(
          sendNotification({
            message: `Welcome back ${user[0].get('firstName')} ${user[0].get(
              'lastName'
            )}`,
            success: true,
          })
        );
      } catch (err) {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      }
    };

    // Waiting for user to log in
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.email);

        dispatch(customSignInSuccess());
      } else {
        dispatch(signOut());
      }
    });
  }, [dispatch]);

  return {
    userLoading,
    successNotification,
    errorNotification,
    notificationState,
  };
};

export default AppLogic;
