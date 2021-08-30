import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { VscLibrary } from 'react-icons/vsc';

const Aside: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to='/'>
            <div className='link flex'>
              <AiOutlineHome fontSize='1.8em' />
              <span className='link_text'>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/search'>
            <div className='link flex'>
              <AiOutlineSearch fontSize='1.8em' />
              <span className='link_text'>Search</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/library'>
            <div className='link flex'>
              <VscLibrary fontSize='1.8em' />
              <span className='link_text'>Library</span>
            </div>
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  padding: 5px 5px;
  grid-area: aside;

  ul li {
    padding: 13px 0;
  }

  ul li a {
    width: 100%;
  }

  .link {
    justify-content: flex-start;
    color: var(--light-color);

    .link_text {
      margin-left: 15px;
      font-size: 1.5em;
      color: var(--little-light-color);
      transition: all 0.5s ease;
    }
  }

  .link:hover .link_text {
    color: var(--light-color);
  }
`;

export default Aside;
