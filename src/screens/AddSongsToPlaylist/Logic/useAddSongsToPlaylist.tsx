import { useEffect, useState } from 'react';
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
        console.log('Bigger');
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

  return {
    playlistLoading,
    playlist,
    songPicture,
    handleSongPicture,
    handleSong,
    song,
  };
};

export default useAddSongsToPlaylist;
