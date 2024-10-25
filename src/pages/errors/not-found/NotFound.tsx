import { Link } from 'react-router-dom';
import styles from '@/pages/errors/not-found/NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Page not found</h2>
      <p className={styles.message}>
        Go to the{' '}
        <Link to='/' className={styles.link}>
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
