import styles from 'components/ui/buttons/go-back/GoBackButton.module.css';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.goBackButton} onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </button>
  );
};

export default GoBackButton;
