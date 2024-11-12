import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'components/ui/forms/NewCountryForm.module.css';
import { TextField, Button, Tabs, Tab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { translations } from 'components/ui/forms/translations';
import { Lang } from '@/types';
import { editData } from '@/api/database/services';
import { BaseCountryData } from '@/api/types';
import { useMutation } from '@tanstack/react-query';

type FormData = {
  countryName: { en: string; ka: string };
  capital: { en: string; ka: string };
  population: number;
  photoFile: string;
  flagFile: string;
};

type EditCountryFormProps = {
  handleClose: () => void;
  handleEditCountry: (updatedCountry: BaseCountryData) => void;
  existingCountry: BaseCountryData;
};

const EditCountryForm: React.FC<EditCountryFormProps> = ({
  handleClose,
  handleEditCountry,
  existingCountry,
}) => {
  const { lang } = useParams<{ lang: Lang }>();
  const translated = translations[lang ?? 'en'];

  const [formData, setFormData] = useState<FormData>({
    countryName: existingCountry.name,
    capital: existingCountry.capital,
    population: existingCountry.population,
    photoFile: existingCountry.photo,
    flagFile: existingCountry.flag,
  });

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
    event.preventDefault();
    setCurrentTab(newValue);
  };

  const validateField = (
    name: string,
    value: string | null,
    lang: Lang = currentTab,
  ) => {
    let errorMessage = '';

    if (name === 'population' && (value === null || Number(value) <= 0)) {
      errorMessage = translations[lang].errPopulation;
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
    } else if (name === 'population') {
      const populationValue = value === '' ? 0 : Number(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: populationValue,
      }));
      validateField(name, value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof FormData]: {
          ...(prevData[name as keyof FormData] as { en: string; ka: string }),
          [currentTab]: value,
        },
      }));
    }
  };

  const { mutate } = useMutation({
    mutationFn: editData,
    onError: (error) => {
      console.error('Error updating country:', error);
    },
    onSuccess: () => {
      const updatedCountry: BaseCountryData = {
        ...existingCountry,
        name: formData.countryName,
        capital: formData.capital,
        population: formData.population,
        photo: formData.photoFile || existingCountry.photo,
        flag: formData.flagFile || existingCountry.flag,
      };
      handleEditCountry(updatedCountry);
      handleClose();
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData: BaseCountryData = {
      id: existingCountry.id,
      name: { en: formData.countryName.en, ka: formData.countryName.ka },
      flag: formData.flagFile || existingCountry.flag,
      population: formData.population,
      capital: { en: formData.capital.en, ka: formData.capital.ka },
      photo: formData.photoFile || existingCountry.photo,
      likes: existingCountry.likes,
    };

    if (existingCountry.id) {
      mutate({
        countryId: existingCountry.id,
        updatedData: updatedData,
      });
    }
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

      <TextField
        className={styles.textField}
        label={translations[currentTab].lCountryName}
        name='countryName'
        value={formData.countryName[currentTab]}
        onChange={handleChange}
        fullWidth
        required
        aria-label='Country Name'
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
      />

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
      </div>

      <Button type='submit' variant='contained' color='primary'>
        {translated.saveChanges}
      </Button>
    </form>
  );
};

export default EditCountryForm;
