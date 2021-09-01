import { FaArrowAltCircleLeft } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../../components/Button';
import UpdateFormField from '../../components/UpdateFormField';
import AccountLogic from './Logic/AccountLogic';

const Account = () => {
  const {
    cancelUpdate,
    handleInput,
    handleWannaEdit,
    handleUpdate,
    handleDisplayPic,
    cancelDpChange,
    changeDP,
    displayPic,
    dp,
    lastName,
    firstName,
    email,
    age,
    country,
    gender,
    credentials,
    wannaEdit,
    validationMessageTags: vmt,
  } = AccountLogic();

  return (
    <Wrapper className='flex'>
      <div className='display_pic_row flex'>
        <label htmlFor='dp'>
          <img
            src={displayPic.preview ? displayPic.preview : dp?.url}
            alt='DP'
            onLoad={() =>
              displayPic.preview && URL.revokeObjectURL(displayPic.preview)
            }
          />
        </label>

        <div className='right flex'>
          <div className='upload_img_text flex'>
            <FaArrowAltCircleLeft />
            {displayPic.preview ? (
              <>
                <Button
                  type='button'
                  buttonStyle={{
                    padding: '8px 12px',
                    margin: '0 0 0 10px',
                    bgColor: 'var(--danger-color)',
                  }}
                  handleClick={cancelDpChange}
                >
                  Dont Want To Change DP
                </Button>

                <Button
                  type='button'
                  buttonStyle={{
                    padding: '8px 12px',
                    margin: '0 0 0 10px',
                    bgColor: 'var(--success-color)',
                  }}
                  handleClick={changeDP}
                >
                  Change DP
                </Button>
              </>
            ) : (
              <span>Change Display Pic</span>
            )}
          </div>

          <p ref={vmt.displayPicValidationMessageTag} className='message' />
        </div>

        <input
          type='file'
          id='dp'
          name='displayPic'
          accept='.png, .jpg, .jpeg'
          onChange={handleDisplayPic}
        />
      </div>

      <div className='detalis'>
        <UpdateFormField
          heading='First Name:'
          htmlFor='firstName'
          inputName='firstName'
          type='text'
          inputValue={credentials.firstName}
          spanInnerText={firstName}
          wannaEdit={wannaEdit}
          refObj={vmt.firstNameValidationMessageTag}
          handleInput={handleInput}
        />

        <UpdateFormField
          heading='Last Name:'
          htmlFor='lastName'
          inputName='lastName'
          type='text'
          inputValue={credentials.lastName}
          spanInnerText={lastName}
          wannaEdit={wannaEdit}
          refObj={vmt.lastNameValidationMessageTag}
          handleInput={handleInput}
        />

        <UpdateFormField
          heading='Email:'
          htmlFor='email'
          inputName='email'
          type='text'
          inputValue={credentials.email}
          spanInnerText={email}
          wannaEdit={wannaEdit}
          refObj={vmt.emailValidationMessageTag}
          handleInput={handleInput}
        />

        <UpdateFormField
          heading='Age:'
          htmlFor='age'
          inputName='age'
          type='number'
          inputValue={credentials.age}
          spanInnerText={age}
          wannaEdit={wannaEdit}
          handleInput={handleInput}
          refObj={vmt.ageValidationMessageTag}
          numberInputMax={100}
          numberInputMin={12}
        />

        <UpdateFormField
          heading='Gender:'
          htmlFor='gender'
          type='text'
          spanInnerText={gender}
          wannaEdit={false}
        />

        <UpdateFormField
          heading='Country:'
          htmlFor='country'
          type='text'
          spanInnerText={country}
          wannaEdit={false}
        />

        <div className='update_buttons flex'>
          {!wannaEdit ? (
            <Button
              type='button'
              buttonStyle={{
                padding: '8px 16px',
                fontSize: '1.2em',
              }}
              handleClick={handleWannaEdit}
            >
              Wanna Update?
            </Button>
          ) : (
            <>
              <Button
                type='button'
                buttonStyle={{
                  padding: '8px 16px',
                  fontSize: '1.2em',
                  margin: '0 30px 0px',
                }}
                handleClick={handleUpdate}
              >
                Update
              </Button>

              <Button
                type='button'
                buttonStyle={{ padding: '8px 16px', fontSize: '1.2em' }}
                handleClick={cancelUpdate}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 15px 0;
  grid-area: main;
  border: 1px dashed #555;
  justify-content: flex-start;
  flex-direction: column;

  .display_pic {
    width: 170px;
    height: 170px;
    /* border: 1px dashed #4b4949; */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .detalis {
    width: 80%;
    padding: 20px 0;

    .update_buttons {
      padding: 10px 0;
    }
  }

  .display_pic_row {
    justify-content: center;
    padding: 0px 0 0px;
    /* flex-direction: column; */

    label {
      width: 200px;
      height: 200px;
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
`;

export default Account;
