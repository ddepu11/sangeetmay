import { useState, useRef, ChangeEvent } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import styled from 'styled-components';
import { IFile } from '../../interfaces';
import dummyPlaylistImage from '../../images/dummyPlaylistImage.jpg';
import setValidationMessage from '../../utils/setValidationMessage';
import FormControl from '../../components/FormControl';

const AddSongs = () => {
  const [playlistPic, setPlayListPic] = useState<{
    file: IFile | undefined;
    preview: undefined | string;
  }>({
    file: undefined,
    preview: undefined,
  });

  const validationMessageTag = {
    playListValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
    nameValidationMessageTag: useRef<HTMLParagraphElement | null>(null),
  };

  const setTimeOutId = useRef<NodeJS.Timeout | undefined>(undefined);

  const handlePlaylistPic = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files !== null && files !== undefined) {
      // Validating Image
      if (files[0].size > 8388608) {
        setValidationMessage(
          validationMessageTag.playListValidationMessageTag,
          'Image Size should be less then 8mb',
          'error',
          setTimeOutId
        );
      } else {
        setPlayListPic({
          file: files[0],
          preview: URL.createObjectURL(files[0]),
        });
      }
    }
  };

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
            <FaArrowAltCircleLeft />
            <span>Select Pic for Playlist</span>
            <span className='must'> *</span>
          </div>

          <p
            ref={validationMessageTag.playListValidationMessageTag}
            className='message'
          />
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
          inputId='songName'
          label='Name:'
          name='name'
          type='text'
          refObj={validationMessageTag.nameValidationMessageTag}
        />

        <FormControl
          formControlStyle={{
            labelFs: '1.2em',
            inputFs: '1.1em',
            inputPadding: '8px 16px',
            messageFs: '1em',
            fcWidth: '50%',
            fcPadding: '0px 0px 20px',
          }}
          inputId='songName'
          label='Name:'
          name='name'
          type='text'
          refObj={validationMessageTag.nameValidationMessageTag}
        />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 5px 0;
  grid-area: main;
  border: 1px dashed #555;

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
    padding: 20px 0 0;
    flex-direction: column;
    /* border: 1px dashed #555; */
  }
`;

export default AddSongs;
