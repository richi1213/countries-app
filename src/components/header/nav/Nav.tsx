import styles from 'components/header/nav/Nav.module.css';
import JacketWeatherLogo from 'assets/images/winter.svg';
import { Link, NavLink, NavLinkRenderProps } from 'react-router-dom';
import LanguageSwitcher from 'components/ui/language-switch/LanguageSwitcher';
import { Lang } from '@/types';

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? `${styles.active}` : '';
};

type NavProps = {
  onLanguageChange?: (lang: Lang) => void;
};

const Nav: React.FC<NavProps> = ({ onLanguageChange }) => {
  return (
    <nav className={styles.nav}>
      <Link to='/'>
        <div className={styles.logo}>
          <img src={JacketWeatherLogo} alt='winter logo' />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <LanguageSwitcher onLanguageChange={onLanguageChange} />

        <NavLink to='/' className={handleActiveNav}>
          Home
        </NavLink>
        <NavLink to='about' className={handleActiveNav}>
          About
        </NavLink>
        <NavLink to='countries' className={handleActiveNav}>
          Countries
        </NavLink>
        <NavLink to='contact' className={handleActiveNav}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
