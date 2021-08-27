import { MutableRefObject } from 'react';

const setValidationMessage = (
  ref: MutableRefObject<HTMLParagraphElement | null> | undefined,
  message: string,
  className: string,
  setTimeOutId: MutableRefObject<NodeJS.Timeout | undefined>,
  clearMessageAfterThisMiliSeconds = 3500
): void => {
  if (ref !== null && ref?.current !== null && ref !== undefined) {
    ref.current.innerText = message;
    ref.current.classList.add(className);

    setTimeOutId.current = setTimeout(() => {
      if (ref.current !== null) {
        ref.current.innerText = '';
        ref.current.classList.remove(className);
      }
    }, clearMessageAfterThisMiliSeconds);
  }
};

export default setValidationMessage;
