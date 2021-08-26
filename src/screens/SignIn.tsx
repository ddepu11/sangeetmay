import { FC } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const SignIn: FC = (): JSX.Element => {
  const handleSignIn = () => {
    console.log('Mohan');
  };

  return (
    <Wrapper>
      <Button
        type='button'
        buttonStyle={{
          padding: '8px 20px',
          fontSize: '1.4em',
          hoverTransform: 'scale(1.1)',
          transition: 'transform 0.4s ease-in',
        }}
        handleClick={handleSignIn}
      >
        SignIn
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
`;

export default SignIn;
