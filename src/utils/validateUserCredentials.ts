import { MutableRefObject } from 'react';
import setValidationMessage from './setValidationMessage';

interface ICredentials {
  firstName?: string;
  lastName?: string;
  email: string;
  age?: number;
  gender?: string;
  country?: string;
  password: string;
  confirmPassword?: string;
}

export interface IValidationMessageTags {
  firstNameValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
  lastNameValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
  emailValidationMessageTag: React.MutableRefObject<HTMLParagraphElement | null>;
  ageValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
  genderValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
  countryValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
  passwordValidationMessageTag: React.MutableRefObject<HTMLParagraphElement | null>;
  confirmPasswordValidationMessageTag?: React.MutableRefObject<HTMLParagraphElement | null>;
}

const validateUserCredentials = (
  credentials: ICredentials,
  validationMessageRef: IValidationMessageTags,
  setTimeOutId: MutableRefObject<NodeJS.Timeout | undefined>,
  validationFor: string
): boolean => {
  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    country,
    password,
    confirmPassword,
  } = credentials;

  const {
    firstNameValidationMessageTag,
    lastNameValidationMessageTag,
    emailValidationMessageTag,
    ageValidationMessageTag,
    genderValidationMessageTag,
    countryValidationMessageTag,
    passwordValidationMessageTag,
    confirmPasswordValidationMessageTag,
  } = validationMessageRef;

  let errorFlag = false;

  if (
    validationFor === 'SIGN_UP' &&
    firstName !== undefined &&
    lastName !== undefined &&
    confirmPassword !== undefined
  ) {
    // First name validation
    if (firstName.length > 20) {
      setValidationMessage(
        firstNameValidationMessageTag,
        'first name is too lengthy',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (firstName.length < 2) {
      setValidationMessage(
        firstNameValidationMessageTag,
        'first name is too short',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (firstName === '') {
      setValidationMessage(
        firstNameValidationMessageTag,
        'first name cannot be empty',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }
    // ########## FN Validation ends #############

    // lastName validation
    if (lastName.length > 20) {
      setValidationMessage(
        lastNameValidationMessageTag,
        'last name is too lengthy',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (lastName.length < 2) {
      setValidationMessage(
        lastNameValidationMessageTag,
        'last name is too short',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (lastName === '') {
      setValidationMessage(
        lastNameValidationMessageTag,
        'last name cannot be empty',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    // **************** LN Validation ends  **********************

    // Gender validation
    if (gender === '') {
      setValidationMessage(
        genderValidationMessageTag,
        'Please select your gender!!!',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    // **************** Gender Validation ends  **********************

    // Password Validation
    if (password.length < 6) {
      setValidationMessage(
        passwordValidationMessageTag,
        "password's length cant be less then 6 ",
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (password.length > 20) {
      setValidationMessage(
        passwordValidationMessageTag,
        "password's length cant be greater then 20 ",
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    // Confirm Password  validation Starts
    if (
      confirmPassword === password &&
      confirmPassword !== '' &&
      confirmPassword.length <= 20 &&
      confirmPassword.length >= 6
    ) {
      setValidationMessage(
        confirmPasswordValidationMessageTag,
        'Password match successfully',
        'success',
        setTimeOutId,
        6000
      );
    }

    if (confirmPassword !== password) {
      setValidationMessage(
        confirmPasswordValidationMessageTag,
        'Password did not match',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (confirmPassword.length < 6) {
      setValidationMessage(
        confirmPasswordValidationMessageTag,
        "password's length cant be less then 6 ",
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (confirmPassword === '') {
      setValidationMessage(
        confirmPasswordValidationMessageTag,
        'confirm password cannot be empty',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    // Gender validation
    if (gender) {
      // Why we are checking gender here?

      // Coz while updating info we dont want to validate condition written below so only validate below condition while signing up.
      // gender will we passed to this func only when you are signing up
      if (confirmPassword.length > 20) {
        setValidationMessage(
          confirmPasswordValidationMessageTag,
          "password's length cant be greater then 20 ",
          'error',
          setTimeOutId
        );
        errorFlag = true;
      }
    }

    // Age Validation
    if (age === 0) {
      setValidationMessage(
        ageValidationMessageTag,
        'Age cannot be 0.',
        'error',
        setTimeOutId
      );
    }

    if (age && age < 12) {
      setValidationMessage(
        ageValidationMessageTag,
        'Your age should be greater then 12.',
        'error',
        setTimeOutId
      );
    }

    // Country Validation
    if (country === '') {
      setValidationMessage(
        countryValidationMessageTag,
        'Please select any country!',
        'error',
        setTimeOutId
      );
    }
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

  if (password === '') {
    setValidationMessage(
      passwordValidationMessageTag,
      'password cannot be empty',
      'error',
      setTimeOutId
    );
    errorFlag = true;
  }

  return errorFlag;
};

export default validateUserCredentials;
