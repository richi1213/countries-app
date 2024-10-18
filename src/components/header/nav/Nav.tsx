import styles from 'components/header/nav/Nav.module.css';
import JacketWeatherLogo from 'assets/images/winter.svg';
import { Link, NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import LanguageSwitcher from 'components/ui/language-switch/LanguageSwitcher';
import { Lang } from '@/types';

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? `${styles.active}` : '';
};

const Nav: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const currentLang = lang || 'en';

  return (
    <nav className={styles.nav}>
      <Link to={`/${currentLang}`}>
        <div className={styles.logo}>
          <img src={JacketWeatherLogo} alt='winter logo' />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <LanguageSwitcher />

        <NavLink to={`/${currentLang}`} className={handleActiveNav} end>
          Home
        </NavLink>
        <NavLink to={`/${currentLang}/about`} className={handleActiveNav}>
          About
        </NavLink>
        <NavLink to={`/${currentLang}/countries`} className={handleActiveNav}>
          Countries
        </NavLink>
        <NavLink to={`/${currentLang}/contact`} className={handleActiveNav}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
