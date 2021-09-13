import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';

// import { VscLibrary } from 'react-icons/vsc';
import { FcLike } from 'react-icons/fc';

const Aside: FC = (): JSX.Element => {
  return (
    <Wrapper className='flex'>
      <ul className='top_ul'>
        <li>
          <Link to='/'>
            <div className='link flex'>
              <AiOutlineHome fontSize='1.7em' className='ic_home' />
              <span className='link_text'>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/search'>
            <div className='link flex'>
              <AiOutlineSearch fontSize='1.7em' className='ic_search' />
              <span className='link_text'>Search</span>
            </div>
          </Link>
        </li>

        {/* 
        <li>
          <Link to='/library'>
            <div className='link flex'>
              <VscLibrary fontSize='1.7em' />
              <span className='link_text'>Library</span>
            </div>
          </Link>
        </li> */}
      </ul>

      <ul className='middle_ul'>
        <li>
          <Link to='/liked-songs'>
            <div className='link flex'>
              <FcLike fontSize='1.7em' className='ic_liked' />
              <span className='link_text'>Liked Songs</span>
            </div>
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  flex-direction: column;
  align-items: flex-start;
  /* border: 1px solid red; */
  padding: 0 15px;
  width: 20%;

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

  @media screen and (max-width: 929px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 5px;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .top_ul {
      width: 35%;
    }

    .middle_ul {
      margin-top: 0;
      width: 60%;
    }

    .seperateing_line {
      display: none;
    }

    .link {
      .link_text {
        margin-left: 5px;
        font-size: 0.9em;
      }

      .ic_home,
      .ic_search,
      .ic_plus,
      .ic_liked {
        font-size: 1.4em;
      }
    }
  }
`;

export default Aside;
