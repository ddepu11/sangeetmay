import { FC } from "react";
import styled from "styled-components";

const App: FC = () => {
  console.log("App");

  return (
    <Wrapper>
      <h2>App</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
`;

export default App;
