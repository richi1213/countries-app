import styles from "components/ui/cards/card-content/CardContent.module.css";
import formatPopulation from "~/src/helpers/formatPopulation";

type CardContentProps = {
  name: string;
  population: number;
  capitalCity: string;
};

const CardContent = ({
  name,
  population,
  capitalCity,
}: CardContentProps): JSX.Element => {
  return (
    <div className={styles.cardContent}>
      <span className={styles.picTitle}>{`${capitalCity}, ${name}`}</span>
      <h3 className={styles.info}>{`Population: ${formatPopulation(
        population
      )}`}</h3>
      <h4 className={styles.info}>{`Capital: ${capitalCity}`}</h4>
    </div>
  );
};

export default CardContent;
