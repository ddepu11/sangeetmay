import { FC } from 'react';
import styled from 'styled-components';
import useMusicPlayerLogic from './Logic/useMusicPlayerLogic';
import dummySongImg from '../../images/dummySongImage.jpg';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

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
    volumeSeeker,
    songDetails: { duration, currentTime },
    playNextSong,
    playPreviousSong,
    playerLoading,
    currentSongName,
    currentSongPic,
  } = useMusicPlayerLogic();

  return (
    <Wrapper className='w-960 flex'>
      <div className='left flex'>
        <div className='pic'>
          <img
            src={currentSongPic ? currentSongPic : dummySongImg}
            alt='some_song'
          />
        </div>

        {currentSongName && (
          <div className='song_name'>
            <span>{currentSongName.slice(0, 20)}</span>
          </div>
        )}
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
          <SkipPreviousIcon className='previous' onClick={playPreviousSong} />

          {!play && !pause && (
            <PlayCircleOutlineIcon className='play' onClick={handlePlaySong} />
          )}

          {play && currentSong && (
            <PauseCircleOutlineIcon
              className='pause'
              onClick={handlePauseSong}
            />
          )}
          {pause && currentSong && (
            <PlayCircleOutlineIcon className='play' onClick={handlePlaySong} />
          )}

          <SkipNextIcon className='next' onClick={playNextSong} />

          {playerLoading && (
            <div className='cover'>
              <span>Loading Song</span>
            </div>
          )}
        </div>

        <div className='bottom flex'>
          <span className='current_time'>
            {currentTime.minutes}:{currentTime.seconds}
          </span>
          <input
            ref={songProgressBar}
            type='range'
            onChange={handleSongProgressChange}
            className='song_seek'
            value={songProgress}
            step={0.01}
          />
          <span className='duration'>
            {duration.minutes}:{duration.seconds}
          </span>
        </div>
      </div>

      <div className='volume flex'>
        <div className='volume_mute_toggel_btns'>
          {mute ? (
            <VolumeOffIcon className='speaker_off' onClick={toggleMute} />
          ) : (
            <VolumeUpIcon className='speaker_on' onClick={toggleMute} />
          )}
        </div>

        <input
          value={volume}
          onChange={handleVolume}
          className='volume_seek'
          type='range'
          max='1.0'
          step='0.05'
          ref={volumeSeeker}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 10px;
  padding: 0px 5px 8px;
  width: 100%;
  background: var(--primary-color);
  box-shadow: rgba(10, 196, 66, 0.24) 0px 3px 8px;

  bottom: 0px;
  position: sticky;
  border-radius: 2px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;

  justify-content: space-between;
  color: var(--little-dark-color);

  .pic {
    width: 60px;
    height: 70px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      transition: transform 0.5s ease;
    }

    img:hover {
      cursor: pointer;
      transform: scale(1.3) translateY(-10px);
    }
  }

  .song_name {
    margin-left: 5px;
    span {
      font-size: 0.9em;
    }
  }

  .player {
    flex-direction: column;
    width: 65%;
    position: relative;

    .top {
      padding: 10px 0px;
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

    .top > .cover {
      top: 0;
      bottom: 25px;
      width: 100%;
      background-color: rgba(90, 90, 90, 0.8);
      border-radius: 10px;
      display: grid;
      place-content: center;
      font-size: 1.1em;
      color: var(--primary-color);
      letter-spacing: 1px;
      position: absolute;
    }
    .cover:hover {
      cursor: default;
    }

    .bottom {
      width: 100%;

      .song_seek {
        --song-completed-width: 0%;
        --how-much-buffered-width: 0%;
      }
    }

    .current_time {
      font-size: 1.1em;
      margin-right: 10px;
    }

    .duration {
      font-size: 1.1em;
      margin-left: 10px;
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

  @media screen and (max-width: 550px) {
    .left {
      width: 10%;
    }

    .pic {
      display: none;
    }

    .song_name {
      margin-left: 0px;

      span {
        font-size: 0.8em;
      }
    }

    .player {
      width: 70%;
      .top {
        padding: 5px 0px;

        .next,
        .previous {
          font-size: 1.8em;
        }

        .pause,
        .play {
          font-size: 2.2em;
        }
      }

      .top > .cover {
        top: 0;
        bottom: 25px;
        width: 100%;
        background-color: rgba(90, 90, 90, 0.8);
        border-radius: 10px;
        display: grid;
        place-content: center;
        font-size: 1.1em;
        color: var(--primary-color);
        letter-spacing: 1px;
        position: absolute;
      }

      .bottom {
        width: 100%;
      }

      .current_time {
        font-size: 1em;
        margin-right: 7px;
      }

      .duration {
        font-size: 1em;
        margin-left: 7px;
      }
    }

    .volume {
      width: 10%;
      transform: rotate(90deg);
      flex-direction: column-reverse;
      justify-content: space-between;
    }

    .volume_mute_toggel_btns {
      transform: rotate(270deg);

      .speaker_on,
      .speaker_off {
        font-size: 1.2em;
        margin-right: 0px;
      }
    }
  }
`;

export default MusicPlayer;
