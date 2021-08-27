import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  customSignUpSuccess,
  signUpBegin,
  signUpError,
} from '../../../features/user';
import { useAppDispatch } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';
import validateUserCredentials from '../../../utils/validateUserCredentials';

interface IFile {
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

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
  const history = useHistory();

  const customSignUp = async () => {
    dispatch(signUpBegin());

    try {
      const userCred = await auth.createUserWithEmailAndPassword(
        credentials.email.trim(),
        credentials.password.trim()
      );

      if (userCred) {
        if (displayPic.file !== null) {
          const storageRef = storage.ref(
            `display_pictures/${displayPic.file?.name}`
          );

          storageRef.put(displayPic.file as Blob).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot);
            },

            (error) => {
              console.log(error);
            },

            async () => {
              const displayPicUrl = await storageRef.getDownloadURL();

              await firestore.collection('users').doc().set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                age: credentials.age,
                country: credentials.country,
                gender: credentials.gender,
                displayPicUrl,
              });
            }
          );
        }

        history.push('/sign-in');

        dispatch(customSignUpSuccess());

        dispatch(
          sendNotification({
            message: 'Successfully Registered to SangeetMay!',
            success: true,
          })
        );
      }
    } catch (err) {
      dispatch(sendNotification({ message: err.message, error: true }));
      dispatch(signUpError());
    }
  };

  const [displayPic, setDisplayPic] = useState<{
    file: IFile | null;
    preview: string;
  }>({
    file: null,
    preview: '',
  });

  const handleSignUp = (): void => {
    const error = validateUserCredentials(
      credentials,
      validationMessageTags,
      setTimeOutId,
      'SIGN_UP'
    );

    if (!error) {
      customSignUp();
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

  const handleDisplayPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: IFile | Blob;
    let preview: string;

    if (e.target.files !== null) {
      file = e.target.files[0];
      preview = URL.createObjectURL(file);
    }

    setDisplayPic((prevState) => {
      return { ...prevState, file, preview };
    });
  };

  return {
    handleSignUp,
    handleInput,
    validationMessageTags,
    credentials,
    handleCountry,
    displayPic,
    setDisplayPic,
    handleDisplayPic,
  };
};

export default SignUpLogic;
