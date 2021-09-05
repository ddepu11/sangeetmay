import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playlistError,
  playlistLoadingBegin,
  playlistSuccess,
} from '../../../features/playlist';
import { IFile, IPlaylist } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';

const useAddSongsToPlaylist = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const [playlist, setPlaylist] = useState<IPlaylist>();

  const [songPicture, setSongPicture] = useState<{
    file: IFile | undefined;
    preview: undefined | string;
  }>();

  const [song, setSong] = useState<IFile | undefined>();

  const { playlistLoading } = useAppSelector((state) => state.playlist.value);

  const dispatch = useAppDispatch();

  const setTimeOutId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const fetchPlaylistData = () => {
      dispatch(playlistLoadingBegin());

      firestore
        .collection('playlists')
        .where('id', '==', id)
        .get()
        .then((doc) => {
          dispatch(playlistSuccess());

          setPlaylist(doc.docs[0].data());
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, success: true }));
          dispatch(playlistError());
        });
    };

    console.log(playlist?.id);

    if (playlist?.id === undefined) {
      fetchPlaylistData();
    }
  }, [id, dispatch, playlist]);

  const handleSongPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files !== null) {
      if (files[0].size > 8388608) {
        setValidationMessage(
          songPicValidationMessageTag,
          'pic size should be less then 8 mb',
          'error',
          setTimeOutId
        );
      } else {
        setSongPicture({
          file: files[0],
          preview: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const handleSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files !== null) {
      setSong(files[0]);
    }
  };

  const handleCancel = (): void => {
    setSong(undefined);
    setSongPicture({ file: undefined, preview: undefined });
  };

  const songPicValidationMessageTag = useRef<HTMLParagraphElement | null>(null);
  const songValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  const handleUploadSongAndImage = () => {
    if (songPicture?.file === undefined) {
      setValidationMessage(
        songPicValidationMessageTag,
        'please select pic!',
        'error',
        setTimeOutId
      );
    }
  };

  return {
    playlistLoading,
    playlist,
    songPicture,
    handleSongPicture,
    handleSong,
    handleCancel,
    handleUploadSongAndImage,
    song,
    songPicValidationMessageTag,
    songValidationMessageTag,
  };
};

export default useAddSongsToPlaylist;
