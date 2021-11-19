import { useEffect } from 'react';
import { Flip, toast } from 'react-toastify';
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

  const { message, success, error } = useAppSelector(
    (state) => state.notification.value
  );

  // For notification
  useEffect(() => {
    const errorNotification = (message: string) => {
      toast.error(message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip,
        onClose: () => dispatch(clearNotification()),
      });
    };

    const successNotification = (message: string) => {
      toast.success(message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip,
        onClose: () => dispatch(clearNotification()),
      });
    };

    if (error) {
      dispatch(clearNotification());
      errorNotification(message);
    }

    if (success) {
      dispatch(clearNotification());
      successNotification(message);
    }
  }, [message, error, success, dispatch]);

  useEffect(() => {
    const fetchUserData = async (email: string | null) => {
      dispatch(userLoadingBegin());

      firestore
        .collection('users')
        .where('email', '==', email)
        .get()
        .then((usersSnap) => {
          usersSnap.forEach((doc) => {
            dispatch(
              sendNotification({
                message: `Welcome back ${doc.get('firstName')} ${doc.get(
                  'lastName'
                )}`,
                success: true,
              })
            );

            dispatch(
              customSignInSuccess({
                ...doc.data(),
                id: doc.id.trim(),
              })
            );
          });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(userError());
        });
    };

    // Waiting for user to log in
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) !hasUserLoggedIn && fetchUserData(user.email);
      else {
        dispatch(signOut());
      }
    });

    return () => {
      unsub();
    };
  }, [dispatch, hasUserLoggedIn]);

  return {
    userLoading,
    hasUserLoggedIn,
    role,
  };
};

export default useAppLogic;
