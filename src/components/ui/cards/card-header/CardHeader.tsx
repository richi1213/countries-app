import styles from "components/ui/cards/card-header/CardHeader.module.css";

type CardHeaderProps = {
  photo?: string;
  name: string;
};

const CardHeader = ({ photo, name }: CardHeaderProps): JSX.Element => {
  return (
    <div className={styles.cardHeader}>
      <img src={photo} alt={name} loading="lazy" />
    </div>
  );
};

export default CardHeader;
