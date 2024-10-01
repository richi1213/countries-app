import styles from "components/page-container/PageContainer.module.css";

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <main className={styles.root}>{children}</main>;
};
