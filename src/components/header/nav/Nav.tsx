import styles from "components/header/nav/Nav.module.css";
import JacketWeatherLogo from "assets/images/winter.svg";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? `${styles.active}` : "";
};

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={JacketWeatherLogo} alt="winter logo" />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <NavLink to="/" className={handleActiveNav}>
          Home
        </NavLink>
        <NavLink to="/about" className={handleActiveNav}>
          About
        </NavLink>
        <NavLink to="/countries" className={handleActiveNav}>
          Countries
        </NavLink>
        <NavLink to="/contact" className={handleActiveNav}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
