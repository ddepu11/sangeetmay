import styled from 'styled-components';
import Loading from '../../components/Loading';
import useAddSongsToPlaylist from './Logic/useAddSongsToPlaylist';
import DummySongImage from '../../images/dummySongImage.jpg';
import { FiArrowLeftCircle } from 'react-icons/fi';
import Button from '../../components/Button';
import Songs from '../Songs/Songs';
import { FC } from 'react';

const AddSongsToPlaylists: FC = (): JSX.Element => {
  const {
    playlistLoading,
    playlist,
    playlistId,
    songPicture,
    handleSongPicture,
    song,
    handleSong,
    handleCancel,
    handleSongAndImageUpload,
    songPicValidationMessageTag,
    songValidationMessageTag,
  } = useAddSongsToPlaylist();

  if (playlistLoading) {
    return <Loading size='MEDIUM' />;
  }

  return (
    <Wrapper>
      {playlist && (
        <>
          <header className='flex'>
            <div className='left'>
              <div className='pic'>
                <img src={playlist.playlistPic?.url} alt={playlist.name} />
              </div>
            </div>

            <div className='right'>
              <span className='playlist_text'>Playlist</span>

              <h1>{playlist.name}</h1>

              <div className='playlist_details flex'>
                <p className='likes'>Likes: 50</p>
                <p className='songs'>Songs: 10</p>
                <p className='length'>2h 15min</p>
              </div>
            </div>
          </header>

          <div className='add_song flex'>
            <div className='song_pic_and_file flex'>
              <div className='select_pic'>
                <label htmlFor='songImage'>
                  <img
                    src={
                      songPicture?.preview
                        ? songPicture?.preview
                        : DummySongImage
                    }
                    onLoad={() => {
                      songPicture?.preview &&
                        URL.revokeObjectURL(songPicture?.preview);
                    }}
                    alt='song-dummy'
                  />
                </label>

                <input
                  type='file'
                  accept='.jpg, .png, .jpeg'
                  id='songImage'
                  onChange={handleSongPicture}
                  onLoad={() =>
                    URL.revokeObjectURL(songPicture?.preview as string)
                  }
                />
              </div>

              <div className='choose_text flex'>
                <div className='top flex'>
                  <FiArrowLeftCircle fontSize='1.3em' />
                  <h3>Choose song image</h3>
                </div>
                <p className='must' ref={songPicValidationMessageTag} />
              </div>

              {/*    */}
              <div className='song_file'>
                <label htmlFor='song'>
                  <div className='choose_song_file flex'>
                    <p>{song ? song.name?.slice(0, 20) : 'choose file'}</p>
                    <span>Browse</span>
                  </div>
                </label>

                <p className='must' ref={songValidationMessageTag} />

                <input
                  type='file'
                  accept='.mp3'
                  id='song'
                  onChange={handleSong}
                />
              </div>
            </div>

            {song && (
              <div className='song_details flex'>
                <div className='left'>
                  <h1 className='heading'>Song Details</h1>

                  <div className='row flex'>
                    <span className='title'>Name:</span>
                    <span className='value'>{song.name}</span>
                  </div>

                  <div className='row flex'>
                    <span className='title'>Size:</span>

                    <span className='value'>
                      {song.size != undefined &&
                        Number(song.size / (1024 * 1024)).toFixed(2)}
                      &nbsp; Mb
                    </span>
                  </div>
                </div>

                <div className='right flex'>
                  <Button
                    type='button'
                    buttonStyle={{
                      padding: '8px 20px',
                      fontSize: '0.9em',
                      borderRadius: '10px',
                      bgColor: 'var(--danger-color)',
                      margin: '00px 0 20px',
                      hoverTransform: 'scale(1.1)',
                      transition: 'transform 0.5s ease',
                    }}
                    handleClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  <Button
                    type='button'
                    buttonStyle={{
                      padding: '8px 20px',
                      fontSize: '0.9em',
                      borderRadius: '10px',
                      bgColor: 'var(--success-color)',
                      hoverTransform: 'scale(1.1)',
                      transition: 'transform 0.5s ease',
                    }}
                    handleClick={handleSongAndImageUpload}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
          {playlist.songs !== undefined && (
            <Songs songsIds={playlist.songs} playlistId={playlistId} />
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 10px 0;
  border: 1px dashed #555;
  color: var(--little-light-color);
  width: 79%;
  height: 76vh;
  overflow-y: scroll;

  header {
    justify-content: flex-start;
    padding: 5px 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    .left {
      .pic {
        width: 200px;
        height: 200px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 2px solid var(--little-light-color);
        }
        transition: transform 0.5s ease;
      }

      .pic:hover {
        transform: scale(1.1) translateY(-5px);
        cursor: pointer;
      }
    }

    .right {
      margin-left: 22px;

      .playlist_text {
        font-size: 0.8em;
        text-transform: uppercase;
      }

      h1 {
        margin-top: 10px;
        font-size: 1.8em;
        text-transform: capitalize;
        letter-spacing: 2px;
      }

      .playlist_details {
        margin-top: 20px;
        justify-content: flex-start;

        .likes,
        .songs {
          margin-right: 12px;
          border-right: 1px dashed #555;
          padding: 0 5px 0;
          font-size: 0.9em;
        }
      }
    }
  }

  .add_song {
    margin-top: 15px;
    padding: 20px 15px 15px;
    flex-direction: column;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    .song_pic_and_file {
      width: 100%;
      justify-content: space-between;
    }

    .select_pic {
      width: 100px;
      height: 100px;

      label {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }

      label:hover {
        cursor: pointer;
      }

      input {
        display: none;
      }
    }

    .choose_text {
      flex-direction: column;
      align-items: flex-start;

      h3 {
        font-size: 1em;
        letter-spacing: 2px;
        margin-left: 10px;
        font-weight: 400;
      }

      p {
        padding: 5px 0 0;
      }
    }

    .song_file {
      .choose_song_file {
        background-color: var(--secondary-color);
        border-radius: 10px;
        justify-content: space-between;

        p {
          padding: 5px 10px;
          color: var(--dark-color);
          font-size: 0.9em;
          letter-spacing: 0;
          text-transform: lowercase;
        }

        span {
          background-color: var(--primary-color);
          padding: 5px 10px;
          border-radius: 10px;
          color: var(--dark-color);
        }
      }

      .choose_song_file:hover {
        cursor: pointer;
      }

      input {
        display: none;
      }
    }

    .song_details {
      margin-top: 30px;
      width: 100%;

      justify-content: flex-start;
      align-items: flex-start;

      .left {
        .heading {
          font-size: 1.6em;
          font-weight: 400;
          letter-spacing: 1px;
          padding: 2px 0 12px;
        }

        .row {
          justify-content: flex-start;
          padding: 0px 0 10px;

          .title {
            margin-right: 20px;
            font-size: 1.1em;
          }
        }
      }

      .right {
        margin-left: 50px;
        flex-direction: column;
      }
    }
  }
`;

export default AddSongsToPlaylists;
