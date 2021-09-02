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
  margin-top: 10px;
  padding: 10px 5px;
  border: 1px solid #0e8f20;
  grid-area: footer;
  /* bottom: 5px; */
  /* position: sticky; */
`;

export default Footer;
