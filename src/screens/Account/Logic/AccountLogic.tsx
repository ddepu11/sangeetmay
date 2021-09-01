import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  userError,
  userInfoUpdateSuccess,
  userLoadingBegin,
} from '../../../features/user';
import { IFile } from '../../../interfaces';
import { useAppSelector } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';
import validateUserCredentials from '../../../utils/validateUserCredentials';

interface ICredentials {
  age: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  country: string | undefined;
}

const AccountLogic = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<ICredentials>({
    firstName: '',
    lastName: '',
    age: 0,
    country: '',
  });

  const [displayPic, setDisplayPic] = useState<{
    file: IFile | null;
    preview: string;
  }>({
    file: null,
    preview: '',
  });

  const setTimeOutId = useRef<NodeJS.Timeout | undefined>();

  const {
    userInfo: { dp, firstName, lastName, email, age, gender, country },
    id,
    role,
  } = useAppSelector((state) => state.user.value);

  const [wannaEdit, setWannaEdit] = useState<boolean>(false);

  useEffect(() => {
    setCredentials({ firstName, lastName, age, country });
  }, [firstName, lastName, email, age, country, wannaEdit]);

  const validationMessageTags = {
    firstNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    lastNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    ageValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    countryValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    displayPicValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleCountry = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    setCredentials({ ...credentials, country: e.target.value.trim() });
  };

  //################## Update User Info --->Starts ##################

  const handleWannaEdit = (): void => {
    setWannaEdit(true);
  };

  const cancelUpdate = (): void => {
    setWannaEdit(false);
    setCredentials({ firstName, lastName, age, country });
  };

  const updateUserInfo = (): void => {
    setWannaEdit(false);

    firestore
      .collection('users')
      .doc(id)
      .update({ ...credentials })
      .then(() => {
        firestore
          .collection('users')
          .doc(id)
          .get()
          .then((doc) => {
            dispatch(userInfoUpdateSuccess(doc.data()));

            dispatch(
              sendNotification({
                message: 'Successfully updated user information!',
                success: true,
              })
            );
          });
      });
  };

  const handleUserInfoUpdate = (): void => {
    const error = validateUserCredentials(
      credentials,
      validationMessageTags,
      setTimeOutId,
      'UPDATE'
    );

    if (error) {
      console.log('there is an error');
    } else {
      if (
        firstName === credentials.firstName &&
        lastName === credentials.lastName &&
        age === credentials.age &&
        country === credentials.country
      ) {
        setWannaEdit(false);
        dispatch(
          sendNotification({
            message: 'There is nothing to chnage!',
            error: true,
          })
        );
      } else {
        dispatch(userLoadingBegin());
        updateUserInfo();
      }
    }

    setWannaEdit(true);
  };

  //################### Update User Info Ends ##################

  // ################### Change Display Picture --->Starts ##################
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

  const cancelDpChange = (): void => {
    setDisplayPic({ preview: '', file: null });
  };

  const updateDpFieldOnDoc = (displayPicUrl: string) => {
    firestore
      .collection('users')
      .doc(id)
      .update({
        dp: { picNameInStorage: displayPic.file?.name, url: displayPicUrl },
      })
      .then(() => {
        // 4. Then Get The updated Doc
        firestore
          .collection('users')
          .doc(id)
          .get()
          .then((doc) => {
            dispatch(userInfoUpdateSuccess(doc.data()));
            dispatch(
              sendNotification({
                message: 'Successfully changed the display picture!',
                success: true,
              })
            );
          });
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      });
  };

  const uploadNewDisplayPicture = (): void => {
    const storageRef = storage.ref(`display_pictures/${displayPic.file?.name}`);

    storageRef.put(displayPic.file as Blob).on(
      'state_changed',
      (snap) => {
        console.log(
          `dp upload status:${(snap.bytesTransferred / snap.totalBytes) * 100}%`
        );
      },

      (err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(userError());
      },

      async () => {
        try {
          // 2. Get new DP URL and then save it to doc
          await storageRef.getDownloadURL().then((displayPicUrl) => {
            // 3. Image Uploaded then save displayPicUrl to firestore
            updateDpFieldOnDoc(displayPicUrl);
          });
        } catch (err) {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(userError());
        }
      }
    );
  };

  const changeDP = (): void => {
    if (displayPic.file !== null) {
      dispatch(userLoadingBegin());

      // 1. Delete Old DP
      storage
        .ref(`display_pictures/${dp?.picNameInStorage}`)
        .delete()
        .then(() => {
          // 2.Upload new DP
          uploadNewDisplayPicture();
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          dispatch(userError());
        });
    }
  };
  // ############## Change Display Picture --->Ends #################

  return {
    credentials,
    cancelUpdate,
    handleUserInfoUpdate,
    handleWannaEdit,
    handleDisplayPic,
    cancelDpChange,
    handleCountry,
    changeDP,
    wannaEdit,
    handleInput,
    validationMessageTags,
    displayPic,
    dp,
    firstName,
    lastName,
    email,
    age,
    country,
    gender,
    role,
    setDisplayPic,
  };
};

export default AccountLogic;
