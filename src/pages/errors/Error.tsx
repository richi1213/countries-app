import { useRouteError, Link } from 'react-router-dom';
import styles from '@/pages/errors/Error.module.css';

type RouteError = {
  message: string;
  statusText?: string;
  status?: number;
};

const Error = () => {
  const error = useRouteError() as RouteError;

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Oops! Something went wrong.</h1>
      <p className={styles.errorMessage}>
        {error?.message || 'An unknown error occurred.'}
      </p>
      {error?.statusText && (
        <p className={styles.errorDetails}>{error.statusText}</p>
      )}
      <Link to='/' className={styles.errorButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error;
