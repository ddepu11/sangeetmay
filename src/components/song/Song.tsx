import { FC } from 'react';
import styled from 'styled-components';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { ISong } from '../../interfaces';
import Dialog from '../Dialog';
import useSongLogic from './Logic/useSongLogic';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

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
    didYouLikeTheSong,
    handleDisLikeSsong,
    handleLikeSsong,
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

        <p className='name'>{song.name.slice(0, 30)}...</p>
      </div>

      <div className='right_part flex'>
        {role === 'ADMIN' && (
          <>
            <p className='likes'>Likes: {song.likes}</p>

            <RiDeleteBin5Line
              className='delete_btn'
              onClick={showConfirmDialogBox}
            />
          </>
        )}

        {role !== 'ADMIN' && (
          <div className='like_or_deslike'>
            {didYouLikeTheSong ? (
              <FcLike onClick={handleDisLikeSsong} />
            ) : (
              <FcLikePlaceholder onClick={handleLikeSsong} />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 8px 10px;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 12px;
  transition: transform 0.5s ease;

  .index {
    font-size: 1.1em;
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
    font-size: 1.1em;
    /* margin-left: 30px; */
  }

  .likes {
    font-size: 1em;
    /* margin-left: 20px; */
  }

  .like_or_deslike {
    font-size: 1.5em;
    transition: transform 0.5s ease;
    color: var(--danger-color);
    margin-left: 15px;
  }

  .like_or_deslike:hover {
    transform: scale(1.3);
    cursor: pointer;
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

  :hover {
    transform: scale(1.05) translateY(-10px);
  }

  @media screen and (max-width: 545px) {
    padding: 8px 0px;
    overflow-x: scroll;

    .index {
      font-size: 1em;
      margin-right: 8px;
    }

    .play_pause_btns {
      margin-right: 12px;

      .pause,
      .play {
        font-size: 2em;
      }

      :hover {
        transform: scale(1.2);
      }
    }

    .song_img {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }

    .name {
      font-size: 1em;
      /* margin-left: 30px; */
    }
  }
`;

export default Song;
