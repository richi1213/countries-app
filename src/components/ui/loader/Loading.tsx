import { useParams } from 'react-router-dom';
import styles from './Loading.module.css';
import { Lang } from '@/types';

const Loading: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>
        {lang === 'ka' ? 'დაელოდეთ...' : 'Loading'}
      </p>
    </div>
  );
};

export default Loading;
