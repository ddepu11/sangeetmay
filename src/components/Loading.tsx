import styled from 'styled-components';
import { FC } from 'react';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

type Props = {
  size: 'FULL' | 'MEDIUM' | 'SMALL';
};

const Loading: FC<Props> = ({ size }): JSX.Element => (
  <Wrapper className='flex' size={size}>
    <div className='lds-dual-ring'></div>
    <p>Loading Please Wait</p>
  </Wrapper>
);

const styleForMediumSize = {
  height: '65vh',
  width: '80%',
};

const Wrapper = styled.div<Props>`
  height: 100vh;
  flex-direction: column;
  width: 100%;
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #dfc;
    border-color: #dfc transparent #dfc transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    margin: 20px 0 0;
    text-transform: uppercase;
    font-size: 1.5em;
    letter-spacing: 4px;
  }

  ${({ size }) => size === 'MEDIUM' && styleForMediumSize}
`;

export default Loading;
