import { FC } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import FormControl from '../components/FormControl';

const SignIn: FC = (): JSX.Element => {
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper className='w-960 flex'>
      <form onSubmit={handleSignIn}>
        <FormControl
          inputId='email'
          type='email'
          label='Email'
          name='email'
          placeholder='Enter your email'
          formControlStyle={{
            fcWidth: '100%',
            labelFs: '1.8em',
            inputFs: '1.5em',
            inputPadding: '10px 10px',
            messageFs: '1.2em',
            inputW: '80%',
          }}
        />

        <FormControl
          inputId='password'
          type='password'
          label='Password'
          name='password'
          placeholder='Enter your password'
          formControlStyle={{
            fcMargin: '10px 0 0',
            fcWidth: '100%',
            labelFs: '1.8em',
            inputFs: '1.5em',
            inputPadding: '10px 10px',
            messageFs: '1.2em',
            inputW: '80%',
          }}
        />

        <Button
          type='submit'
          buttonStyle={{
            padding: '8px 20px',
            fontSize: '1.4em',
            hoverTransform: 'scale(1.05)',
            transition: 'transform 0.4s ease-in',
            mt: '20px',
          }}
        >
          SignIn
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 50px 5px;
  border: 1px dashed #8888;

  form {
    width: 50%;
  }
`;

export default SignIn;
