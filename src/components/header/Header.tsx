import React from "react";
import winterImage from "../../assets/images/winter.svg";
import styles from "./Header.module.css";
import Hero from "./hero/Hero";

const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <div>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <img src={winterImage} alt="winter logo" />
            </div>
            <div>🧣</div>
          </nav>
        </div>

        <Hero />
      </div>
    </header>
  );
};

export default Header;
