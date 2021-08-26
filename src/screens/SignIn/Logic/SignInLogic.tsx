import { useRef, useState } from 'react';
import validateUserCredentials from '../../../utils/validateUserCredentials';

const SignInLogic = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const setTimeOutId = useRef<NodeJS.Timeout>();

  const emailValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const passwordValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    validateUserCredentials(
      credentials,
      {
        emailValidationMessageTag,
        passwordValidationMessageTag,
      },
      setTimeOutId
    );

    // setCredentials({ email: '', password: '' });
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
