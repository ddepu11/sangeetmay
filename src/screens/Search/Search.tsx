import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { ISong } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import Song from '../song/Song';

const Search: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState('');
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const songRef = firestore.collection('songs');
    let hasComponentBeenUnmounted = false;

    let index = 0;
    const newSongs: ISong[] = [];

    if (searchText) {
      songRef
        .get()
        .then((docs) => {
          docs.forEach((item) => {
            if (!hasComponentBeenUnmounted) {
              const songName: string = item.get('name');
              const doestSearchTermMatches = songName
                .toLowerCase()
                .includes(searchText.toLowerCase());

              if (doestSearchTermMatches) {
                newSongs.push(item.data() as ISong);
              }

              if (index === docs.size - 1) {
                setSongs(newSongs);
              }

              index++;
            }
          });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });
    } else {
      setSongs([]);
    }

    return () => {
      hasComponentBeenUnmounted = true;
    };
  }, [searchText, dispatch]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <Wrapper>
      <div className='header flex'>
        <h2 className='heading'>Search Songs</h2>
        <input type='text' value={searchText} onChange={handleSearchText} />
      </div>

      <div className='songs'>
        {songs &&
          songs.length !== 0 &&
          songs.map((item: ISong, index: number) => (
            <Song
              key={item.id}
              song={item}
              index={index}
              playlistId='ALL_SONGS'
            />
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  grid-area: main;
  min-height: 77vh;
  width: 80%;
  color: var(--little-light-color);

  .heading {
    font-size: 1.3em;
    font-weight: 400;
    letter-spacing: 1px;
  }

  .header {
    justify-content: flex-start;
    align-items: flex-start;

    input {
      margin-left: 30px;
      padding: 2px 5px;
      font-size: 1.2em;
      color: var(--little-dark-color);
    }
  }

  .songs {
    padding: 15px 0;
  }
`;

export default Search;
