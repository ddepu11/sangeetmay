import { MutableRefObject } from 'react';
import setValidationMessage from './setValidationMessage';

interface ICredentials {
  email: string;
  password: string;
}

interface IValidationMessageRef {
  emailValidationMessageTag: MutableRefObject<HTMLParagraphElement | null>;
  passwordValidationMessageTag: MutableRefObject<HTMLParagraphElement | null>;
}

const validateUserCredentials = (
  credentials: ICredentials,
  validationMessageRef: IValidationMessageRef,
  setTimeOutId: MutableRefObject<NodeJS.Timeout | undefined>
): boolean => {
  const { email, password } = credentials;
  const { emailValidationMessageTag, passwordValidationMessageTag } =
    validationMessageRef;

  let errorFlag = false;

  // Passowrod validatipon address validation

  if (password.length < 6) {
    setValidationMessage(
      passwordValidationMessageTag,
      "password's length cant be less then 6 ",
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // Email address validation
  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  if (email === '') {
    setValidationMessage(
      emailValidationMessageTag,
      'email cannot be empty',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  if (!validateEmail() && email !== '') {
    setValidationMessage(
      emailValidationMessageTag,
      'Invalid email address',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  // **************** Email Validation ends  **********************

  return errorFlag;
};

export default validateUserCredentials;
