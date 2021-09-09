import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import { userError, userLoadingBegin } from '../../../features/user';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import validateUserCredentials from '../../../utils/validateUserCredentials';

const useSignInLogic = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const setTimeOutId = useRef<NodeJS.Timeout>();

  const emailValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const passwordValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );

  const dispatch = useAppDispatch();

  const history = useHistory();

  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    hasUserLoggedIn && history.push('/');
  }, [history, hasUserLoggedIn]);

  const signInWithEmailPassword = () => {
    dispatch(userLoadingBegin());

    auth
      .signInWithEmailAndPassword(
        credentials.email.trim(),
        credentials.password.trim()
      )
      .then(() => {
        console.log('Successfully signed in!');
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const error = validateUserCredentials(
      credentials,
      {
        emailValidationMessageTag,
        passwordValidationMessageTag,
      },
      setTimeOutId,
      'SIGN_IN'
    );

    if (!error) {
      signInWithEmailPassword();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return {
    handleSignIn,
    handleInput,
    credentials,
    emailValidationMessageTag,
    passwordValidationMessageTag,
  };
};

export default useSignInLogic;
