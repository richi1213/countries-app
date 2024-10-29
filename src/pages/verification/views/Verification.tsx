import { useParams } from 'react-router-dom';
import { translations } from '@/pages/verification/views/translations';
import { Lang } from '@/types';
import InputOTP from '@/pages/verification/components/input-otp/InputOTP';
import styles from '@/pages/verification/views/Verification.module.css';

const Verification: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return (
    <div className={styles.container}>
      <h2>{translated.verification}</h2>
      <InputOTP length={6} />
    </div>
  );
};

export default Verification;
