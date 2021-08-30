import { FC } from 'react';
import styled from 'styled-components';

const Aside: FC = (): JSX.Element => {
  console.log('Aside');

  return (
    <Wrapper>
      <h1>Aside</h1>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  padding: 5px 5px;
  border: 1px solid #d82f2fdd;
  grid-area: aside;
`;

export default Aside;
