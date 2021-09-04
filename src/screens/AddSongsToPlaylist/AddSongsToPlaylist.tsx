import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/hooks';
import { IPlaylist } from '../../interfaces';

const AddSongsToPlaylists = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const [playlist, setPlaylist] = useState<IPlaylist>();

  const { playlists } = useAppSelector((state) => state.playlist.value);

  useEffect(() => {
    setPlaylist(playlists.filter((item: IPlaylist) => item.id === id)[0]);
  }, [playlists, id]);

  return (
    <Wrapper>
      {playlist && (
        <>
          <header className='flex'>
            <div className='left'>
              <div className='pic'>
                <img src={playlist.playlistPic?.url} alt={playlist.name} />
              </div>
            </div>

            <div className='right'>
              <span className='playlist_text'>Playlist</span>
              <h1>{playlist.name}</h1>

              <div className='playlist_details flex'>
                <p className='likes'>Likes: 50</p>
                <p className='songs'>Songs: 10</p>
                <p className='length'>2h 15min</p>
              </div>
            </div>
          </header>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 10px;
  grid-area: main;
  border: 1px dashed #555;

  header {
    justify-content: flex-start;

    .left {
      .pic {
        width: 200px;
        height: 200px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 2px solid var(--little-light-color);
        }
        transition: transform 0.5s ease;
      }

      .pic:hover {
        transform: scale(1.1) translateY(-5px);
        cursor: pointer;
      }
    }

    .right {
      margin-left: 20px;

      .playlist_text {
        font-size: 1em;
        text-transform: uppercase;
      }

      h1 {
        margin-top: 10px;
        font-size: 2.5em;
        text-transform: capitalize;
        letter-spacing: 2px;
      }

      .playlist_details {
        margin-top: 20px;

        .likes,
        .songs {
          margin-right: 10px;
          border-right: 1px dashed #555;
          padding: 0 5px 0;
        }
      }
    }
  }
`;

export default AddSongsToPlaylists;
