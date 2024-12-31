import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <AppBar
      sx={{
        height: '56px',
        padding: '6px 16px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'solid 1px #dcdcdc',
      }}
      color={'base'}
      position={'static'}
      elevation={0}
    >
      <Link
        to={'/home'}
        style={{ display: 'flex' }}
      >
        <Logo />
      </Link>
      <UserMenu />
    </AppBar>
  );
};

export default Header;
