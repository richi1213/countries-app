import { Nav } from 'components/header';
import styles from 'components/header/Header.module.css';
import { Lang } from '@/types';

type HeaderProps = {
  onLanguageChange?: (lang: Lang) => void;
};

const Header: React.FC<HeaderProps> = ({ onLanguageChange }): JSX.Element => {
  return (
    <header className={styles.header}>
      <Nav onLanguageChange={onLanguageChange} />
    </header>
  );
};

export default Header;
