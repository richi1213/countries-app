import styles from "components/ui/cards/Card.module.css";
import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  renderHeader: () => ReactNode;
  renderContent: () => ReactNode;
  renderFooter: () => ReactNode;
};

const Card = ({
  children,
  renderHeader,
  renderContent,
  renderFooter,
}: CardProps): JSX.Element => {
  return (
    <div className={styles.card}>
      {renderHeader()}
      {renderContent()}
      {children}
      {renderFooter()}
    </div>
  );
};

export default Card;
