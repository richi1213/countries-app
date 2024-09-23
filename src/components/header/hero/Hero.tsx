import Card from "../../ui/cards/Card";
import CardContent from "../../ui/cards/card-content/CardContent";
import CardFooter from "../../ui/cards/card-footer/CardFooter";
import CardHeader from "../../ui/cards/card-header/CardHeader";
import styles from "./Hero.module.css";

const Hero: () => JSX.Element = () => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroText}>
        <h1 className={styles.h1}>Jacket Weather</h1>
        <p>Find your cold place</p>
        <button className={styles.button}>Search now</button>
      </div>
      <Card>
        <CardHeader />
        <CardContent />
        <CardFooter />
      </Card>
    </div>
  );
};

export default Hero;
