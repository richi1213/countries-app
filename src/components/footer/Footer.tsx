import styles from "components/footer/Footer.module.css";
import JacketWeatherLogo from "assets/images/winter.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={JacketWeatherLogo} alt="Jacket weather logo" />
      </div>
      <div className={styles.navLinks}>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div className={styles.socialLinks}>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
