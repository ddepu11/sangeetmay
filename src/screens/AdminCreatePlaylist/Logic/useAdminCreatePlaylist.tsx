import { ChangeEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore, storage } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playlistError,
  playlistLoadingBegin,
  playlistSuccess,
} from '../../../features/playlist';
import { IFile } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';

const useAdminCreatePlaylist = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [playlistPic, setPlayListPic] = useState<{
    file: IFile | undefined;
    preview: undefined | string;
  }>({
    file: undefined,
    preview: undefined,
  });

  const validationMessageTag = {
    playListValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    nameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
  };

  const setTimeOutId = useRef<NodeJS.Timeout | undefined>(undefined);

  const handlePlaylistPic = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files !== null && files !== undefined) {
      // Validating Image
      if (files[0].size > 8388608) {
        setValidationMessage(
          validationMessageTag.playListValidationMessageTag,
          'Image Size should be less then 8mb',
          'error',
          setTimeOutId
        );
      } else {
        setPlayListPic({
          file: files[0],
          preview: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const [playlistName, setPlaylistName] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const savePlaylistDocToFirestore = (playlistPicUrl: string): void => {
    firestore
      .collection('playlists')
      .doc()
      .set({
        name: playlistName,
        playlistPic: { url: playlistPicUrl, picName: playlistPic.file?.name },
      })
      .then(() => {
        console.log('Doc Saved');
        history.push('/dashboard');
        dispatch(playlistSuccess());
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const uploadPlaylistPic = () => {
    dispatch(playlistLoadingBegin());

    const playlistPicsRef = storage.ref(
      `playlist_pics/${playlistPic.file?.name}`
    );

    playlistPicsRef.put(playlistPic.file as Blob).on(
      'state_changed',
      (snap) => {
        console.log(
          `Playlist pic: ${(snap.bytesTransferred / snap.totalBytes) * 100}%`
        );
      },
      (err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      },
      () => {
        playlistPicsRef
          .getDownloadURL()
          .then((url) => {
            savePlaylistDocToFirestore(url);
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
            dispatch(playlistError());
          });
      }
    );
  };

  const handleCreatePlaylist = (): void => {
    let errorFlag = false;
    // Validation
    if (playlistName.length < 2) {
      setValidationMessage(
        validationMessageTag.nameValidationMessageTag,
        'playlist name is too short!',
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (playlistName === '') {
      setValidationMessage(
        validationMessageTag.nameValidationMessageTag,
        "playlist can't be empty!",
        'error',
        setTimeOutId
      );
      errorFlag = true;
    }

    if (playlistPic.file === undefined) {
      setValidationMessage(
        validationMessageTag.playListValidationMessageTag,
        'Please select  image',
        'error',
        setTimeOutId
      );

      errorFlag = true;
    }

    if (!errorFlag) {
      uploadPlaylistPic();
    }
  };

  const { playlistLoading } = useAppSelector((state) => state.playlist.value);

  return {
    playlistLoading,
    handleCreatePlaylist,
    handleInput,
    handlePlaylistPic,
    validationMessageTag,
    playlistPic,
    playlistName,
  };
};

export default useAdminCreatePlaylist;
