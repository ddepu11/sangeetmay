import { FC, useState } from "react";
import styled from "styled-components";

const App: FC = () => {
  console.log("App");
  const [count, setCount] = useState<number>(0);

  const handleInc = () => setCount(count + 1);

  return (
    <Wrapper>
      <h2>Just a counter app nothing</h2>
      <h1>{count}</h1>

      <button onClick={handleInc}>Inc</button>
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
