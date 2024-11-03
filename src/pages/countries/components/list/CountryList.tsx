import { Suspense, useReducer, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { SortButton, AddCountryButton } from 'components/ui/buttons';
import CountryCardWrapper from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper';
import styles from '@/pages/countries/components/list/CountryList.module.css';
import CountryCardWrapperSkeleton from '@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton';
import AddCountryModal from 'components/ui/modals/AddCountryModal';
import { Lang } from '@/types';
import { TransformedCountryData } from '@/pages/countries/components/list/types';
import { BaseCountryData } from '@/pages/countries/api/types';
import { deleteData } from '@/pages/countries/api/database/services';
import { reducer, State } from '@/pages/countries/reducers/countryReducer';

const CountryList = () => {
  const countriesData = useLoaderData() as BaseCountryData[];

  const transformedCountriesData = countriesData.map((country) => ({
    ...country,
    likes: 0,
  })) as TransformedCountryData[];

  const initialCountries: State = {
    countries: transformedCountriesData,
    isAscending: true,
  };

  const { lang = 'en' } = useParams<{ lang: Lang }>();

  const [state, dispatch] = useReducer(reducer, initialCountries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (name: string) => {
    dispatch({
      type: 'country/liked',
      payload: { name, lang },
    });
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    countryId: string,
  ) => {
    event.preventDefault();
    (event.currentTarget as HTMLButtonElement).blur();

    const country = state.countries.find((country) => country.id === countryId);

    if (country) {
      dispatch({
        type: 'country/deleted',
        payload: { name: country.name[lang], lang },
      });

      try {
        await deleteData(countryId);
        console.log(`Deleted ${country.name.en}`);
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };

  const toggleSortOrder = () => {
    dispatch({
      type: 'country/setSortOrderAndSort',
      payload: { isAscending: !state.isAscending, lang },
    });
  };

  const handleAddCountry = (newCountry: TransformedCountryData) => {
    const countryData: TransformedCountryData = {
      ...newCountry,
      likes: 0,
    };
    dispatch({
      type: 'country/added',
      payload: { country: countryData },
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
