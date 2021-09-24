import styled from 'styled-components';

const Error404 = () => (
  <Wrapper className='flex'>
    <h2>Error 404! The page you have requested doesen&apos;t exists!</h2>
  </Wrapper>
);

const Wrapper = styled.main`
  padding: 5px 5px;
  height: 76vh;
  width: 80%;
  border: 1px dashed #646464cc;

  h2 {
    color: #b8b7b7;
    font-weight: 400;
    letter-spacing: 1px;
  }
`;

export default Error404;
