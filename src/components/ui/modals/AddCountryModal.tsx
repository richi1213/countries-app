import React from 'react';
import { Modal, Box } from '@mui/material';
import styles from 'components/ui/modals/AddCountryModal.module.css';
import { TranslatedCountryData } from '@/pages/countries/components/list/types';
import { useParams } from 'react-router-dom';
import { Lang } from '@/types';
import { translations } from '@/components/ui/modals/translations';
import NewCountryForm from 'components/ui/forms/NewCountryForm';

type AddCountryModalProps = {
  open: boolean;
  handleClose: () => void;
  handleAddCountry: (newCountry: TranslatedCountryData) => void;
  existingCountries: TranslatedCountryData[];
};

const AddCountryModal: React.FC<AddCountryModalProps> = ({
  open,
  handleClose,
  handleAddCountry,
  existingCountries,
}) => {
  const { lang } = useParams<{ lang: Lang }>();
  const translated = translations[lang ?? 'en'];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalContent}>
        <h2 className={styles.textField}>{translated.addNewCountry}</h2>
        <NewCountryForm
          handleClose={handleClose}
          handleAddCountry={handleAddCountry}
          existingCountries={existingCountries}
        />
      </Box>
    </Modal>
  );
};

export default AddCountryModal;
