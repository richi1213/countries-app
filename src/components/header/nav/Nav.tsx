import styles from 'components/header/nav/Nav.module.css';
import JacketWeatherLogo from 'assets/images/winter.svg';
import { Link, NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import LanguageSwitcher from 'components/ui/language-switch/LanguageSwitcher';
import { translations } from 'components/header/nav/translations';
import { Lang } from '@/types';

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? `${styles.active}` : '';
};

const Nav: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];

  return (
    <nav className={styles.nav}>
      <Link to={`/${lang}`}>
        <div className={styles.logo}>
          <img src={JacketWeatherLogo} alt='winter logo' />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <LanguageSwitcher />

        <NavLink to={`/${lang}`} className={handleActiveNav} end>
          {translated.home}
        </NavLink>
        <NavLink to={`/${lang}/about`} className={handleActiveNav}>
          {translated.about}
        </NavLink>
        <NavLink to={`/${lang}/countries`} className={handleActiveNav}>
          {translated.countries}
        </NavLink>
        <NavLink to={`/${lang}/contact`} className={handleActiveNav}>
          {translated.contact}
        </NavLink>
        <NavLink to={`/${lang}/verification`} className={handleActiveNav}>
          {translated.verification}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
