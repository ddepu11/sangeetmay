import { useRef, useState } from 'react';

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

  const firstNameValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );
  const lastNameValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );
  const emailValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const ageValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const genderValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const countryValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const passwordValidationMessageTag = useRef<HTMLParagraphElement | null>(
    null
  );
  const confirmPasswordValidationMessageTag =
    useRef<HTMLParagraphElement | null>(null);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCredentials({ ...credentials, country: e.target.value.trim() });
  };

  return {
    handleSignUp,
    handleInput,
    firstNameValidationMessageTag,
    lastNameValidationMessageTag,
    emailValidationMessageTag,
    ageValidationMessageTag,
    genderValidationMessageTag,
    countryValidationMessageTag,
    passwordValidationMessageTag,
    credentials,
    confirmPasswordValidationMessageTag,
    handleCountry,
  };
};

export default SignUpLogic;
