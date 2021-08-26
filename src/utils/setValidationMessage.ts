import { MutableRefObject } from 'react';

const setValidationMessage = (
  ref: MutableRefObject<HTMLParagraphElement | null>,
  message: string,
  className: string,
  setTimeOutId: MutableRefObject<NodeJS.Timeout | undefined>
): void => {
  if (ref.current !== null) {
    ref.current.innerText = message;
    ref.current.classList.add(className);

    setTimeOutId.current = setTimeout(() => {
      if (ref.current !== null) {
        ref.current.innerText = '';
        ref.current.classList.remove(className);
      }
    }, 3000);
  }
};

export default setValidationMessage;
