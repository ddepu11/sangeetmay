import { useEffect } from 'react';
import { firestore } from '../../../config/firebase';
import { sendNotification } from '../../../features/notification';
import {
  playlistError,
  playlistFetchSuccess,
  playlistLoadingBegin,
} from '../../../features/playlist';
import { IPlaylist } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const useDashboardLogic = () => {
  const dispatch = useAppDispatch();

  const { playlistLoading, playlists } = useAppSelector(
    (state) => state.playlist.value
  );

  useEffect(() => {
    const fetchDocs = () => dispatch(playlistLoadingBegin());

    firestore
      .collection('playlists')
      .get()
      .then((data) => {
        const newDocs: IPlaylist[] = [];

        data.docs.forEach((item) => {
          newDocs.push(item.data() as IPlaylist);
        });

        dispatch(playlistFetchSuccess(newDocs));
      })
      .catch((err) => {
        dispatch(sendNotification({ message: err.message, error: true }));
        dispatch(playlistError());
      });

    playlists.length === 0 && fetchDocs();
  }, [dispatch, playlists, playlistLoading]);

  const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (e !== undefined) {
      console.log('delete');
      console.log(e.currentTarget.getAttribute('data-idnpm'));
    }
  };

  return { handleDelete, playlistLoading, playlists };
};

export default useDashboardLogic;
