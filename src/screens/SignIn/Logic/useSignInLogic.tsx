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

  const { hasUserLoggedIn, role } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    if (hasUserLoggedIn) {
      role === 'ADMIN' ? history.push('/dashboard') : history.push('/');
    }
  }, [history, hasUserLoggedIn, role]);

  const signInWithEmailPassword = () => {
    dispatch(userLoadingBegin());

    auth
      .signInWithEmailAndPassword(
        credentials.email.trim(),
        credentials.password.trim()
      )
      .then(() => {
        // console.log('Successfully signed in!');
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  const handleSignIn = (e?: React.FormEvent<HTMLFormElement>): void => {
    e && e.preventDefault();

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

  //Login as random user
  const loginAsRandomUser = (): void => {
    const randomUser = [
      { email: 'ddepu11@gmail.com', password: 'aaaaaa' },
      { email: 'aayush11@gmail.com', password: '111111' },
      { email: 'anuj44@gmail.com', password: '444444' },
    ];

    const randomUserIndex =
      randomUser[Math.floor(Math.random() * randomUser.length)];

    setCredentials(randomUserIndex);
    handleSignIn();
  };

  // Log in as admin
  const loginAsAdmin = (): void => {
    setCredentials({ email: 'mohan11@gmail.com', password: 'aaaaaa' });
    handleSignIn();
  };

  return {
    handleSignIn,
    handleInput,
    credentials,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    loginAsRandomUser,
    loginAsAdmin,
  };
};

export default useSignInLogic;
