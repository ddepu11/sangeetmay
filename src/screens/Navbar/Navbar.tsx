import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { auth } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { useAppSelector } from '../../redux/hooks';
import { HiBadgeCheck } from 'react-icons/hi';
import { FiMenu } from 'react-icons/fi';

const Navbar: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = async (): Promise<void> => {
    auth.signOut().then(() => {
      dispatch(
        sendNotification({
          message: 'User logged out successfully!',
          success: true,
        })
      );

      history.push('/sign-in');
    });
  };

  const { userInfo, role } = useAppSelector((state) => state.user.value);

  return (
    <Wrapper className='flex'>
      <div className='logo flex'>
        <Link to='/'>
          <h1>SangeetMay</h1>
        </Link>
        <div className='name_after_logo'>
          <Button
            type='button'
            buttonStyle={{
              padding: '8px 15px',
              fontSize: '0.8em',
              bgColor: 'transparent',
              color: 'var(--light-color)',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '5px',
              hoverCursor: 'auto',
            }}
          >
            <span>
              {userInfo.firstName} {userInfo.lastName}
            </span>
          </Button>
        </div>
      </div>

      <div className='outer_link'>
        <ul className='inner_link flex'>
          <li className='name_text'>
            <Button
              type='button'
              buttonStyle={{
                padding: '8px 15px',
                fontSize: '0.8em',
                bgColor: 'transparent',
                color: 'var(--light-color)',
                fontWeight: '400',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderRadius: '5px',
                hoverCursor: 'auto',
              }}
            >
              <span>
                {userInfo.firstName} {userInfo.lastName}
              </span>
            </Button>
          </li>

          {/* ############## Start #################*/}
          {role === 'ADMIN' && (
            <>
              <li>
                <Button
                  type='button'
                  buttonStyle={{
                    padding: '8px 15px',
                    fontSize: '0.95em',
                    bgColor: 'var(--success-color)',
                    color: 'var(--light-color)',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    letterSpacing: '1px',
                    borderRadius: '5px',
                    hoverCursor: 'auto',
                    transition: 'transform 0.5s ease-out',
                    hoverTransform: 'scale(1.1) translateY(-5px)',
                  }}
                >
                  <div className='center flex'>
                    <HiBadgeCheck />
                    <span>Admin</span>
                  </div>
                </Button>
              </li>

              <li>
                <Link to='/dashboard'>
                  <Button
                    type='button'
                    buttonStyle={{
                      padding: '8px 15px',
                      fontSize: '0.8em',
                      bgColor: 'var(--primary-color)',
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderRadius: '5px',
                      hoverTransform: 'scale(1.1)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    Dashboard
                  </Button>
                </Link>
              </li>
            </>
          )}
          {/* ############### End ################# */}

          <li>
            <Link to='/account'>
              <Button
                type='button'
                buttonStyle={{
                  padding: '8px 15px',
                  fontSize: '0.8em',
                  bgColor: 'var(--primary-color)',
                  fontWeight: '400',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '5px',
                  hoverTransform: 'scale(1.1)',
                  transition: 'transform 0.4s ease',
                }}
              >
                Account
              </Button>
            </Link>
          </li>

          <li>
            <Button
              handleClick={handleLogOut}
              type='button'
              buttonStyle={{
                padding: '8px 16px',
                fontSize: '0.8em',
                bgColor: 'var(--danger-color)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderRadius: '5px',
                hoverTransform: 'scale(1.1)',
                transition: 'transform 0.4s ease',
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>

      <div className='menu_bar'>
        <FiMenu />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 10px 10px;
  justify-content: space-between;
  min-width: 100%;
  margin-bottom: 20px;
  position: relative;

  .logo {
    h1 {
      background-color: var(--primary-color);
      color: var(--dark-color);
      padding: 10px 20px;
      font-size: 1em;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 400;
    }

    .name_after_logo {
      display: none;
    }
  }

  .inner_link {
    li {
      margin-left: 20px;
    }
  }

  .center {
    span {
      margin-left: 5px;
    }
  }

  .menu_bar {
    position: absolute;
    right: 15px;
    color: var(--primary-color);
    display: none;
  }

  @media screen and (max-width: 788px) {
    flex-direction: column;
    align-items: flex-start;

    .menu_bar {
      font-size: 2.2em;
      transition: transform 0.5s ease;
      display: block;
    }

    .menu_bar:hover {
      cursor: pointer;
      transform: scale(1.15);
    }

    .outer_link {
      width: 100%;
      padding: 10px 0;
    }

    .inner_link {
      flex-direction: column;
      align-items: flex-start;

      li {
        margin-left: 0px;
        width: 100%;
        padding: 0px 0 10px;
      }

      li > a {
        width: 100%;
      }

      li > a > button {
        width: 100%;
        border-radius: 0;
      }

      li > button {
        width: 100%;
        border-radius: 0;
      }
    }

    .logo {
      .name_after_logo {
        display: block;
      }
    }

    .name_text {
      display: none;
    }
  }
`;

export default Navbar;
