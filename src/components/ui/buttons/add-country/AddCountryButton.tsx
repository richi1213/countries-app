import React from 'react';
import styles from 'components/ui/buttons/add-country/AddCountryButton.module.css';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';

type AddCountryButtonProps = {
  handleOpenModal: () => void;
};

const AddCountryButton: React.FC<AddCountryButtonProps> = ({
  handleOpenModal,
}) => {
  const { lang } = useParams();
  return (
    <button
      type='button'
      onClick={handleOpenModal}
      className={styles.addCountryButton}
    >
      {lang === 'ka' ? 'ქვეყნის დამატება' : 'Add Country'}
      <AddIcon />
    </button>
  );
};

export default AddCountryButton;
