import styles from "./CardContent.module.css";

const country = {
  name: "Norway",
  population: "5.46 million",
  capitalCity: "Oslo",
};

const CardContent = (): JSX.Element => {
  return (
    <div className={styles.cardContent}>
      <span className={styles.picTitle}>
        {`${country.capitalCity}, ${country.name}`}
      </span>
      <h3 className={styles.info}>
        {`Population: ${country.population.toUpperCase()}`}
      </h3>
      <h4 className={styles.info}>
        {`Capital city: ${country.capitalCity.toUpperCase()}`}
      </h4>
    </div>
  );
};

export default CardContent;
