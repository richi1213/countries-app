import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'components/ui/forms/NewCountryForm.module.css';
import { TextField, Button, Tabs, Tab } from '@mui/material';
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
    countryName: { en: '', ka: '' },
    capital: { en: '', ka: '' },
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

  const [currentTab, setCurrentTab] = useState<Lang>('en');

  const handleTabChange = (event: React.SyntheticEvent, newValue: Lang) => {
    setCurrentTab(newValue);
  };

  const validateField = (
    name: string,
    value: string | null,
    lang: Lang = currentTab
  ) => {
    let errorMessage = '';

    switch (name) {
      case 'countryName':
      case 'capital':
        if (
          typeof value === 'string' &&
          (value.length < 4 || value.length > 30)
        ) {
          errorMessage =
            name === 'countryName'
              ? translations[lang].errCountry // Use the error message for the current language
              : translations[lang].errCapital;
        }
        break;
      case 'population':
        if (Number(value) <= 0) {
          errorMessage = translations[lang].errPopulation;
        }
        break;
      case 'photoFile':
      case 'flagFile':
        if (value && !/^data:image\/(jpeg|png);base64,/.test(value)) {
          errorMessage = `${name === 'photoFile' ? 'Photo' : 'Flag'} ${
            translations[lang].errFileType
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
    } else if (name === 'countryName' || name === 'capital') {
      // Handle name and capital input per language
      setFormData((prevData) => ({
        ...prevData,
        [name]: {
          ...prevData[name],
          [currentTab]: value,
        },
      }));
      validateField(name, value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'population' && value === '' ? null : value,
      }));
      validateField(name, value);
    }
  };

  // Updated handleSubmit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert(translated.alertInvalid);
      return;
    }

    const isCountryAlreadyAdded = existingCountries.some(
      (country) =>
        country.name.en.toLowerCase() === formData.countryName.en.toLowerCase()
    );

    if (isCountryAlreadyAdded) {
      alert(translated.alreadyAdded);
      return;
    }

    const newCountry: TranslatedCountryData = {
      name: {
        en: capitalizeWords(formData.countryName.en),
        ka: capitalizeWords(formData.countryName.ka),
      },
      capital: {
        en: capitalizeWords(formData.capital.en),
        ka: capitalizeWords(formData.capital.ka),
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
      countryName: { en: '', ka: '' },
      capital: { en: '', ka: '' },
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

  // Updated isFormValid to check both 'en' and 'ka' fields
  const isFormValid = () => {
    // Validate for both 'en' and 'ka'
    validateField('countryName', formData.countryName.en, 'en');
    validateField('countryName', formData.countryName.ka, 'ka');
    validateField('capital', formData.capital.en, 'en');
    validateField('capital', formData.capital.ka, 'ka');

    // Validate other fields
    validateField(
      'population',
      formData.population?.toString() || '',
      currentTab
    );
    validateField('photoFile', formData.photoFile, currentTab);
    validateField('flagFile', formData.flagFile, currentTab);

    return !(
      countryFormDataError.countryNameError ||
      countryFormDataError.capitalError ||
      countryFormDataError.populationError ||
      countryFormDataError.photoFileError ||
      countryFormDataError.flagFileError ||
      formData.countryName.en === '' ||
      formData.countryName.ka === '' ||
      formData.capital.en === '' ||
      formData.capital.ka === ''
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label='Language tabs'
      >
        <Tab label='English' value='en' />
        <Tab label='ქართული' value='ka' />
      </Tabs>

      {/* Conditionally render name and capital fields based on the current tab */}
      <TextField
        className={styles.textField}
        label={translated.lCountryName}
        name='countryName'
        value={formData.countryName[currentTab]}
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
        value={formData.capital[currentTab]}
        onChange={handleChange}
        fullWidth
        required
        aria-label='Capital'
        error={!!countryFormDataError.capitalError}
        helperText={countryFormDataError.capitalError || ' '}
      />

      {/* The rest of the form stays the same */}
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

      {/* Upload buttons and errors */}
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

      <Button
        type='submit'
        className={styles.submitButton}
        variant='contained'
        fullWidth
      >
        {translated.addCountry}
      </Button>
    </form>
  );
};

export default NewCountryForm;
