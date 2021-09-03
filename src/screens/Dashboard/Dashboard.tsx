import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import useFetchDocs from '../../Hooks/useFetchDocs';
import { ImBin } from 'react-icons/im';

interface IPlaylist {
  name?: string | undefined;

  playlistPic?: {
    picName: string | undefined;
    url: string | undefined;
  };
}

const Dashboard: FC = (): JSX.Element => {
  const { docs, loading } = useFetchDocs<IPlaylist>('playlists');

  const handleDelete = () => {
    console.log('delete');
  };

  if (loading) {
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
        {docs &&
          docs.map((item) => {
            return (
              <div className='playlist flex' key={item.name}>
                <div className='playlist_pic'>
                  <img src={item.playlistPic?.url} alt={item.name} />
                </div>

                <div className='playlist_info'>
                  <p>{item.name}</p>
                </div>

                {/* sjhj */}

                <div className='delete_icon_div'>
                  <ImBin />
                </div>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 20px 15px;
  grid-area: main;
  border: 1px dashed #555;

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

  .playlist {
    padding: 0px 10px 0 0;
    justify-content: flex-start;
    position: relative;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

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
