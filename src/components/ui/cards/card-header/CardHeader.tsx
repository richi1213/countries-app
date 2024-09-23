import OsloImg from "../../../../assets/images/capitals/oslo.jpg";
import styles from "./CardHeader.module.css";

const CardHeader = (): JSX.Element => {
  return (
    <div className={styles.cardHeader}>
      <img src={OsloImg} alt="Norway" />
    </div>
  );
};

export default CardHeader;
