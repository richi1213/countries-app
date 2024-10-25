import { Card } from '@mui/material';
import { Skeleton } from '@mui/material';
import { coldCountries } from '@/pages/countries/utils/coldCountries';
import styles from '@/pages/countries/components/list/card-wrapper/skeleton/CardFooterSkeleton.module.css';

const CountryCardWrapperSkeleton = () => {
  const skeletonItems = Array.from({ length: coldCountries.length }).map(
    (_, index) => (
      <div className={styles.countryItem} key={index}>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            {/* Skeleton for the card header (image placeholder) */}
            <Skeleton variant='rectangular' width='100%' height={130} />
          </div>

          <div className={styles.cardContent}>
            {/* Skeleton for country name and capital */}
            <Skeleton variant='text' width='60%' height={30} />
            <Skeleton variant='text' width='40%' height={25} />
            <Skeleton variant='text' width='50%' height={20} />
          </div>

          <div className={styles.cardFooter}>
            {/* Skeleton for the flag */}
            <Skeleton
              variant='circular'
              width={56}
              height={56}
              className={styles.flagSkeleton}
            />
          </div>

          {/* Skeleton for the like button */}
          <div className={styles.likeButton}>
            <Skeleton variant='circular' width={30} height={30} />
          </div>
        </Card>
      </div>
    ),
  );

  return <>{skeletonItems}</>;
};

export default CountryCardWrapperSkeleton;
