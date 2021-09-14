import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Aside: FC = (): JSX.Element => {
  return (
    <Wrapper className='flex'>
      <ul className='top_ul'>
        <li>
          <Link to='/'>
            <div className='link flex'>
              <HomeIcon className='ic_home' />
              <span className='link_text'>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/search'>
            <div className='link flex'>
              <SearchIcon className='ic_search' />
              <span className='link_text'>Search</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to='/liked-songs'>
            <div className='link flex'>
              <FavoriteIcon className='ic_liked' />
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

    .ic_liked {
      color: var(--danger-color);
    }

    .ic_home,
    .ic_search,
    .ic_liked {
      font-size: 2em;
    }
  }

  .link:hover {
    color: var(--light-color);
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
    padding: 5px 15px;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .top_ul {
      width: 100%;
    }

    .link {
      .link_text {
        margin-left: 10px;
        font-size: 1.2em;
      }

      .ic_home,
      .ic_search,
      .ic_liked {
        font-size: 1.4em;
      }
    }
  }
`;

export default Aside;
