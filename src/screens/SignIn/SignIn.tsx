import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import SignInLogic from './Logic/SignInLogic';

const SignIn: FC = (): JSX.Element => {
  const {
    handleSignIn,
    handleInput,
    credentials: { email, password },
    emailValidationMessageTag,
    passwordValidationMessageTag,
  } = SignInLogic();

  return (
    <Wrapper className='w-960 flex'>
      <form onSubmit={handleSignIn}>
        <h1 className='heading'>
          Sign In to sangeetMay to listen your fav songs
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
            inputColor: 'var(--secondary-color)',
            fcMargin: '30px 0 0',
            fcWidth: '100%',
            labelFs: '1.4em',
            inputFs: '1.2em',
            inputPadding: '10px 10px',
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
            labelFs: '1.4em',
            inputFs: '1.2em',
            inputPadding: '10px 10px',
            messageFs: '1.2em',
            inputW: '100%',
          }}
        />

        <Button
          type='submit'
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.4em',
            hoverTransform: 'scale(1.05) translateY(-2px)',
            transition: 'transform 0.4s ease',
            mt: '40px',
            width: '100%',
            bgColor: 'var(--secondary-color)',
            color: 'var(--light-color)',
          }}
        >
          SignIn
        </Button>

        <Link to='/sign-up' className='sign_up_link'>
          <Button
            type='button'
            buttonStyle={{
              padding: '8px 20px',
              fontSize: '1.1em',
              hoverTransform: 'translateY(-3px)',
              transition: 'transform 0.4s ease',
              width: '100%',
              bgColor: 'var(--tertiary-color)',
              color: 'var(--light-color)',
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

  .heading {
    font-size: 1.5em;
    text-transform: capitalize;
    letter-spacing: 3px;
    padding: 10px 0 10px;
    font-weight: 300;
    text-align: center;
    line-height: 1.6;
  }

  form {
    width: 40%;
  }

  .sign_up_link {
    margin-top: 40px;
  }
`;

export default SignIn;
