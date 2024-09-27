import styles from "components/hero/hero-text/HeroText.module.css";

const HeroText: () => JSX.Element = () => {
  return (
    <div className={styles.heroText}>
      <h1 className={styles.h1}>Jacket Weather</h1>
      <p>Find your cold place</p>
      <button className={styles.button}>Search now</button>
    </div>
  );
};

export default HeroText;
