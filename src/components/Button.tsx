import { FC } from 'react';
import styled from 'styled-components';

interface IButtonStyle {
  mt?: string;
  mb?: string;
  padding?: string;
  pt?: string;
  pb?: string;
  color?: string;
  bgColor?: string;
  margin?: string;
  fontSize?: string;
}

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: string | number | JSX.Element;
  buttonStyle?: IButtonStyle;
}

const Button: FC<Props> = ({ type, children, buttonStyle }): JSX.Element => (
  <Wrapper type={type} {...buttonStyle}>
    {children}
  </Wrapper>
);

const Wrapper = styled.button<IButtonStyle>`
  padding: ${({ padding }) => padding};
  padding-top: ${({ pt }) => pt};
  padding-bottom: ${({ pb }) => pb};

  margin: ${({ margin }) => margin};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};

  font-size: ${({ fontSize }) => fontSize};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`;

export default Button;
