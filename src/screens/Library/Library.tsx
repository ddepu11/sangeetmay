import styled from 'styled-components';

const Library = () => {
  return (
    <Wrapper>
      <h2>Library</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  grid-area: main;
  border: 1px dashed #555;
`;

export default Library;
