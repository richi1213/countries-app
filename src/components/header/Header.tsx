import styles from "components/header/Header.module.css";
import winterImage from "assets/images/winter.svg";

const Header: () => JSX.Element = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={winterImage} alt="winter logo" />
        </div>
        <div>🧣</div>
      </nav>
    </header>
  );
};

export default Header;
