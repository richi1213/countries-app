import styles from '@/pages/home/components/hero/hero-text/HeroText.module.css';
import { useParams } from 'react-router-dom';
import { translations } from '@/pages/home/components/hero/hero-text/translations';
import { Lang } from '@/types';

const HeroText: () => JSX.Element = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return (
    <div className={styles.heroText}>
      <h1 className={styles.h1}>Jacket Weather</h1>
      <p>{translated.fycp}</p>
      <button className={styles.button}>{translated.search}</button>
    </div>
  );
};

export default HeroText;
