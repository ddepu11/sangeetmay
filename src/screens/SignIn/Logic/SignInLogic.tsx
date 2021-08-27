import { useRef, useState } from 'react';
import { auth, firestore } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  customSignInSuccess,
  signInBegin,
  signInError,
} from '../../../features/user';
import { useAppDispatch } from '../../../redux/hooks';
import validateUserCredentials from '../../../utils/validateUserCredentials';

const SignInLogic = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const setTimeOutId = useRef<NodeJS.Timeout>();

  const emailValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const passwordValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );

  const dispatch = useAppDispatch();

  const signInWithEmailPassword = async () => {
    dispatch(signInBegin());

    try {
      const userCredentiasl = await auth.signInWithEmailAndPassword(
        credentials.email.trim(),
        credentials.password.trim()
      );

      const email = userCredentiasl.user?.email;

      const users = await firestore.collection('users').get();

      const user = users.docs.filter((user) => user.data().email === email);

      dispatch(
        sendNotification({
          message: `Welcome back ${user[0].get('firstName')} ${user[0].get(
            'lastName'
          )}`,
          success: true,
        })
      );

      dispatch(customSignInSuccess());
    } catch (err) {
      dispatch(sendNotification({ message: err.message, error: true }));
      dispatch(signInError());
    }
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
      setCredentials({ email: '', password: '' });
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

export default SignInLogic;
