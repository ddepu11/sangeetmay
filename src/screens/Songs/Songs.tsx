import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { ISong } from '../../interfaces';

const Songs = ({ songsIds }: { songsIds: string[] }) => {
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchSongs = () => {
      return songsIds.forEach((item: string) => {
        return firestore
          .collection('songs')
          .doc(item)
          .get()
          .then((doc) => {
            if (songs !== undefined) {
              setSongs((prevState) => {
                return [...prevState, doc.data() as ISong];
              });
            }
          });
      });
    };

    songs.length === 0 && fetchSongs();
  }, [songsIds, songs]);

  return (
    <Wrapper>
      {songs.length !== 0 ? (
        songs.map((item: ISong) => {
          return <h2 key={item.id}>{item.song.name}</h2>;
        })
      ) : (
        <h1>THere are no songs in this playlists</h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;

  .songs {
    margin-top: 15px;
    padding: 10px 5px;
    box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em,
      rgb(0 0 0 / 25%) 0px 0.125em 0.5em,
      rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
  }
`;

export default Songs;
