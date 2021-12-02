import React, { FC } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const spinTransition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1,
};

interface Props {
  bgColor?: string;
  wrapperH?: string;
  spW?: string;
  spH?: string;
  cirW?: string;
  cirH?: string;
  wrapperMargin?: string;
}

const CircleLoader: FC<Props> = ({
  bgColor,
  cirH,
  cirW,
  spH,
  spW,
  wrapperH,
  wrapperMargin,
}) => (
  <Wrapper
    style={{
      height: wrapperH,
      backgroundColor: bgColor,
      margin: wrapperMargin,
    }}
  >
    <div className='spinner' style={{ width: spW, height: spH }}>
      <motion.span
        style={{ width: cirW, height: cirH }}
        className='circle'
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: grid;
  place-items: center;

  .spinner {
    position: relative;

    .circle {
      display: block;
      border: 4px solid #e3e3e3;
      border-top: 4px solid #3490d9;
      border-radius: 50%;
      position: absolute;
      box-sizing: border-box;
      left: 0;
      right: 0;
    }
  }
`;

export default CircleLoader;
