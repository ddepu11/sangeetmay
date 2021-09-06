import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { ImBin } from 'react-icons/im';
import useDashboardLogic from './Logic/useDashboardLogic';
import { IPlaylist } from '../../interfaces';
import Button from '../../components/Button';

const Dashboard: FC = (): JSX.Element => {
  const { handleDelete, playlistLoading, playlists } = useDashboardLogic();

  if (playlistLoading) {
    return <Loading />;
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
          playlists.map((item: IPlaylist) => {
            return (
              <div className='playlist flex' key={item.name}>
                <div className='add_songs_div'>
                  <Button
                    type='button'
                    buttonStyle={{
                      bgColor: 'var(--secondary-color)',
                      padding: '4px 8px',
                      borderRadius: '10px',
                      hoverCursor: 'pointer',
                      fontSize: '0.8em',
                    }}
                  >
                    <Link
                      style={{
                        color: 'var(--dark-color)',
                      }}
                      to={`/add-songs-to-playlist/${item.id}`}
                    >
                      Add Songs
                    </Link>
                  </Button>
                </div>

                <div className='playlist_pic'>
                  <img src={item.playlistPic?.url} alt={item.name} />
                </div>

                <div className='playlist_info'>
                  <p>{item.name}</p>
                </div>

                <div className='delete_icon_div'>
                  <ImBin onClick={handleDelete} data-id={item.id} />
                </div>
              </div>
            );
          })
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

  .playlist {
    padding: 0px 10px 0 0;
    justify-content: flex-start;
    position: relative;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    .add_songs_div {
      position: absolute;
      top: 5px;
      right: 10px;
      transition: transform 0.5s ease;

      :hover {
        transform: scale(1.1);
      }
    }

    .playlist_pic {
      width: 130px;
      height: 130px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .playlist_info {
      margin-left: 5px;
      font-size: 0.9em;
    }

    .delete_icon_div {
      position: absolute;
      bottom: 5px;
      right: 10px;
      color: var(--danger-color);
      transition: transform 0.5s ease;
    }

    .delete_icon_div:hover {
      cursor: pointer;
      transform: scale(1.2);
    }

    :hover {
      cursor: pointer;
    }
  }
`;

export default Dashboard;
