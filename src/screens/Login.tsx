import { FC } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const Login: FC = (): JSX.Element => {
  console.log('Login');

  return (
    <Wrapper>
      <Button
        type='button'
        buttonStyle={{
          padding: '8px 20px',
          fontSize: '1.4em',
          hoverTransform: 'scale(1.1) rotate(360deg)',
          transition: 'transform 0.4s ease-in',
        }}
      >
        Login
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
`;

export default Login;
