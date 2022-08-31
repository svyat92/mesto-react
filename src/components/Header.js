import { Link, useLocation } from 'react-router-dom';

function Header({ email, onLogout }) {
  const location = useLocation();

  function link() {
    switch (location.pathname) {
      case '/sign-in':
        return (<Link className='header__menu-item link' to="/sign-up">Регистрация</Link>);
      case '/sign-up':
        return (<Link className='header__menu-item link' to="/sign-in">Войти</Link>);
      default:
        return (<Link className='header__menu-item link' onClick={onLogout} to="/sign-in">Выйти</Link>);
    }
  }

  return (
    <header className="header">
      <Link href="#" className="header__logo" to="/"></Link>
      <ul className="header__menu">
        {location.pathname === '/' && <li className="header__menu-item">{email}</li>}
        <li>{link()}</li>
      </ul>
    </header>
  );
}

export default Header;
