import styles from "./Card.module.css";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps): JSX.Element => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
