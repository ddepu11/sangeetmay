import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiFillPlusSquare,
} from 'react-icons/ai';

import { VscLibrary } from 'react-icons/vsc';
import { FcLike } from 'react-icons/fc';

const Aside: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <ul className='top_ul'>
        <li>
          <Link to='/'>
            <div className='link flex'>
              <AiOutlineHome fontSize='1.7em' />
              <span className='link_text'>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/search'>
            <div className='link flex'>
              <AiOutlineSearch fontSize='1.7em' />
              <span className='link_text'>Search</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/library'>
            <div className='link flex'>
              <VscLibrary fontSize='1.7em' />
              <span className='link_text'>Library</span>
            </div>
          </Link>
        </li>
      </ul>

      <ul className='bottom_ul'>
        <li>
          <Link to='/create-playlist'>
            <div className='link flex'>
              <AiFillPlusSquare fontSize='1.7em' />
              <span className='link_text'>Create Playlist</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/liked-songs'>
            <div className='link flex'>
              <FcLike fontSize='1.7em' />
              <span className='link_text'>Liked Songs</span>
            </div>
          </Link>
        </li>
      </ul>

      {/* #################### BETWEEN ################ */}
      <div className='seperateing_line' />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  grid-area: aside;
  /* border: 1px solid red; */

  ul li {
    padding: 8px 0;
  }

  ul li a {
    width: 100%;
  }

  .link {
    justify-content: flex-start;
    color: var(--light-color);

    .link_text {
      margin-left: 15px;
      font-size: 1.1em;
      color: var(--little-light-color);
      transition: all 0.5s ease;
    }
  }

  .link:hover .link_text {
    color: var(--light-color);
  }

  .bottom_ul {
    /* border: 1px solid red; */
    margin-top: 18px;
  }

  .seperateing_line {
    margin: 10px 0;
    width: 100%;
    background-color: var(--little-dark-color);
    height: 0.5px;
  }
`;

export default Aside;
