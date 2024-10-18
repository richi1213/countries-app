import { Nav } from 'components/header';
import styles from 'components/header/Header.module.css';

const Header: React.FC = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default Header;
