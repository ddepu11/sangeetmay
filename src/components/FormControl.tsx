import React, { FC, MutableRefObject } from 'react';
import styled from 'styled-components';

interface IFormControlStyle {
  labelFs?: string;
  inputFs?: string;
  inputW?: string;
  messageFs?: string;
  inputPadding?: string;
  fcPadding?: string;
  fcMargin?: string;
  fcWidth?: string;
  inputColor?: string;
}

interface Props {
  inputValue?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  placeholder?: string;
  refObj: MutableRefObject<HTMLParagraphElement | null>;
  type: string;
  name: string;
  label: string;
  formControlStyle?: IFormControlStyle;
}

const FormControl: FC<Props> = ({
  inputValue,
  handleInput,
  inputId,
  placeholder,
  refObj,
  type,
  name,
  label,
  formControlStyle,
}): JSX.Element => (
  <Wrapper className='form-control' {...formControlStyle}>
    <div className='fc_top'>
      <label htmlFor={inputId}>{label}</label>
      <span className='must'> *</span>
    </div>

    <input
      value={inputValue}
      onChange={handleInput}
      type={type}
      id={inputId}
      name={name}
      placeholder={placeholder}
    />

    <p ref={refObj} className='message' />
  </Wrapper>
);

const Wrapper = styled.div<IFormControlStyle>`
  padding: ${({ fcPadding }) => fcPadding};
  margin: ${({ fcMargin }) => fcMargin};
  width: ${({ fcWidth }) => fcWidth};

  display: flex;
  flex-direction: column;

  .fc_top {
    padding: 8px 0;

    label {
      font-size: ${({ labelFs }) => labelFs};
      color: #dfc6c6;
    }
  }

  input {
    color: ${({ inputColor }) => inputColor};
    border-radius: 2px;
    font-size: ${({ inputFs }) => inputFs};
    padding: ${({ inputPadding }) => inputPadding};
    width: ${({ inputW }) => inputW};
  }
  .pwd-label {
    justify-content: space-between;
  }

  .message {
    font-size: ${({ messageFs }) => messageFs};
    letter-spacing: 1px;
  }

  @media screen and (max-width: 555px) {
    margin-bottom: 20px;

    .fc_top {
      padding: 8px 0;

      .must {
        font-size: 1.2em;
      }

      label {
        font-size: 1.2em;
      }
    }

    .message.error {
      font-size: 1em;
    }

    .message.success {
      font-size: 1em;
    }

    input {
      font-size: 1em;
      padding: 5px 5px;
      width: 100%;
    }
  }
`;

export default FormControl;
