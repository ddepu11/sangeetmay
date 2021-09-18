import styled from 'styled-components';
import Button from '../../components/Button';
import UpdateFormField from '../../components/UpdateFormField';
import useAccountLogic from './Logic/useAccountLogic';
import { FC } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loading from '../../components/Loading';

const Account: FC = (): JSX.Element => {
  const {
    cancelUpdate,
    handleInput,
    handleWannaEdit,
    handleUserInfoUpdate,
    handleDisplayPic,
    cancelDpChange,
    handleCountry,
    changeDP,
    displayPic,
    dp,
    lastName,
    firstName,
    email,
    age,
    country,
    gender,
    role,
    credentials,
    wannaEdit,

    validationMessageTags: vmt,
    loading,
  } = useAccountLogic();

  if (loading) {
    return <Loading size='MEDIUM' />;
  }
  return (
    <Wrapper className='flex' personRole={role}>
      <div className='display_pic_row flex'>
        <label htmlFor='dp'>
          {displayPic.preview || dp?.url ? (
            <img
              src={displayPic.preview ? displayPic.preview : dp?.url}
              alt='DP'
              onLoad={() =>
                displayPic.preview && URL.revokeObjectURL(displayPic.preview)
              }
            />
          ) : (
            <div className='loader flex'>{/* ADDDD Loader */}Loading</div>
          )}
        </label>

        <div className='right flex'>
          <div className='upload_img_text flex'>
            <ArrowBackIcon />
            {displayPic.preview ? (
              <>
                <Button
                  type='button'
                  buttonStyle={{
                    padding: '8px 12px',
                    margin: '0 0 0 10px',
                    bgColor: 'var(--success-color)',
                    color: 'var(--light-color)',
                  }}
                  handleClick={changeDP}
                >
                  Upload
                </Button>

                <Button
                  type='button'
                  buttonStyle={{
                    padding: '8px 12px',
                    margin: '0 0 0 10px',
                    bgColor: 'var(--danger-color)',
                    color: 'var(--light-color)',
                  }}
                  handleClick={cancelDpChange}
                >
                  Cancel
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
          spanInnerText={email}
          wannaEdit={false}
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
          type='select'
          handleInput={handleCountry}
          inputValue={credentials.country}
          spanInnerText={country}
          wannaEdit={wannaEdit}
          areYouUsingItToSelectCountry={true}
          refObj={vmt.countryValidationMessageTag}
        />

        <UpdateFormField
          heading='Role:'
          htmlFor='role'
          type='text'
          spanInnerText={role as string}
          wannaEdit={false}
          areYouUsingItToSelectCountry={true}
          refObj={vmt.countryValidationMessageTag}
        />

        <div className='update_buttons flex'>
          {!wannaEdit ? (
            <Button
              type='button'
              buttonStyle={{
                padding: '8px 16px',
                fontSize: '1.2em',
                bgColor: 'var(--tertiary-color)',
                color: 'var(--dark-color)',
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
                  bgColor: 'var(--success-color)',
                  color: 'var(--light-color)',
                }}
                handleClick={handleUserInfoUpdate}
              >
                Update
              </Button>

              <Button
                type='button'
                buttonStyle={{
                  padding: '8px 16px',
                  fontSize: '1.2em',
                  bgColor: 'var(--danger-color)',
                  color: 'var(--light-color)',
                }}
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

const Wrapper = styled.main<{ personRole: string | null }>`
  padding: 15px 0 0px;
  /* border: 1px dashed var(--little-dark-color); */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  justify-content: flex-start;
  flex-direction: column;
  width: ${({ personRole }) => (personRole === 'ADMIN' ? '100%' : '79%')};
  overflow-y: scroll;
  height: 77vh;

  .display_pic_row {
    justify-content: center;
    padding: 10px 10px;
    /* border: 1px solid red; */

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

      .loader {
        width: 100%;
        height: 100%;
        border: 1px dashed var(--little-dark-color);
      }
    }

    .right {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 20px;
      color: var(--primary-color);

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

  .detalis {
    width: 80%;
    padding: 20px 0 0;

    .update_buttons {
      padding: 20px 0;
    }

    .country_row {
      justify-content: space-between;
      padding: 0px 0 30px;

      h4 {
        font-size: 1.2em;
        color: var(--little-light-color);
        letter-spacing: 2px;
      }

      span {
        font-size: 1em;
        color: var(--light-color);
        letter-spacing: 1px;
        display: block;
        width: 50%;
      }
    }
  }

  @media screen and (max-width: 929px) {
    width: 100%;

    .detalis {
    }
  }
`;

export default Account;
