import './Navigation.scss';
import navicon from '../../assets/navicon.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={`navigation ${showMenu ? 'show-menu' : ''}`}>
      <img
        data-testid="navicon"
        src={navicon}
        className="navigation__icon"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      <a
        href="#"
        data-testid="bookinglink"
        className={`navigation__link ${showMenu ? '' : 'hide'}`}
        onClick={() => {
          navigate('/');
        }}
      >
        Booking
      </a>
      <a
        href="#"
        data-testid="confirmationlink"
        className={`navigation__link ${showMenu ? '' : 'hide'}`}
        onClick={() => {
          navigate('/confirmation');
        }}
      >
        Confirmation
      </a>
    </nav>
  );
}

export default Navigation;
