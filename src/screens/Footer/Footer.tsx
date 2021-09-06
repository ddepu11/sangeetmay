import { FC } from 'react';
import styled from 'styled-components';
import dummy from '../../images/dummySongImage.jpg';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { useAppSelector } from '../../redux/hooks';

const Footer: FC = (): JSX.Element => {
  const { isSongBeingPlayed } = useAppSelector((state) => state.player.value);

  const handlePlaySong = (): void => {
    //
  };

  const handlePauseSong = (): void => {
    //
  };

  return (
    <Wrapper className='flex'>
      <div className='left flex'>
        <div className='pic'>
          <img src={dummy} alt='some' />
        </div>

        <div className='like'>like</div>
      </div>

      <div className='player flex'>
        {/* <audio src=''></audio> */}

        <div className='top flex'>
          <BiSkipPrevious className='previous' />

          {isSongBeingPlayed ? (
            <AiOutlinePauseCircle className='pause' onClick={handlePauseSong} />
          ) : (
            <AiOutlinePlayCircle className='play' onClick={handlePlaySong} />
          )}

          <BiSkipNext className='next' />
        </div>

        <div className='bottom flex'>
          <input
            className='song_seek'
            id='seek'
            min='0'
            data-seek=''
            type='range'
            step='0.01'
          />
        </div>
      </div>

      <div className='volume'>
        <input
          className='seek'
          id='seek'
          min='0'
          data-seek=''
          type='range'
          step='0.01'
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 10px;
  padding: 0px 20px 10px;
  width: 100%;
  background-color: var(--primary-color);

  bottom: 10px;
  position: sticky;
  border-radius: 2px;
  justify-content: space-between;
  color: var(--little-dark-color);

  .like {
    margin-left: 15px;
  }

  .player {
    flex-direction: column;
    width: 60%;

    .top {
      padding: 12px 0px;
      width: 100%;

      .next,
      .previous {
        font-size: 2em;
        transition: transform 0.5s ease;
      }

      .pause,
      .play {
        font-size: 2.5em;
        transition: transform 0.5s ease;
        margin: 0 10px;
      }

      .next,
      .previous,
      .pause,
      .play:hover {
        transform: scale(1.1);
        color: var(--dark-color);
        cursor: pointer;
      }
    }

    .bottom {
      width: 100%;

      .song_seek {
        width: 100%;
      }
    }
  }

  .pic {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default Footer;
