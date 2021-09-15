import styled from 'styled-components';
import dummyPlaylistImage from '../../images/dummyPlaylistImage.jpg';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';

import Loading from '../../components/Loading';
import useAdminCreatePlaylist from './Logic/useAdminCreatePlaylist';
import { FC } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const AdminCreatePlaylist: FC = (): JSX.Element => {
  const {
    playlistLoading,
    playlistPic,
    handlePlaylistPic,
    handleInput,
    validationMessageTag: vmt,
    handleCreatePlaylist,
    playlistName,
  } = useAdminCreatePlaylist();

  if (playlistLoading) {
    return <Loading size='MEDIUM' />;
  }

  return (
    <Wrapper>
      <div className='row playlist_pic_row flex'>
        <label htmlFor='playlist-pic'>
          <img
            src={playlistPic.preview ? playlistPic.preview : dummyPlaylistImage}
            alt='playlist_pic'
            onLoad={() =>
              playlistPic.preview && URL.revokeObjectURL(playlistPic.preview)
            }
          />
        </label>

        <div className='right flex'>
          <div className='upload_img_text flex'>
            <ArrowBackIcon />
            <span>Choose Pic</span>
            <span className='must'> *</span>
          </div>

          <p ref={vmt.playListValidationMessageTag} className='message' />
        </div>

        <input
          type='file'
          id='playlist-pic'
          name='playlistPic'
          accept='.png, .jpg, .jpeg'
          onChange={handlePlaylistPic}
        />
      </div>

      <section className='add_song_row flex'>
        <FormControl
          formControlStyle={{
            labelFs: '1.2em',
            inputFs: '1.1em',
            inputPadding: '8px 16px',
            messageFs: '1em',
            fcWidth: '50%',
            fcPadding: '0px 0px 20px',
          }}
          inputId='playlistName'
          label='Playlist Name:'
          name='playlistName'
          inputValue={playlistName}
          type='text'
          refObj={vmt.nameValidationMessageTag}
          handleInput={handleInput}
        />

        <Button
          type='button'
          buttonStyle={{
            fontSize: '1.2em',
            padding: '8px 16px',
            bgColor: 'var(--secondary-color)',
            width: '50%',
            mt: '20px',
          }}
          handleClick={handleCreatePlaylist}
        >
          Create Playlist
        </Button>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 5px 0;
  grid-area: main;
  border: 1px dashed #555;
  width: 100%;
  height: 76vh;

  .playlist_pic_row {
    justify-content: center;
    padding: 10px 0 5px;
    /* flex-direction: column; */

    label {
      width: 180px;
      height: 180px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .right {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 20px;

      .upload_img_text {
        font-size: 1.2em;
        color: var(--primary-color);

        span {
          margin-left: 10px;
        }
      }
    }

    input {
      display: none;
    }
  }

  .add_song_row {
    margin-top: 40px;
    flex-direction: column;
    /* border: 1px dashed #555; */
  }
`;

export default AdminCreatePlaylist;
