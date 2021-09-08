import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, storage, firebase } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playlistError,
  playlistLoadingBegin,
  playlistSuccess,
} from '../../../features/playlist';
import { IFile, IPlaylist } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import setValidationMessage from '../../../utils/setValidationMessage';
import { v4 as uuidv4 } from 'uuid';

const useAddSongsToPlaylist = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);

  const [playlistId, setPlaylistId] = useState<string>();

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

          setPlaylistId(doc.docs[0].id);

          setPlaylist(doc.docs[0].data());
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, success: true }));
          dispatch(playlistError());
        });
    };

    if (playlist === undefined) fetchPlaylistData();
  }, [id, dispatch, playlist]);

  const handleSongPicture = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files) {
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

  const handleSong = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files) setSong(files[0]);
  };

  const handleCancel = (): void => {
    setSong(undefined);
    setSongPicture({ file: undefined, preview: undefined });
  };

  const songPicValidationMessageTag = useRef<HTMLParagraphElement | null>(null);
  const songValidationMessageTag = useRef<HTMLParagraphElement | null>(null);

  //################ Upload song and its pic starts ##########################
  const addSongIdToPlaylistSongsArray = (songId: string) => {
    firestore
      .collection('playlists')
      .doc(playlistId)
      .update({ songs: firebase.firestore.FieldValue.arrayUnion(songId) })
      .then(() => {
        handleCancel();

        console.log('4.Song id saved in Playlist');

        dispatch(playlistSuccess());
        dispatch(
          sendNotification({
            message: 'Successfully uploaded song and its image',
            success: true,
          })
        );
        setPlaylist(undefined);
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const createSongDocAndSaveSongPicUrl = (
    songPicUrl: string,
    songUrl: string
  ): void => {
    firestore
      .collection('songs')
      .add({
        id: uuidv4(),
        name: song?.name,
        url: songUrl,

        likes: 0,

        pic: {
          name: songPicture?.file?.name,
          url: songPicUrl,
        },
      })
      .then((doc) => {
        console.log('3. Song Doc created');
        addSongIdToPlaylistSongsArray(doc.id);
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });
  };

  const uploadSong = (songPicUrl: string): void => {
    const songPicRef = storage.ref(`songs/${song?.name}`);

    songPicRef.put(song as Blob).then(
      () => {
        console.log('2. Song itself Uploaded');
        songPicRef
          .getDownloadURL()
          .then((songUrl) => {
            createSongDocAndSaveSongPicUrl(songPicUrl, songUrl);
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
            dispatch(playlistError());
          });
      },

      (err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      }
    );
  };

  const uploadSongPic = () => {
    dispatch(playlistLoadingBegin());

    const songPicRef = storage.ref(`song_pics/${songPicture?.file?.name}`);

    songPicRef.put(songPicture?.file as Blob).then(
      () => {
        console.log('1.Song Pic Uploaded');
        songPicRef
          .getDownloadURL()
          .then((url) => {
            uploadSong(url);
          })
          .catch((err) => {
            dispatch(sendNotification({ message: err.message, error: true }));
            dispatch(playlistError());
          });
      },

      (err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      }
    );
  };

  const handleSongAndImageUpload = (): void => {
    if (songPicture?.file === undefined) {
      setValidationMessage(
        songPicValidationMessageTag,
        'please select pic!',
        'error',
        setTimeOutId
      );
    } else {
      uploadSongPic();
    }
  };
  //################ Upload song and its pic Ends ##########################

  return {
    playlistLoading,
    playlist,
    playlistId,
    songPicture,
    handleSongPicture,
    handleSong,
    handleCancel,
    handleSongAndImageUpload,
    song,
    songPicValidationMessageTag,
    songValidationMessageTag,
  };
};

export default useAddSongsToPlaylist;
