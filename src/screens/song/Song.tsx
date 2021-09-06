import { FC, useState } from 'react';
import styled from 'styled-components';
import { playerPauseSong, playerPlaySong } from '../../features/player';
import { useAppDispatch } from '../../redux/hooks';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { FcDeleteRow } from 'react-icons/fc';
import { ISong } from '../../interfaces';

type Props = {
  song: ISong;
  index: number;
  handleDeleteSong: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
};

const Song: FC<Props> = ({ song, index, handleDeleteSong }): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isThisSongBeingplayed, setIsThisSongBeingplayed] =
    useState<boolean>(false);

  const handlePauseSong = () => {
    setIsThisSongBeingplayed(false);
    dispatch(playerPauseSong());
  };

  const handlePlaySong = () => {
    setIsThisSongBeingplayed(true);
    dispatch(playerPlaySong());
  };

  return (
    <Wrapper className='flex'>
      <span className='index'>{index + 1}.</span>
      {/*  */}

      {isThisSongBeingplayed ? (
        <AiOutlinePauseCircle className='pause' onClick={handlePauseSong} />
      ) : (
        <AiOutlinePlayCircle className='play' onClick={handlePlaySong} />
      )}

      <div className='song_img'>
        <img src={song.pic.url} alt={song.song.name} />
      </div>

      <p className='name'>{song.song.name}</p>

      <p className='likes'>Likes : {song.likes}</p>

      <FcDeleteRow
        className='delete_btn'
        onClick={handleDeleteSong}
        data-id={song.id}
      />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;

  justify-content: space-between;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 12px 10px;

  .index {
    font-size: 1.2em;
  }

  .song_img {
    width: 50px;
    height: 50px;

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
    font-size: 1.3em;
    transition: transform 0.5s ease;
  }

  .delete_btn:hover {
    transform: scale(1.3);
    cursor: pointer;
  }

  .pause,
  .play {
    font-size: 2.2em;
    transition: all 0.5s ease;
  }

  .pause,
  .play:hover {
    transform: scale(1.2);
    color: var(--dark-color);
    cursor: pointer;
  }
`;

export default Song;
