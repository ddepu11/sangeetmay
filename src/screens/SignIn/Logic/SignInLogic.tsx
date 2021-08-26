import { useState } from 'react';

const SignInLogic = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCredentials({ email: '', password: '' });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return { handleSignIn, handleInput, credentials };
};

export default SignInLogic;
