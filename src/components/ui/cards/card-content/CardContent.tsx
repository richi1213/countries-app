import styles from "components/ui/cards/card-content/CardContent.module.css";

type CardContentProps = {
  name: string;
  population: string;
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
      <h3 className={styles.info}>
        {`Population: ${population.toUpperCase()}`}
      </h3>
      <h4 className={styles.info}>
        {`Capital city: ${capitalCity.toUpperCase()}`}
      </h4>
    </div>
  );
};

export default CardContent;
