import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import useDashboardLogic from './Logic/useDashboardLogic';
import { IPlaylist } from '../../interfaces';
import Button from '../../components/Button';
import Playlist from '../Playlist/Playlist';

const Dashboard: FC = (): JSX.Element => {
  const { handleDelete, playlistLoading, playlists } = useDashboardLogic();

  if (playlistLoading) {
    return <Loading size='MEDIUM' />;
  }

  return (
    <Wrapper>
      <nav className='flex'>
        <h1 className='playlist_heading'>Playlists in the system</h1>

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
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 20px 15px;
  border: 1px dashed #555;
  width: 79%;
  height: 100%;

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
`;

export default Dashboard;
