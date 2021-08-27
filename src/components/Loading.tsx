import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/react';
import styled from 'styled-components';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = () => (
  <Wrapper className='flex'>
    <HashLoader css={override} size={100} color='#ffffff' />
    <p>Loading Please Wait</p>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  color: white;
  flex-direction: column;

  p {
    margin: 20px 0 0;
    text-transform: uppercase;
    font-size: 1.5em;
    letter-spacing: 4px;
  }
`;

export default Loading;
