import styles from 'components/ui/cards/card-footer/CardFooter.module.css';

type CardFooterProps = {
  flag: string;
  countryName: string;
};

const CardFooter = ({ flag, countryName }: CardFooterProps): JSX.Element => {
  return (
    <div className={styles.cardFooter}>
      <img
        src={flag}
        alt={`Flag of ${countryName}`}
        className={styles.flag}
        loading='lazy'
      />
    </div>
  );
};

export default CardFooter;
