import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';

const Error404 = () => {
  const { role } = useAppSelector((state) => state.user.value);

  return (
    <Wrapper className='flex' roleOfPerson={role}>
      <h2>Error 404! The page you have requested doesen&apos;t exists!</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main<{ roleOfPerson: string | null }>`
  padding: 5px 5px;
  height: 76vh;
  width: 80%;
  border: 1px dashed #646464cc;

  h2 {
    color: #b8b7b7;
    font-weight: 400;
    letter-spacing: 1px;
  }

  width: ${({ roleOfPerson }) => roleOfPerson && '100%'};

  @media screen and (max-width: 929px) {
    width: 100%;
  }
`;

export default Error404;
