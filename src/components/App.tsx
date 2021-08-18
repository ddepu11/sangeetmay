import { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';

const App: FC = () => {
  const clientID: string | undefined = process.env.REACT_APP_CLIENT_ID;

  const url = `https://accounts.spotify.com/authorize`;

  return (
    <Wrapper>
      <h2 className='asa'>Just a simple App! {clientID}</h2>

      <Button
        type='button'
        buttonStyle={{
          fontSize: '2em',
          padding: '10px 20px',
          bgColor: '#e610dbe0',
          pt: '50px',
          mt: '100px',
        }}
      >
        <a
          href={`${url}?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-private,user-read-recently-played,user-top-read,playlist-modify-private,user-follow-modify,user-read-currently-playing,user-follow-read,user-library-modify,playlist-read-private,user-read-email,user-library-read&show_dialog=true`}
        >
          Sign Up
        </a>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 20px;
`;

export default App;
