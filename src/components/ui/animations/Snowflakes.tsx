import styles from 'components/ui/animations/Snowflakes.module.css';

type SnowflakesProps = {
  children?: React.ReactNode;
};

const Snowflakes: React.FC<SnowflakesProps> = ({ children }) => {
  return (
    <div className={styles.snowflakes} aria-hidden='true'>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❄</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❄</div>
      <div className={styles.snowflake}>❅</div>
      <div className={styles.snowflake}>❆</div>
      <div className={styles.snowflake}>❄</div>

      {children}
    </div>
  );
};

export default Snowflakes;
