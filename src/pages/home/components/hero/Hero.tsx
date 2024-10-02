import { Card, CardHeader, CardContent, CardFooter } from "components/ui/cards";
import HeroText from "~/src/pages/home/components/hero/hero-text/HeroText";
import NorwayFlag from "assets/images/flags/norway-flag.bmp";
import OsloImg from "assets/images/capitals/oslo.jpg";

import styles from "@/pages/home/components/hero/Hero.module.css";

const Hero: React.FC = () => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroOverlay}></div>

      <HeroText />

      <Card
        renderHeader={() => <CardHeader name="Oslo" photo={OsloImg} />}
        renderContent={() => (
          <CardContent name="Norway" population="5460000" capitalCity="Oslo" />
        )}
        renderFooter={() => (
          <CardFooter flag={NorwayFlag} countryName="Norway" />
        )}
      />
    </div>
  );
};

export default Hero;
