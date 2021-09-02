import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';

const Dashboard: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Link to='/add-songs'>
        <Button
          type='button'
          buttonStyle={{
            padding: '8px 20px',
            borderRadius: '2px',
            bgColor: 'var(--primary-color)',
            hoverTransform: 'scale(1.1)',
            transition: 'transform 0.5s ease',
          }}
        >
          Add Songs
        </Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  grid-area: main;
  border: 1px dashed #555;
`;

export default Dashboard;
