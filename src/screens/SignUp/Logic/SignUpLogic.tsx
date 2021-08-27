import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import { useAppDispatch } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';
import validateUserCredentials from '../../../utils/validateUserCredentials';

const SignUpLogic = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
  });

  const setTimeOutId = useRef<NodeJS.Timeout | undefined>();

  const validationMessageTags = {
    firstNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    lastNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    emailValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    ageValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    genderValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    countryValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    passwordValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    confirmPasswordValidationMessageTag: useRef<HTMLParagraphElement | null>(
      null
    ),
  };

  useEffect(() => {
    if (
      credentials.confirmPassword === credentials.password &&
      credentials.confirmPassword !== '' &&
      credentials.confirmPassword.length <= 20 &&
      credentials.confirmPassword.length >= 6
    ) {
      setValidationMessage(
        validationMessageTags.confirmPasswordValidationMessageTag,
        'Password match successfully',
        'success',
        setTimeOutId,
        5000
      );
    }
  }, [
    credentials.password,
    credentials.confirmPassword,
    validationMessageTags.confirmPasswordValidationMessageTag,
  ]);

  const dispatch = useAppDispatch();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateUserCredentials(
      credentials,
      validationMessageTags,
      setTimeOutId,
      'SIGN_UP'
    );

    if (!error) {
      try {
        const userCred = await auth.createUserWithEmailAndPassword(
          credentials.email.trim(),
          credentials.password.trim()
        );

        console.log(userCred.user);

        dispatch(
          sendNotification({
            message: 'Successfully signed in!',
            success: true,
          })
        );
      } catch (err) {
        dispatch(sendNotification({ message: err.message, error: true }));
        console.log(err);
      }

      // setCredentials({
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   age: 0,
      //   password: '',
      //   confirmPassword: '',
      //   gender: '',
      //   country: '',
      // });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCredentials({ ...credentials, country: e.target.value.trim() });
  };

  return {
    handleSignUp,
    handleInput,
    validationMessageTags,
    credentials,
    handleCountry,
  };
};

export default SignUpLogic;
