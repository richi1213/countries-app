import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'components/ui/forms/NewCountryForm.module.css';
import { TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { translations } from 'components/ui/forms/translations';
import { Lang } from '@/types';
import { TranslatedCountryData } from '@/pages/countries/components/list/types';
import { capitalizeWords } from '@/helpers/capitalizeWords';

type NewCountryFormProps = {
  handleClose: () => void;
  handleAddCountry: (newCountry: TranslatedCountryData) => void;
  existingCountries: TranslatedCountryData[];
};

const NewCountryForm: React.FC<NewCountryFormProps> = ({
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
    photoFile: '',
    flagFile: '',
  });
  const [countryFormDataError, setCountryFormDataError] = useState({
    countryNameError: '',
    capitalError: '',
    populationError: '',
    photoFileError: '',
    flagFileError: '',
  });

  const validateField = (name: string, value: string | null) => {
    let errorMessage = '';

    switch (name) {
      case 'countryName':
        if (
          typeof value === 'string' &&
          (value.length < 4 || value.length > 30)
        ) {
          errorMessage = translated.errCountry;
        }
        break;
      case 'capital':
        if (
          typeof value === 'string' &&
          (value.length < 4 || value.length > 30)
        ) {
          errorMessage = translated.errCapital;
        }
        break;
      case 'population':
        if (Number(value) <= 0) {
          errorMessage = translated.errPopulation;
        }
        break;
      case 'photoFile':
      case 'flagFile':
        if (value && !/^data:image\/(jpeg|png);base64,/.test(value)) {
          errorMessage = `${name === 'photoFile' ? 'Photo' : 'Flag'} ${
            translated.errFileType
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
    validateField('photoFile', formData.photoFile);
    validateField('flagFile', formData.flagFile);

    return !(
      countryFormDataError.countryNameError ||
      countryFormDataError.capitalError ||
      countryFormDataError.populationError ||
      countryFormDataError.photoFileError ||
      countryFormDataError.flagFileError
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'photoFile' || name === 'flagFile') {
      const file = files ? files[0] : null;

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData((prevData) => ({
            ...prevData,
            [name]: base64String,
          }));
          validateField(name, base64String);
        };

        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'population' && value === '' ? null : value,
      }));
      validateField(name, value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert(translated.alertInvalid);
      return;
    }

    const isCountryAlreadyAdded = existingCountries.some(
      (country) =>
        country.name.en.toLowerCase() === formData.countryName.toLowerCase()
    );

    if (isCountryAlreadyAdded) {
      alert(translated.alreadyAdded);
      return;
    }

    const newCountry: TranslatedCountryData = {
      name: {
        en: capitalizeWords(formData.countryName),
        ka: '',
      },
      capital: {
        en: capitalizeWords(formData.capital),
        ka: '',
      },
      population: formData.population,
      photo: formData.photoFile || '',
      flag: formData.flagFile || '',
      likes: 0,
      isDeleted: false,
    };

    handleAddCountry(newCountry);

    // Clear form fields after submission
    setFormData({
      countryName: '',
      capital: '',
      population: 0,
      photoFile: '',
      flagFile: '',
    });
    setCountryFormDataError({
      countryNameError: '',
      capitalError: '',
      populationError: '',
      photoFileError: '',
      flagFileError: '',
    });
    handleClose();
  };

  return (
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

      <div className={styles.uploadFileButtonGroup}>
        <Button
          variant='text'
          color='secondary'
          component='label'
          size='small'
          startIcon={<CloudUploadIcon fontSize='small' />}
          className={styles.uploadButton}
        >
          {translated.uploadCapital}
          <input
            type='file'
            name='photoFile'
            hidden
            accept='image/jpeg,image/png'
            onChange={handleChange}
            className={styles.hiddenInput}
          />
        </Button>
        {countryFormDataError.photoFileError && (
          <p className={styles.error}>{countryFormDataError.photoFileError}</p>
        )}

        <Button
          variant='text'
          color='secondary'
          component='label'
          size='small'
          startIcon={<CloudUploadIcon fontSize='small' />}
          className={styles.uploadButton}
        >
          {translated.uploadFlag}
          <input
            type='file'
            name='flagFile'
            hidden
            accept='image/jpeg,image/png'
            onChange={handleChange}
            className={styles.hiddenInput}
          />
        </Button>
        {countryFormDataError.flagFileError && (
          <p className={styles.error}>{countryFormDataError.flagFileError}</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <Button type='submit' variant='contained' color='primary'>
          {translated.addCountry}
        </Button>
        <Button variant='outlined' onClick={handleClose}>
          {translated.cancel}
        </Button>
      </div>
    </form>
  );
};

export default NewCountryForm;
