import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import {
  playerSetCurrentSongAndPlaylist,
  playerSetPlaylistSongs,
} from '../../features/player';
import { ISong } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Search: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const { playlistSongs } = useAppSelector((state) => state.player.value);

  useEffect(() => {
    const songRef = firestore.collection('songs');

    let hasComponentBeenUnmounted = false;
    let index = 0;
    const songs: ISong[] = [];

    searchText &&
      songRef
        .get()
        .then((docs) => {
          docs.forEach((item) => {
            if (!hasComponentBeenUnmounted) {
              songs.push(item.data() as ISong);

              //When Finnaly all songs fetched save first one of them , as well all songs in player redux store
              if (index === docs.size - 1) {
                dispatch(
                  playerSetCurrentSongAndPlaylist({
                    currentSong: songs[0].url,
                    currentSongPic: songs[0].pic.url,
                    currentSongName: songs[0].name,
                    playlistId: 'ALL_SONGS',
                  })
                );

                dispatch(playerSetPlaylistSongs(songs));
              }

              index++;
            }
          });
        })
        .catch((err) => {
          dispatch(sendNotification({ message: err.message, error: true }));
        });

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

      <div className='main'>
        {playlistSongs &&
          playlistSongs.length !== 0 &&
          playlistSongs.map((item: ISong) => {
            return <h1 key={item.id}>{item.name}</h1>;
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  grid-area: main;
  min-height: 77vh;
  width: 100%;
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
`;

export default Search;
