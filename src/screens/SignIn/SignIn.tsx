import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import useSignInLogic from './Logic/useSignInLogic';

const SignIn: FC = (): JSX.Element => {
  const {
    handleSignIn,
    handleInput,
    credentials: { email, password },
    emailValidationMessageTag,
    passwordValidationMessageTag,
    loginAsRandomUser,
    loginAsAdmin,
  } = useSignInLogic();

  return (
    <Wrapper className='flex '>
      <form onSubmit={handleSignIn}>
        <h1 className='heading'>
          Sign in to sangeetmay to listen your favorite songs
        </h1>

        <FormControl
          inputId='email'
          type='text'
          label='Email'
          name='email'
          inputValue={email}
          placeholder='Enter your email'
          handleInput={handleInput}
          refObj={emailValidationMessageTag}
          formControlStyle={{
            inputColor: 'var(--little-dark-color)',
            fcMargin: '30px 0 0',
            fcWidth: '100%',
            labelFs: '1.1em',
            inputFs: '0.9em',
            inputPadding: '8px 10px',
            messageFs: '1.1em',
            inputW: '100%',
          }}
        />

        <FormControl
          inputId='password'
          type='password'
          label='Password'
          name='password'
          inputValue={password}
          placeholder='Enter your password'
          handleInput={handleInput}
          refObj={passwordValidationMessageTag}
          formControlStyle={{
            fcMargin: '40px 0 0',
            fcWidth: '100%',
            labelFs: '1.1em',
            inputFs: '0.9em',
            inputPadding: '8px 10px',
            messageFs: '1.2em',
            inputW: '100%',
          }}
        />

        <Button
          type='submit'
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.05em',
            mt: '40px',
            width: '100%',
            bgColor: 'var(--secondary-color)',
            color: 'var(--dark-color)',
          }}
        >
          SignIn
        </Button>

        <Button
          type='submit'
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.05em',
            mt: '15px',
            width: '100%',
            bgColor: 'var(--little-light-color)',
            color: 'var(--dark-color)',
          }}
          handleClick={loginAsRandomUser}
        >
          Sign in as random user
        </Button>

        <Button
          type='submit'
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.05em',
            mt: '15px',
            width: '100%',
            bgColor: 'var(--little-dark-color)',
            color: 'var(--light-color)',
          }}
          handleClick={loginAsAdmin}
        >
          Sign in as Admin
        </Button>

        <Link to='/sign-up' className='sign_up_link' style={{ width: '100%' }}>
          <Button
            type='button'
            buttonStyle={{
              padding: '8px 20px',
              fontSize: '1.0em',
              width: '100%',
              bgColor: 'var(--tertiary-color)',
              color: 'var(--dark-color)',
            }}
          >
            Dont have have an account? Sign Up Now
          </Button>
        </Link>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 20px 5px 50px;
  flex-direction: column;
  border: 1px dashed #8888;
  margin-top: 25px;
  width: 100%;

  .heading {
    font-size: 1.3em;
    text-transform: capitalize;
    letter-spacing: 3px;
    padding: 10px 0 10px;
    font-weight: 300;
    line-height: 1.6;
    color: var(--primary-color);
    text-align: center;
  }

  form {
    width: 40%;
  }

  .sign_up_link {
    margin-top: 20px;
  }

  @media screen and (max-width: 798px) {
    form {
      width: 70%;
    }
  }

  @media screen and (max-width: 450px) {
    padding: 10px 10px;

    form {
      width: 100%;
    }
  }
`;

export default SignIn;
