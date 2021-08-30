import { FC, ReactNode } from 'react';
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
  fontWeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  hoverTransform?: string;
  transition?: string;
  width?: string;
  hoverBorder?: string;
  border?: string;
  borderRadius?: string;
  hoverCursor?: string;
}

interface Props {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  buttonStyle?: IButtonStyle;
  handleClick?: () => void;
}

const Button: FC<Props> = ({
  type,
  children,
  buttonStyle,
  handleClick,
}): JSX.Element => (
  <ButtonWrapper type={type} {...buttonStyle} onClick={handleClick}>
    {children}
  </ButtonWrapper>
);

const ButtonWrapper = styled.button<IButtonStyle>`
  padding: ${({ padding }) => padding};
  padding-top: ${({ pt }) => pt};
  padding-bottom: ${({ pb }) => pb};

  margin: ${({ margin }) => margin};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};

  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  text-transform: ${({ textTransform }) => textTransform};

  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  transition: ${({ transition }) => transition};

  width: ${({ width }) => width};

  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};

  :hover {
    transform: ${({ hoverTransform }) => hoverTransform};
    border: ${({ hoverBorder }) => hoverBorder};
    cursor: ${({ hoverCursor = 'pointer' }) => hoverCursor};
  }
`;

export default Button;
