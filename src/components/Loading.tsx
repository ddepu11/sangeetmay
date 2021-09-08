import styled from 'styled-components';
import { FC } from 'react';

type Props = {
  size: 'FULL' | 'MEDIUM' | 'SMALL';
};

const Loading: FC<Props> = ({ size }): JSX.Element => (
  <Wrapper className='flex' size={size}>
    <div className='lds-facebook'>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
  color: var(--primary-color);

  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: var(--secondary-color);
    animation: lds-facebook 1.1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }

    50%,
    100% {
      top: 24px;
      height: 32px;
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
