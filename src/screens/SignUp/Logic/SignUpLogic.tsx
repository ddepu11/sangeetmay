import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import { userLoadingBegin, userError } from '../../../features/user';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
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
    displayPicValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
  };
  const { hasUserLoggedIn } = useAppSelector((state) => state.user.value);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    hasUserLoggedIn && history.push('/');

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
    hasUserLoggedIn,
    history,
  ]);

  const [displayPic, setDisplayPic] = useState<{
    file: IFile | null;
    preview: string;
  }>({
    file: null,
    preview: '',
  });

  const saveUserDataTofirestore = (displayPicUrl: string): void => {
    firestore
      .collection('users')
      .doc()
      .set({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        age: credentials.age,
        country: credentials.country,
        gender: credentials.gender,
        displayPicUrl,
        role: 'USER',
      })
      .then(async () => {
        console.log('Final Step: Document Saved!');

        // 4. ---->
        await auth.createUserWithEmailAndPassword(
          credentials.email.trim(),
          credentials.password.trim()
        );

        dispatch(
          sendNotification({
            message: 'Successfully Registered to SangeetMay!',
            success: true,
          })
        );
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  const uploadDisplayPicture = async (): Promise<void> => {
    try {
      if (displayPic.file !== null) {
        const storageRef = storage.ref(
          `display_pictures/${displayPic.file?.name}`
        );

        storageRef.put(displayPic.file as Blob).on(
          'state_changed',
          (snapshot) => {
            console.log(`dp upload status: ${snapshot.state}`);
          },

          (error) => {
            console.log(error);
          },

          async () => {
            await storageRef.getDownloadURL().then((displayPicUrl) => {
              // 3. Image Uploaded then save user data to firestore
              saveUserDataTofirestore(displayPicUrl);
            });
          }
        );
      }
    } catch (err) {
      dispatch(sendNotification({ message: err.message, error: true }));

      dispatch(userError());
    }
  };

  const customSignUp = async (): Promise<void> => {
    try {
      //1.  Chech is email already registered --->
      const isEmailRegistered = await auth.fetchSignInMethodsForEmail(
        credentials.email.trim()
      );

      if (isEmailRegistered.length > 0) {
        throw new Error(
          'This email address is already being used by someone else!'
        );
      }

      // 2. Upload a display image
      uploadDisplayPicture();
    } catch (err) {
      dispatch(sendNotification({ message: err.message, error: true }));
      dispatch(userError());
    }
  };

  const handleSignUp = (): void => {
    dispatch(userLoadingBegin());

    let error = validateUserCredentials(
      credentials,
      validationMessageTags,
      setTimeOutId,
      'SIGN_UP'
    );

    if (displayPic.file === null) {
      setValidationMessage(
        validationMessageTags.displayPicValidationMessageTag,
        'Please select your display picture',
        'error',
        setTimeOutId
      );
      error = true;
    }

    if (!error) {
      customSignUp();

      setCredentials({
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        password: '',
        confirmPassword: '',
        gender: '',
        country: '',
      });

      setDisplayPic({ file: null, preview: '' });
    } else {
      dispatch(userError());
    }
  };

  // Handling diff Inputs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCredentials({ ...credentials, country: e.target.value.trim() });
  };

  const handleDisplayPic = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let file: IFile | Blob;
    let preview: string;

    if (e.target.files !== null) {
      if (e.target.files[0].size > 8388608) {
        setValidationMessage(
          validationMessageTags.displayPicValidationMessageTag,
          'Image size is too big should be less then 8 mb',
          'error',
          setTimeOutId,
          5000
        );

        setDisplayPic({ file: null, preview: '' });
      } else {
        file = e.target.files[0];

        preview = URL.createObjectURL(file);

        setDisplayPic((prevState) => {
          return { ...prevState, file, preview };
        });
      }
    }
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
