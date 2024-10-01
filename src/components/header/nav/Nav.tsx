import styles from "components/header/nav/Nav.module.css";
import winterImage from "assets/images/winter.svg";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? `${styles.active}` : "";
};

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={winterImage} alt="winter logo" />
        </div>
      </Link>
      <div className={styles.navLinks}>
        <NavLink to="/" className={handleActiveNav}>
          Home
        </NavLink>
        <NavLink to="/about" className={handleActiveNav}>
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
