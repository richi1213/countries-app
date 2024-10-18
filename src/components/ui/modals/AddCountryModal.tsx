import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import styles from 'components/ui/modals/AddCountryModal.module.css';
import { CountryData } from '@/pages/countries/components/list/CountryList';
import { capitalizeWords } from '@/helpers/capitalizeWords';
import { useParams } from 'react-router-dom';
import { Lang } from '@/types';
import { translations } from '@/components/ui/modals/translations';

type AddCountryModalProps = {
  open: boolean;
  handleClose: () => void;
  handleAddCountry: (newCountry: CountryData) => void;
  existingCountries: CountryData[];
};

const AddCountryModal: React.FC<AddCountryModalProps> = ({
  open,
  handleClose,
  handleAddCountry,
  existingCountries,
}) => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];

  const [formData, setFormData] = useState({
    countryName: '',
    capital: '',
    population: 0,
    photoUrl: '',
    flagUrl: '',
  });
  const [countryFormDataError, setCountryFormDataError] = useState({
    countryNameError: '',
    capitalError: '',
    populationError: '',
    photoUrlError: '',
    flagUrlError: '',
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = '';

    switch (name) {
      case 'countryName':
        if (value.length < 4 || value.length > 30) {
          errorMessage = translated.errCountry;
        }
        break;
      case 'capital':
        if (value.length < 4 || value.length > 30) {
          errorMessage = translated.errCapital;
        }
        break;
      case 'population':
        if (Number(value) <= 0) {
          errorMessage = translated.errPopulation;
        }
        break;
      case 'photoUrl':
      case 'flagUrl':
        // Basic URL validation
        try {
          new URL(value);
        } catch (_) {
          errorMessage = `${name === 'photoUrl' ? 'Photo' : 'Flag'} ${
            translated.errUrl
          }`;
        }
        break;
      default:
        break;
    }

    setCountryFormDataError((prevError) => ({
      ...prevError,
      [`${name}Error`]: errorMessage,
    }));
  };

  const isFormValid = () => {
    validateField('countryName', formData.countryName);
    validateField('capital', formData.capital);
    validateField('population', formData.population?.toString() || '');
    validateField('photoUrl', formData.photoUrl);
    validateField('flagUrl', formData.flagUrl);

    // Check if there are any errors
    return !(
      countryFormDataError.countryNameError ||
      countryFormDataError.capitalError ||
      countryFormDataError.populationError ||
      countryFormDataError.photoUrlError ||
      countryFormDataError.flagUrlError
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'population' && value === '' ? null : value,
    }));

    validateField(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert(translated.alertInvalid);
      return;
    }

    const isCountryAlreadyAdded = existingCountries.some(
      (country) =>
        country.name.toLowerCase() === formData.countryName.toLowerCase()
    );

    if (isCountryAlreadyAdded) {
      alert(translated.alreadyAdded);
      return;
    }

    const newCountry: CountryData = {
      name: capitalizeWords(formData.countryName),
      capital: capitalizeWords(formData.capital),
      population: formData.population,
      photo: formData.photoUrl,
      flag: formData.flagUrl,
      likes: 0,
      isDeleted: false,
    };

    handleAddCountry(newCountry);

    // Clear form fields after submission
    setFormData({
      countryName: '',
      capital: '',
      population: 0,
      photoUrl: '',
      flagUrl: '',
    });
    setCountryFormDataError({
      countryNameError: '',
      capitalError: '',
      populationError: '',
      photoUrlError: '',
      flagUrlError: '',
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalContent}>
        <h2 className={styles.textField}>Add a New Country</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className={styles.textField}
            label={translated.lCountryName}
            name='countryName'
            value={formData.countryName}
            onChange={handleChange}
            fullWidth
            required
            aria-label='Country Name'
            error={!!countryFormDataError.countryNameError}
            helperText={countryFormDataError.countryNameError || ' '}
          />
          <TextField
            className={styles.textField}
            label={translated.lCapital}
            name='capital'
            value={formData.capital}
            onChange={handleChange}
            fullWidth
            required
            aria-label='Capital'
            error={!!countryFormDataError.capitalError}
            helperText={countryFormDataError.capitalError || ' '}
          />
          <TextField
            className={styles.textField}
            label={translated.lPopulation}
            type='number'
            name='population'
            value={formData.population ?? ''}
            onChange={handleChange}
            fullWidth
            required
            aria-label='Population'
            error={!!countryFormDataError.populationError}
            helperText={countryFormDataError.populationError || ' '}
          />
          <TextField
            className={styles.textField}
            label={translated.lCapitalURL}
            name='photoUrl'
            value={formData.photoUrl}
            onChange={handleChange}
            fullWidth
            required
            aria-label='Photo URL (of Capital)'
            error={!!countryFormDataError.photoUrlError}
            helperText={countryFormDataError.photoUrlError || ' '}
          />
          <TextField
            className={styles.textField}
            label={translated.lFlagURL}
            name='flagUrl'
            value={formData.flagUrl}
            onChange={handleChange}
            fullWidth
            aria-label='Flag URL'
            error={!!countryFormDataError.flagUrlError}
            helperText={countryFormDataError.flagUrlError || ' '}
          />
          <div className={styles.buttonGroup}>
            <Button type='submit' variant='contained' color='primary'>
              {translated.addCountry}
            </Button>
            <Button variant='outlined' onClick={handleClose}>
              {translated.cancel}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCountryModal;
