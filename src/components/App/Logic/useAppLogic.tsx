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

const useAppLogic = () => {
  const { userLoading, hasUserLoggedIn, role } = useAppSelector(
    (state) => state.user.value
  );

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

  const { message, success } = useAppSelector(
    (state) => state.notification.value
  );

  useEffect(() => {
    const fetchUserData = async (email: string | null) => {
      dispatch(userLoadingBegin());

      firestore
        .collection('users')
        .get()
        .then((users) => {
          const user = users.docs.filter((user) => user.data().email === email);

          if (user.length !== 0) {
            dispatch(
              sendNotification({
                message: `Welcome back ${user[0].get(
                  'firstName'
                )} ${user[0].get('lastName')}`,
                success: true,
              })
            );

            dispatch(
              customSignInSuccess({
                ...user[0].data(),
                id: user[0].id.trim(),
              })
            );
          }
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(userError());
        });
    };

    // Waiting for user to log in
    auth.onAuthStateChanged((user) => {
      if (user) !hasUserLoggedIn && fetchUserData(user.email);
      else dispatch(signOut());
    });
  }, [dispatch, hasUserLoggedIn]);

  const notify = () => {
    success ? successNotification(message) : errorNotification(message);
    dispatch(clearNotification());
  };

  return {
    userLoading,
    successNotification,
    errorNotification,
    notify,
    message,
    hasUserLoggedIn,
    role,
  };
};

export default useAppLogic;
