import { Card, CardHeader, CardContent, CardFooter } from "components/ui/cards";
import { HeroText } from "components/hero";

import styles from "components/hero/Hero.module.css";

const Hero: React.FC = () => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroOverlay}></div>

      <HeroText />

      <Card
        renderHeader={() => <CardHeader />}
        renderContent={() => (
          <CardContent
            name="Norway"
            population="5.46 million"
            capitalCity="Oslo"
          />
        )}
        renderFooter={() => <CardFooter />}
      />
    </div>
  );
};

export default Hero;
