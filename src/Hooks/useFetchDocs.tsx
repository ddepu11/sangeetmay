import { useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import { sendNotification } from '../features/notification';
import { useAppDispatch } from '../redux/hooks';

const useFetchDocs = <Payload,>(
  collection: string
): { docs: Payload[] | null; loading: boolean } => {
  const [docs, setDocs] = useState<Payload[] | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDocs = () =>
      firestore
        .collection(collection)
        .get()
        .then((data) => {
          const newDocs: Payload[] = [];

          data.docs.forEach((item) => {
            newDocs.push(item.data() as Payload);
          });

          setDocs(newDocs);
          setLoading(false);
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
          setLoading(false);
        });

    fetchDocs();
  }, [dispatch, collection]);

  return { docs, loading };
};

export default useFetchDocs;
