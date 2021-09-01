import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  changeDisplayPicSuccess,
  userError,
  userLoadingBegin,
} from '../../../features/user';
import { IFile } from '../../../interfaces';
import { useAppSelector } from '../../../redux/hooks';
import validateUserCredentials from '../../../utils/validateUserCredentials';

interface ICredentials {
  age: number | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

const AccountLogic = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<ICredentials>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
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
  } = useAppSelector((state) => state.user.value);

  useEffect(() => {
    setCredentials({ firstName, lastName, email, age });
  }, [firstName, lastName, email, age]);

  const validationMessageTags = {
    firstNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    lastNameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    emailValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    ageValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    passwordValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    confirmPasswordValidationMessageTag: useRef<HTMLParagraphElement | null>(
      null
    ),
    displayPicValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const [wannaEdit, setWannaEdit] = useState(false);

  const handleWannaEdit = (): void => {
    setWannaEdit(true);
  };

  const handleUpdate = (): void => {
    const error = validateUserCredentials(
      credentials,
      validationMessageTags,
      setTimeOutId,
      'UPDATE'
    );

    if (error) {
      console.log(error);
    }

    setWannaEdit(true);
  };

  const cancelUpdate = (): void => {
    setWannaEdit(false);
    setCredentials({ firstName, lastName, email, age });
  };

  // Change Display Picture --->Starts
  const handleDisplayPic = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files) {
      setDisplayPic({ file: files[0], preview: URL.createObjectURL(files[0]) });
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
            dispatch(changeDisplayPicSuccess(doc.data()));
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
          `dp upload status:${(snap.bytesTransferred / snap.totalBytes) * 100}`
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
    handleUpdate,
    handleWannaEdit,
    handleDisplayPic,
    cancelDpChange,
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
    setDisplayPic,
  };
};

export default AccountLogic;
