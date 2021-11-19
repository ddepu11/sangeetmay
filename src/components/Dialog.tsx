import { FC } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

type Props = {
  whatAreYouDeleting: string;
  confirm?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deny?: () => void;
  dataId: string | undefined;
};

const Dialog: FC<Props> = ({
  whatAreYouDeleting,
  confirm,
  deny,
  dataId,
}): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (confirm && deny) confirm(e);
    if (deny) deny();
  };

  const handleCancel = (): void => {
    if (deny) deny();
  };

  return (
    <Wrapper className='flex'>
      <h1 className='heading'>{whatAreYouDeleting}</h1>

      <div className='btns flex'>
        <button className='delete flex' onClick={handleDelete} data-id={dataId}>
          <DeleteIcon className='del_icon' />
          <span>Delete</span>
        </button>

        <button className='cancel flex' onClick={handleCancel}>
          <CancelIcon className='can_icon' />
          <span>Cancel</span>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: rgba(0, 0, 0, 0.8);
  flex-direction: column;

  .heading {
    color: var(--primary-color);
    letter-spacing: 2px;
    font-size: 1.8em;
    line-height: 1.6;
    text-align: center;
  }

  .btns {
    padding: 50px 0 0;

    .delete {
      color: var(--danger-color);
      font-size: 1.8em;
      margin-right: 50px;
      transition: transform 0.5s ease;
      background: transparent;
    }

    .delete:hover {
      transform: scale(1.3);
      cursor: pointer;
    }

    .cancel {
      font-size: 1.8em;
      transition: transform 0.5s ease;
      background: transparent;
      color: var(--primary-color);
    }

    .cancel:hover {
      transform: scale(1.3);
      cursor: pointer;
    }

    .del_icon,
    .can_icon {
      font-size: 2.2em;
    }
  }
`;

export default Dialog;
