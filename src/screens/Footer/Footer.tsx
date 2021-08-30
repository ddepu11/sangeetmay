import { FC } from 'react';
import styled from 'styled-components';

const Footer: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <h2>Footer</h2>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 5px 5px;
  border: 1px solid #0e8f20;
  grid-area: footer;
`;

export default Footer;
