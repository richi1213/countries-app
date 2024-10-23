import { Suspense, useReducer, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { SortButton, AddCountryButton } from 'components/ui/buttons';
import CountryCardWrapper from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper';
import styles from '@/pages/countries/components/list/CountryList.module.css';
import CountryCardWrapperSkeleton from '@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton';
import AddCountryModal from 'components/ui/modals/AddCountryModal';
import { reducer, State } from '@/pages/countries/reducers/countryReducer';
import { transformedCountryTranslationsMap } from '@/pages/countries/components/list/countryTranslations';
import { CountryData } from '@/pages/countries/components/list/types';
import { TranslatedCountryData } from '@/pages/countries/components/list/types';
import { Lang } from '@/types';

const CountryList = () => {
  const countriesData = useLoaderData() as CountryData[];

  const translatedCountriesData = countriesData.map((country) => {
    const translated = transformedCountryTranslationsMap.get(country.name);

    return {
      ...country,
      name: translated
        ? { en: translated.en[0], ka: translated.ka[0] }
        : { en: country.name, ka: country.name },
      capital: translated
        ? { en: translated.en[1], ka: translated.ka[1] }
        : { en: country.capital, ka: country.capital },
      likes: country.likes || 0,
      isDeleted: false,
    };
  }) as TranslatedCountryData[];

  const initialCountries: State = {
    countries: translatedCountriesData,
    isAscending: true,
  };

  const { lang = 'en' } = useParams<{ lang: Lang }>();

  const [state, dispatch] = useReducer(reducer, initialCountries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (name: string) => {
    dispatch({ type: 'country/liked', payload: { name, lang } });
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.preventDefault();
    (event.currentTarget as HTMLButtonElement).blur();

    const country = state.countries.find(
      (country) => country.name[lang] === name
    );
    if (country) {
      dispatch({
        type: 'country/toggleDelete',
        payload: { name, isDeleted: !country.isDeleted, lang },
      });
    }
  };

  const toggleSortOrder = () => {
    dispatch({
      type: 'country/setSortOrderAndSort',
      payload: { isAscending: !state.isAscending, lang },
    });
  };

  const handleAddCountry = (newCountry: TranslatedCountryData) => {
    const countryData: TranslatedCountryData = {
      ...newCountry,
      likes: 0,
      isDeleted: false,
    };
    dispatch({
      type: 'country/added',
      payload: { country: countryData, lang },
    });
  };

  return (
    <div className={styles.countryList}>
      <SortButton onSort={toggleSortOrder} isAscending={state.isAscending} />
      <AddCountryButton handleOpenModal={() => setIsModalOpen(true)} />
      <Suspense fallback={<CountryCardWrapperSkeleton />}>
        <CountryCardWrapper
          countries={state.countries}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </Suspense>

      <AddCountryModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleAddCountry={handleAddCountry}
        existingCountries={state.countries}
      />
    </div>
  );
};

export default CountryList;
