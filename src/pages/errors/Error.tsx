import { useRouteError, Link } from 'react-router-dom';
import styles from '@/pages/errors/Error.module.css';

type RouteError = {
  message: string;
  statusText?: string;
  status?: number;
};

type ErrorProps = {
  customMessage?: string;
  customStatusText?: string;
};

const Error: React.FC<ErrorProps> = ({ customMessage, customStatusText }) => {
  const error = useRouteError() as RouteError;

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Oops! Something went wrong.</h1>
      <p className={styles.errorMessage}>
        {customMessage || error?.message || 'An unknown error occurred.'}
      </p>
      {customStatusText || error?.statusText ? (
        <p className={styles.errorDetails}>
          {customStatusText || error.statusText}
        </p>
      ) : null}
      <Link to='/' className={styles.errorButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error;
