import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { auth } from '../../config/firebase';
import { sendNotification } from '../../features/notification';
import { useAppSelector } from '../../redux/hooks';
import { HiBadgeCheck } from 'react-icons/hi';

const Navbar: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleLogOut = async (): Promise<void> => {
    auth.signOut().then(() => {
      dispatch(
        sendNotification({
          message: 'User logged out successfully!',
          success: true,
        })
      );
    });
  };

  const { userInfo, role } = useAppSelector((state) => state.user.value);

  return (
    <Wrapper className='flex'>
      <div className='logo'>
        <Link to='/'>
          <h1>SangeetMay</h1>
        </Link>
      </div>

      <div className='outer_link'>
        <ul className='inner_link flex'>
          <li>
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

          {role === 'ADMIN' && (
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
          )}

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
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 5px 10px;
  grid-area: navbar;
  justify-content: space-between;

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
`;

export default Navbar;
