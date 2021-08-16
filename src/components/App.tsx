import { FC, useState } from 'react';
import styled from 'styled-components';

const App: FC = () => {
  const [name, setName] = useState<string>('');
  const [count, setCount] = useState<number>(1);

  const handleClick = () => {
    setCount(count + 1);
    setName(`Mohan ${count}`);
  };

  return (
    <Wrapper>
      <h2 className='asa'>Hey What&apos;s up</h2>

      <p>{name}</p>
      <h3>{count}</h3>
      <button type='button' onClick={handleClick}>
        a
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px 20px;

  button {
    margin-top: 20px;
    font-size: 1.5em;
    padding: 10px 20px;
    color: white;
    background: #333;
  }
`;

export default App;
