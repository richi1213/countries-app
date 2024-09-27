import NorwayFlag from "assets/images/flags/norway-flag.bmp";
import styles from "components/ui/cards/card-footer/CardFooter.module.css";

const CardFooter = (): JSX.Element => {
  return (
    <div className={styles.cardFooter}>
      <img src={NorwayFlag} alt="Norway flag" className={styles.logo} />
    </div>
  );
};

export default CardFooter;
