import { MutableRefObject } from 'react';
import styled from 'styled-components';

interface IProps {
  heading: string | undefined;
  wannaEdit: boolean | undefined;
  inputValue?: string | number | undefined;
  htmlFor: string | undefined;
  type: string | undefined;
  inputName?: string | undefined;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refObj?: MutableRefObject<HTMLParagraphElement | null> | undefined;
  spanInnerText: string | number | undefined;
  numberInputMax?: number | undefined;
  numberInputMin?: number | undefined;
}

const UpdateFormField = ({
  wannaEdit,
  htmlFor,
  heading,
  inputValue,
  type,
  inputName,
  handleInput,
  refObj,
  spanInnerText,
  numberInputMax,
  numberInputMin,
}: IProps): JSX.Element => (
  <Wrapper className='flex'>
    {wannaEdit ? (
      <div className='outer-div flex'>
        <div className='label-input-div flex'>
          <label htmlFor={htmlFor}>{heading}</label>

          <input
            id={htmlFor}
            value={inputValue}
            type={type}
            name={inputName}
            onChange={handleInput}
            max={numberInputMax}
            min={numberInputMin}
          />
        </div>

        <p ref={refObj} className='message' />
      </div>
    ) : (
      <>
        <h4>{heading}</h4>

        <span>{spanInnerText}</span>
      </>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  justify-content: space-between;
  padding: 0px 0 30px;

  h4 {
    font-size: 1.2em;
    color: var(--little-light-color);
    letter-spacing: 2px;
  }

  .outer-div {
    flex-direction: column;
    width: 100%;
    align-items: flex-end;

    p {
      transition: all 0.5s ease;
      height: 0;
      width: 0;
      overflow: hidden;
    }
  }

  .label-input-div {
    justify-content: space-between;
    width: 100%;

    label {
      font-size: 1.2em;
      color: var(--little-light-color);
      letter-spacing: 2px;
      font-weight: bold;
    }

    input {
      padding: 10px 0px 10px 5px;
      font-size: 1em;
      border-radius: 2px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
      width: 50%;
    }
  }

  span {
    font-size: 1em;
    color: var(--light-color);
    letter-spacing: 1px;
    display: block;
    width: 50%;
  }

  .message.error {
    color: red;
    font-size: 1.1em;
  }

  .message.success {
    color: green;
    font-size: 1.1em;
  }

  .message.success,
  .message.error {
    height: auto;
    width: auto;
  }

  @media screen and (max-width: 511px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 30px;

    h4 {
      font-size: 1.2em;
      margin-bottom: 5px;
    }

    .outer-div {
      align-items: flex-start;
    }
    .label-input-div {
      flex-direction: column;
      align-items: flex-start;
      label {
        padding: 5px 0;
      }
      input {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 341px) {
    padding: 0 0 27px;
  }
`;

export default UpdateFormField;
