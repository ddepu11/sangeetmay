import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/Loading';

import useDashboardLogic from './Logic/useDashboardLogic';
import { IPlaylist, ISong } from '../../interfaces';
import Button from '../../components/Button';
import Playlist from '../../components/Playlist/Playlist';
import Song from '../../components/song/Song';

const Dashboard: FC = (): JSX.Element => {
  const {
    handleDelete,
    playlistLoading,
    playlists,
    playlistSongs,
    playAllSongs,
  } = useDashboardLogic();

  if (playlistLoading) {
    return <Loading size='MEDIUM' />;
  }

  return (
    <Wrapper>
      <nav className='flex'>
        <h1 className='playlist_heading'>Playlists in the system</h1>

        <Button
          type='button'
          buttonStyle={{
            padding: '8px 16px',
            borderRadius: '10px',
            transition: 'transform 0.5s ease ',
            hoverTransform: 'scale(1.2) translateX(-5px)',
          }}
          handleClick={playAllSongs}
        >
          Play All Song
        </Button>

        <Link to='/admin-create-playlist'>
          <Button
            type='button'
            buttonStyle={{
              padding: '8px 20px',
              borderRadius: '2px',
              bgColor: 'var(--primary-color)',
              hoverTransform: 'scale(1.1)',
              transition: 'transform 0.5s ease',
            }}
          >
            Create More Playlist
          </Button>
        </Link>
      </nav>

      <div className='playlists'>
        {playlists.length !== 0 ? (
          playlists.map((item: IPlaylist) => (
            <Playlist
              handleDelete={handleDelete}
              playlist={item}
              key={item.id}
            />
          ))
        ) : (
          <h1 className='no_playlist_text'>Sorry there are no playlists!</h1>
        )}
      </div>

      <h3 className='songs_in_system'>Songs in the system:-</h3>
      <div className='songs'>
        {playlistSongs &&
          playlistSongs.length !== 0 &&
          playlistSongs.map((item: ISong, index: number) => (
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
  padding: 20px 15px;
  border: 1px dashed #555;

  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  color: var(--primary-color);
  min-height: 76vh;

  nav {
    justify-content: space-between;
    margin-bottom: 15px;

    .playlist_heading {
      padding: 0px 0px 12px;
      font-size: 1.1em;
      letter-spacing: 1px;
      font-weight: 400;
    }
  }

  .playlists {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 15px 12px;
  }

  .no_playlist_text {
    padding: 50px 0;
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.3em;
    text-transform: lowercase;
    font-weight: 400;
  }

  .songs_in_system {
    font-size: 1.1em;
    letter-spacing: 1px;
    font-weight: 400;
    margin-top: 20px;
  }

  .songs {
    margin-top: 20px;
  }
`;

export default Dashboard;
