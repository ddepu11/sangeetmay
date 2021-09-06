import { FC } from 'react';
import styled from 'styled-components';

const Search: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <h2>Search</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  grid-area: main;
  border: 1px dashed #555;
`;

export default Search;
