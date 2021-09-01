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

      <ul className='middle_ul'>
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

      <ul className='bottom_ul'>
        <li>
          <Link to='/' className='playlist'>
            <span>Mega hit mix</span>
          </Link>
        </li>

        <li>
          <Link to='/' className='playlist'>
            <span>90 Romance Rewind</span>
          </Link>
        </li>

        <li>
          <Link to='/' className='playlist'>
            <span>Old hindi classics</span>
          </Link>
        </li>

        <li>
          <Link to='/' className='playlist'>
            <span>Old hindi classics</span>
          </Link>
        </li>

        <li>
          <Link to='/' className='playlist'>
            <span>Old hindi classics</span>
          </Link>
        </li>

        <li>
          <Link to='/' className='playlist'>
            <span>Old hindi classics</span>
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  grid-area: aside;
  /* border: 1px solid red; */
  padding: 0 15px;

  ul li {
    padding: 8px 0;
  }

  ul li a {
    width: 100%;
  }

  .link {
    justify-content: flex-start;
    color: var(--little-light-color);

    .link_text {
      margin-left: 15px;
      font-size: 1.1em;
      transition: all 0.5s ease;
    }
  }

  .link:hover {
    color: var(--light-color);
  }

  .middle_ul {
    /* border: 1px solid red; */
    margin-top: 18px;
  }

  .seperateing_line {
    margin: 10px 0;
    width: 85%;
    background-color: var(--little-dark-color);
    height: 0.5px;
  }

  .bottom_ul {
    padding: 10px 0 0;

    li {
      padding: 0px 0px 7px 0px;
    }
  }

  .playlist {
    padding: 0 0 8px;
    color: var(--little-light-color);
    transition: all 0.5s ease-out;
  }

  .playlist:hover {
    color: var(--light-color);
  }
`;

export default Aside;
