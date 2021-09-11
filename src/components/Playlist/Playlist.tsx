import { FC } from 'react';
import { ImBin } from 'react-icons/im';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button';
import Dialog from '../Dialog';
import { IPlaylist } from '../../interfaces';
import usePlayListLogic from './Logic/usePlaylistLogic';

type Props = {
  playlist: IPlaylist;
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Playlist: FC<Props> = ({ playlist, handleDelete }) => {
  const {
    handlePausePlaylist,
    handlePlayPlaylist,
    hideConfirmDialogBox,
    showConfirmDialogBox,
    role,
    viewDashBoard,
    isThisPlaylistBeingPlayed,
  } = usePlayListLogic(playlist);

  return (
    <>
      {viewDashBoard && (
        <Dialog
          whatAreYouDeleting='playlist'
          confirm={handleDelete}
          deny={hideConfirmDialogBox}
          dataId={playlist.id}
        />
      )}

      <Wrapper className='flex'>
        <div className='play__pause_btns'>
          {isThisPlaylistBeingPlayed ? (
            <AiOutlinePauseCircle onClick={handlePausePlaylist} />
          ) : (
            <AiOutlinePlayCircle onClick={handlePlayPlaylist} />
          )}
        </div>

        <div className='playlist_pic'>
          <img src={playlist.playlistPic?.url} alt={playlist.name} />
        </div>

        <div className='playlist_info'>
          <p>{playlist.name}</p>
        </div>

        {role === 'ADMIN' && (
          <div className='delete_icon_div'>
            <ImBin onClick={showConfirmDialogBox} />
          </div>
        )}

        {/* SHOWS On Hover */}

        {role === 'ADMIN' && (
          <div className='add_songs'>
            {/*  */}
            <Button
              type='button'
              buttonStyle={{
                bgColor: 'var(--little-light-color)',
                padding: '5px 10px',
                borderRadius: '5px',
                hoverCursor: 'pointer',
                fontSize: '0.8em',
              }}
            >
              <Link
                style={{
                  color: 'var(--dark-color)',
                }}
                to={`/add-songs-to-playlist/${playlist.id}`}
              >
                Add Songs
              </Link>
            </Button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  padding: 0px 10px 0 0;
  justify-content: flex-start;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  .play__pause_btns {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 5;
    font-size: 2em;
    transition: transform 0.5s ease;
  }

  .play__pause_btns:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

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
    z-index: 5;
  }

  .delete_icon_div:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  .add_songs {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    display: grid;
    place-content: center;
    transition: all 0.5s ease;

    button {
      display: none;
    }
  }

  .add_songs:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6);

    button {
      display: block;
    }
  }
`;

export default Playlist;
