import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'components/ui/forms/NewCountryForm.module.css';
import { TextField, Button, Tabs, Tab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { translations } from 'components/ui/forms/translations';
import { Lang } from '@/types';
import { TransformedCountryData } from '@/pages/countries/components/list/types';
import { capitalizeWords } from '@/helpers/capitalizeWords';
import { postData } from '~/src/pages/countries/api/database/services';
import { PostData } from '~/src/pages/countries/api/database/types';
import { BaseCountryData } from '~/src/pages/countries/api/types';

type NewCountryFormProps = {
  handleClose: () => void;
  handleAddCountry: (newCountry: TransformedCountryData) => void;
  existingCountries: TransformedCountryData[];
};

const NewCountryForm: React.FC<NewCountryFormProps> = ({
  handleClose,
  handleAddCountry,
  existingCountries,
}) => {
  const { lang } = useParams<{ lang: Lang }>();
  const translated = translations[lang ?? 'en'];

  const initialCountryFormData = {
    countryName: { en: '', ka: '' },
    capital: { en: '', ka: '' },
    population: 0,
    photoFile: '',
    flagFile: '',
  };
  const [formData, setFormData] = useState(initialCountryFormData);

  const initialCountryFormDataError = {
    countryNameError: { en: '', ka: '' },
    capitalError: { en: '', ka: '' },
    populationError: { en: '', ka: '' },
    photoFileError: { en: '', ka: '' },
    flagFileError: { en: '', ka: '' },
  };
  const [countryFormDataError, setCountryFormDataError] = useState(
    initialCountryFormDataError,
  );

  const [currentTab, setCurrentTab] = useState<Lang>('en');

  const handleTabChange = (event: React.SyntheticEvent, newValue: Lang) => {
    setCurrentTab(newValue);
  };

  const validateField = (
    name: string,
    value: string | null,
    lang: Lang = currentTab,
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
              ? translations[lang].errCountry
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
      [`${name}Error` as keyof typeof prevError]: {
        ...prevError[`${name}Error` as keyof typeof prevError],
        [lang]: errorMessage,
      },
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert(translated.alertInvalid);
      return;
    }

    const isCountryAlreadyAdded = existingCountries.some(
      (country) =>
        country.name.en.toLowerCase() === formData.countryName.en.toLowerCase(),
    );

    if (isCountryAlreadyAdded) {
      alert(translated.alreadyAdded);
      return;
    }

    const newCountry: TransformedCountryData = {
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

    const { name, flag, population, capital, photo } = newCountry;
    const countryToPost: BaseCountryData = {
      name: {
        en: name.en,
        ka: name.ka,
      },
      capital: {
        en: capital.en,
        ka: capital.ka,
      },
      flag,
      population,
      photo,
    };

    try {
      const postDataPayload: PostData = { countryData: countryToPost };
      const response = await postData(postDataPayload);
      console.log('Country added successfully:', response);

      handleAddCountry(newCountry);

      setFormData({
        countryName: { en: '', ka: '' },
        capital: { en: '', ka: '' },
        population: 0,
        photoFile: '',
        flagFile: '',
      });
      setCountryFormDataError({
        countryNameError: { en: '', ka: '' },
        capitalError: { en: '', ka: '' },
        populationError: { en: '', ka: '' },
        photoFileError: { en: '', ka: '' },
        flagFileError: { en: '', ka: '' },
      });

      handleClose();
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  // Updated isFormValid to check both 'en' and 'ka' fields
  const isFormValid = () => {
    // Validate fields for both languages
    validateField('countryName', formData.countryName.en, 'en');
    validateField('countryName', formData.countryName.ka, 'ka');
    validateField('capital', formData.capital.en, 'en');
    validateField('capital', formData.capital.ka, 'ka');
    validateField(
      'population',
      formData.population?.toString() || '',
      currentTab,
    );
    validateField('photoFile', formData.photoFile, currentTab);
    validateField('flagFile', formData.flagFile, currentTab);

    // Manually check if any errors exist
    return !(
      countryFormDataError.countryNameError.en ||
      countryFormDataError.countryNameError.ka ||
      countryFormDataError.capitalError.en ||
      countryFormDataError.capitalError.ka ||
      countryFormDataError.populationError.en ||
      countryFormDataError.populationError.ka ||
      countryFormDataError.photoFileError.en ||
      countryFormDataError.photoFileError.ka ||
      countryFormDataError.flagFileError.en ||
      countryFormDataError.flagFileError.ka ||
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
        className={styles.tabs}
      >
        <Tab label='English' value='en' />
        <Tab label='ქართული' value='ka' />
      </Tabs>

      {/* Conditionally render name and capital fields based on the current tab */}
      <TextField
        className={styles.textField}
        label={translations[currentTab].lCountryName}
        name='countryName'
        value={formData.countryName[currentTab]}
        onChange={handleChange}
        fullWidth
        required
        aria-label='Country Name'
        error={!!countryFormDataError.countryNameError[currentTab]}
        helperText={countryFormDataError.countryNameError[currentTab] || ' '}
      />

      <TextField
        className={styles.textField}
        label={translations[currentTab].lCapital}
        name='capital'
        value={formData.capital[currentTab]}
        onChange={handleChange}
        fullWidth
        required
        aria-label='Capital'
        error={!!countryFormDataError.capitalError[currentTab]}
        helperText={countryFormDataError.capitalError[currentTab] || ' '}
      />

      {/* The rest of the form stays the same */}
      <TextField
        className={styles.textField}
        label={translations[currentTab].lPopulation}
        type='number'
        name='population'
        value={formData.population ?? ''}
        onChange={handleChange}
        fullWidth
        required
        aria-label='Population'
        error={!!countryFormDataError.populationError[currentTab]}
        helperText={countryFormDataError.populationError[currentTab] || ' '}
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
          {translations[currentTab].uploadCapital}
          <input
            type='file'
            name='photoFile'
            hidden
            accept='image/jpeg,image/png'
            onChange={handleChange}
            className={styles.hiddenInput}
          />
        </Button>
        {countryFormDataError.photoFileError[currentTab] && (
          <p className={styles.error}>
            {countryFormDataError.photoFileError[currentTab]}
          </p>
        )}

        <Button
          variant='text'
          color='secondary'
          component='label'
          size='small'
          startIcon={<CloudUploadIcon fontSize='small' />}
          className={styles.uploadButton}
        >
          {translations[currentTab].uploadFlag}
          <input
            type='file'
            name='flagFile'
            hidden
            accept='image/jpeg,image/png'
            onChange={handleChange}
            className={styles.hiddenInput}
          />
        </Button>
        {countryFormDataError.flagFileError[currentTab] && (
          <p className={styles.error}>
            {countryFormDataError.flagFileError[currentTab]}
          </p>
        )}
      </div>

      <Button
        type='submit'
        className={styles.submitButton}
        variant='contained'
        fullWidth
      >
        {translations[currentTab].addCountry}
      </Button>
    </form>
  );
};

export default NewCountryForm;
