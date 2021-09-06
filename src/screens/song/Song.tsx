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
    <Wrapper className='song flex'>
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
`;

export default Song;
