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
  hoverTransform?: string;
  transition?: string;
  width?: string;
  hoverBorder?: string;
}

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: string | number | JSX.Element;
  buttonStyle?: IButtonStyle;
  handleClick?: () => void;
}

const Button: FC<Props> = ({
  type,
  children,
  buttonStyle,
  handleClick,
}): JSX.Element => (
  <Wrapper type={type} {...buttonStyle} onClick={handleClick}>
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
  transition: ${({ transition }) => transition};

  width: ${({ width }) => width};

  :hover {
    transform: ${({ hoverTransform }) => hoverTransform};
    border: ${({ hoverBorder }) => hoverBorder};
  }
`;

export default Button;
