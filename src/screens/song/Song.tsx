import { FC } from 'react';
import styled from 'styled-components';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ISong } from '../../interfaces';
import Dialog from '../../components/Dialog';
import useSongLogic from './Logic/useSongLogic';

type Props = {
  playlistId: string | undefined;
  song: ISong;
  index: number;
  handleDeleteSong?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Song: FC<Props> = ({
  song,
  index,
  handleDeleteSong,
  playlistId,
}): JSX.Element => {
  const {
    hideConfirmDialogBox,
    showConfirmDialogBox,
    isThisSongBeingplayed,
    handlePlaySong,
    handlePauseSong,
    viewDashBoard,
    role,
  } = useSongLogic(playlistId, song);

  return (
    <Wrapper className='flex'>
      {viewDashBoard && (
        <Dialog
          whatAreYouDeleting='song'
          confirm={handleDeleteSong}
          deny={hideConfirmDialogBox}
          dataId={song.id}
        />
      )}

      <div className='left_part flex'>
        <span className='index'>{index + 1}.</span>
        {/*  */}

        <div className='play_pause_btns'>
          {isThisSongBeingplayed ? (
            <AiOutlinePauseCircle className='pause' onClick={handlePauseSong} />
          ) : (
            <AiOutlinePlayCircle className='play' onClick={handlePlaySong} />
          )}
        </div>

        <div className='song_img'>
          <img src={song.pic.url} alt={song.name} />
        </div>

        <p className='name'>{song.name}</p>
      </div>

      <div className='right_part flex'>
        <p className='likes'>Likes : {song.likes}</p>

        {role === 'ADMIN' && (
          <RiDeleteBin5Line
            className='delete_btn'
            onClick={showConfirmDialogBox}
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px 0;

  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 12px 10px;
  margin-bottom: 12px;

  .index {
    font-size: 1.2em;
    margin-right: 14px;
  }

  .play_pause_btns {
    transition: all 0.5s ease;
    margin-right: 14px;

    .pause,
    .play {
      font-size: 2.3em;
    }

    :hover {
      transform: scale(1.3);
      color: var(--light-color);
      cursor: pointer;
    }
  }

  .song_img {
    width: 50px;
    height: 50px;
    margin-right: 14px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
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
    font-size: 1.5em;
    transition: transform 0.5s ease;
    color: var(--danger-color);
    margin-left: 15px;
  }

  .delete_btn:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

export default Song;
