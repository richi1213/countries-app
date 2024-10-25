import HeroText from '~/src/pages/home/components/hero/hero-text/HeroText';
import NorwayFlag from 'assets/images/flags/norway-flag.bmp';
import OsloImg from 'assets/images/capitals/oslo.jpg';
import styles from '@/pages/home/components/hero/Hero.module.css';
import { lazy, Suspense } from 'react';
import Loading from '~/src/components/ui/loader/Loading';
import { useParams } from 'react-router-dom';
import { Lang } from '~/src/types';
import { translations } from '@/pages/home/components/hero/translations';

const Card = lazy(() => import('~/src/components/ui/cards/Card'));
const CardContent = lazy(
  () => import('~/src/components/ui/cards/card-content/CardContent'),
);
const CardFooter = lazy(
  () => import('~/src/components/ui/cards/card-footer/CardFooter'),
);
const CardHeader = lazy(
  () => import('~/src/components/ui/cards/card-header/CardHeader'),
);

const Hero: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return (
    <div className={styles.heroImage}>
      <div className={styles.heroOverlay}></div>

      <HeroText />

      <Suspense fallback={<Loading />}>
        <Card>
          <CardHeader name='fd' photo={OsloImg} />
          <CardContent
            name={translated.norway}
            population={5379475}
            capitalCity={translated.oslo}
          />
          <CardFooter flag={NorwayFlag} countryName={translated.norway} />
        </Card>
      </Suspense>
    </div>
  );
};

export default Hero;
