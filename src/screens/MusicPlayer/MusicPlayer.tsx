import { FC } from 'react';
import styled from 'styled-components';
import dummy from '../../images/dummySongImage.jpg';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import useMusicPlayerLogic from './Logic/useMusicPlayerLogic';

const MusicPlayer: FC = (): JSX.Element => {
  const {
    handleSongEnded,
    handlePlaying,
    getherPlayedSongDetails,
    handleSongProgressChange,
    handlePauseSong,
    handlePlaySong,
    songProgress,
    currentSong,
    audioPlayer,
    pause,
    play,
    songProgressBar,
    mute,
    toggleMute,
    volume,
    handleVolume,
  } = useMusicPlayerLogic();

  return (
    <Wrapper className='flex'>
      <div className='left flex'>
        <div className='pic'>
          <img src={dummy} alt='some' />
        </div>

        <div className='like'>like</div>
      </div>

      <div className='player flex'>
        {currentSong && (
          <audio
            onPlaying={handlePlaying}
            preload='metadata'
            ref={audioPlayer}
            src={currentSong}
            onLoadedMetadata={getherPlayedSongDetails}
            onEnded={handleSongEnded}
          />
        )}

        <div className='top flex'>
          <BiSkipPrevious className='previous' />

          {!play && !pause && (
            <AiOutlinePlayCircle className='play' onClick={handlePlaySong} />
          )}

          {play && currentSong && (
            <AiOutlinePauseCircle className='pause' onClick={handlePauseSong} />
          )}

          {pause && currentSong && (
            <AiOutlinePlayCircle className='play' onClick={handlePlaySong} />
          )}

          <BiSkipNext className='next' />
        </div>

        <div className='bottom flex'>
          <input
            ref={songProgressBar}
            type='range'
            onChange={handleSongProgressChange}
            className='song_seek'
            value={songProgress}
            step={0.01}
          />
        </div>
      </div>

      <div className='volume flex'>
        <div className='volume_mute_toggel_btns'>
          {mute ? (
            <GiSpeakerOff className='speaker_off' onClick={toggleMute} />
          ) : (
            <GiSpeaker className='speaker_on' onClick={toggleMute} />
          )}
        </div>

        <input
          value={volume}
          onChange={handleVolume}
          className='volume_seek'
          type='range'
          max='1.0'
          step='0.05'
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 10px;
  padding: 0px 15px 10px;
  width: 100%;
  background-color: var(--primary-color);

  bottom: 10px;
  position: sticky;
  border-radius: 2px;
  justify-content: space-between;
  color: var(--little-dark-color);

  .pic {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .like {
    margin-left: 15px;
  }

  .player {
    flex-direction: column;
    width: 55%;

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
        --song-completed-width: 0%;
        --how-much-buffered-width: 0%;
      }
    }
  }

  /* Container of slider and thumb */
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 19px;
    border-radius: 5px;
    outline: none;
    border: none;
    position: relative;
  }

  /* from left the buffer will grow when you play song and the actual seek whole line*/
  input[type='range']::-webkit-slider-runnable-track {
    height: 3px;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(
      to right,
      #3daee2 var(--how-much-buffered-width),
      var(--little-light-color) var(--how-much-buffered-width)
    );
  }

  /* How much song has prograssed */
  input[type='range']::before {
    position: absolute;
    content: '';
    top: 8px;
    left: 0;
    width: var(--song-completed-width);
    height: 3px;
    background-color: var(--little-dark-color);
    cursor: pointer;
  }

  /* The thumb */
  input[type='range']::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background-color: var(--tertiary-color);
    border-radius: 50%;
    border: 1px solid var(--tertiary-color);
    cursor: pointer;
    margin: -9px 0 0 0;
  }

  /* on click on thumb */
  input[type='range']:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: #007db5;
  }

  .volume {
    width: 20%;

    .volume_seeker {
      --volume-seeker-width: 0%;
    }

    input[type='range']::-webkit-slider-runnable-track {
      background: var(--little-light-color);
    }

    input[type='range']::before {
      width: var(--volume-seeker-width);
    }
  }

  .volume_mute_toggel_btns {
    transition: transform 0.5s ease;

    .speaker_on,
    .speaker_off {
      font-size: 1.5em;
      margin-right: 5px;
    }

    :hover {
      transform: scale(1.2);
      color: var(--dark-color);
      cursor: pointer;
    }
  }
`;

export default MusicPlayer;
