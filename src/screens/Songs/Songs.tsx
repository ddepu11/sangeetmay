import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../config/firebase';
import { ISong } from '../../interfaces';
import { FcDeleteRow } from 'react-icons/fc';

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

  const handleDeleteSong = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    console.log('Delete:');
    console.log(e.currentTarget.getAttribute('data-id'));
  };

  return (
    <Wrapper>
      {songs.length !== 0 ? (
        songs.map((item: ISong, index: number) => {
          return (
            <div key={item.id} className='song flex'>
              <span className='index'>{index + 1}.</span>

              <p className='name'>{item.song.name}</p>

              <p className='likes'>Likes : {item.likes}</p>

              <FcDeleteRow
                className='delete_btn'
                onClick={handleDeleteSong}
                data-id={item.id}
              />
            </div>
          );
        })
      ) : (
        <h1 className='no_songs_heading'>
          there are no songs in this playlists
        </h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 15px 10px;
  margin-top: 15px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em,
    rgb(0 0 0 / 25%) 0px 0.125em 0.5em,
    rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;

  .no_songs_heading {
    padding: 10px 0;
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.3em;
    text-transform: lowercase;
    font-weight: 400;
  }

  .song {
    justify-content: space-between;
    margin-bottom: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 12px 10px;

    .index {
      font-size: 1.2em;
    }

    .name {
      font-size: 1.2em;
      /* margin-left: 30px; */
    }

    .likes {
      font-size: 1.2em;
      /* margin-left: 20px; */
    }

    .delete_btn {
      font-size: 1.3em;
      transition: transform 0.5s ease;
    }

    .delete_btn:hover {
      transform: scale(1.3);
      cursor: pointer;
    }
  }
`;

export default Songs;
