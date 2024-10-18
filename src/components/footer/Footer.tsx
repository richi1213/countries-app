import styles from 'components/footer/Footer.module.css';
import JacketWeatherLogo from 'assets/images/winter.svg';
import { useParams } from 'react-router-dom';
import { translations } from 'components/footer/translations';
import { Lang } from '@/types';

const Footer = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={JacketWeatherLogo} alt='Jacket weather logo' />
      </div>
      <div className={styles.navLinks}>
        <a href='#'>{translated.privacyPolicy}</a>
        <a href='#'>{translated.termsOfService}</a>
      </div>
      <div className={styles.socialLinks}>
        <a href='#'>{translated.fb}</a>
        <a href='#'>{translated.insta}</a>
      </div>
    </footer>
  );
};

export default Footer;
