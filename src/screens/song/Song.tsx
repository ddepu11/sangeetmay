import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ISong } from '../../interfaces';
import {
  playerPauses,
  playerPlays,
  playerSetCurrentSongAndPlaylist,
} from '../../features/player';
import Dialog from '../../components/Dialog';

type Props = {
  playlistId: string | undefined;
  song: ISong;
  index: number;
  handleDeleteSong: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Song: FC<Props> = ({
  song,
  index,
  handleDeleteSong,
  playlistId,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isThisSongBeingplayed, setIsThisSongBeingplayed] =
    useState<boolean>(false);

  const [viewDashBoard, setViewDashBoard] = useState(false);

  const { currentSong, play, pause } = useAppSelector(
    (state) => state.player.value
  );

  const handlePauseSong = () => {
    setIsThisSongBeingplayed(false);
    dispatch(playerPauses());
  };

  const handlePlaySong = () => {
    setIsThisSongBeingplayed(true);

    if (currentSong !== song.url) {
      dispatch(
        playerSetCurrentSongAndPlaylist({
          currentSong: song.url,
          currentSongPic: song.pic.url,
          currentSongName: song.name,
          playlistId: playlistId,
        })
      );
    }

    dispatch(playerPlays());
  };

  useEffect(() => {
    // Both conditions to sync global player play, pause buttons with this screen play,pause button
    if (play && !pause && currentSong === song.url) {
      setIsThisSongBeingplayed(true);
    }

    if (!play && pause && currentSong === song.url) {
      setIsThisSongBeingplayed(false);
    }

    // THis is for when i play different song,this song's play button should display
    if (currentSong !== song.url) {
      setIsThisSongBeingplayed(false);
    }
  }, [play, pause, currentSong, song.url]);

  // Confirming or denying song delete request
  const showConfirmDialogBox = (): void => {
    setViewDashBoard(true);
  };
  const hideConfirmDialogBox = (): void => {
    setViewDashBoard(false);
  };

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

        <RiDeleteBin5Line
          className='delete_btn'
          onClick={showConfirmDialogBox}
        />
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
