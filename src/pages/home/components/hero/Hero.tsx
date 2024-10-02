import HeroText from "~/src/pages/home/components/hero/hero-text/HeroText";
import NorwayFlag from "assets/images/flags/norway-flag.bmp";
import OsloImg from "assets/images/capitals/oslo.jpg";
import styles from "@/pages/home/components/hero/Hero.module.css";
import { lazy, Suspense } from "react";
import Loading from "~/src/components/ui/loader/Loading";

const Card = lazy(() => import("~/src/components/ui/cards/Card"));
const CardContent = lazy(
  () => import("~/src/components/ui/cards/card-content/CardContent")
);
const CardFooter = lazy(
  () => import("~/src/components/ui/cards/card-footer/CardFooter")
);
const CardHeader = lazy(
  () => import("~/src/components/ui/cards/card-header/CardHeader")
);

const Hero: React.FC = () => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroOverlay}></div>

      <HeroText />

      <Suspense fallback={<Loading />}>
        <Card
          renderHeader={() => <CardHeader name="Oslo" photo={OsloImg} />}
          renderContent={() => (
            <CardContent
              name="Norway"
              population={5379475}
              capitalCity="Oslo"
            />
          )}
          renderFooter={() => (
            <CardFooter flag={NorwayFlag} countryName="Norway" />
          )}
        />
      </Suspense>
    </div>
  );
};

export default Hero;
