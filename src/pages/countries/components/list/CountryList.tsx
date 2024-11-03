import { MouseEvent, Suspense, useReducer, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { SortButton, AddCountryButton } from 'components/ui/buttons';
import CountryCardWrapper from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper';
import styles from '@/pages/countries/components/list/CountryList.module.css';
import CountryCardWrapperSkeleton from '@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton';
import ReusableModal from 'components/ui/modals/ReusableModal';
import { Lang } from '@/types';
import { TransformedCountryData } from '@/pages/countries/components/list/types';
import { BaseCountryData } from '@/pages/countries/api/types';
import { deleteData } from '@/pages/countries/api/database/services';
import NewCountryForm from 'components/ui/forms/NewCountryForm';
import { translations } from '@/components/ui/modals/translations';
import EditCountryForm from 'components/ui/forms/EditCountryForm';
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
  const [isAddNewCountryModalOpen, setIsAddNewCountryModalOpen] =
    useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<TransformedCountryData | null>(null);

  const handleLike = (name: string) => {
    dispatch({
      type: 'country/liked',
      payload: { name, lang },
    });
  };

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
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

  const handleEditCountry = (
    event: MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    const countryToEdit = state.countries.find((country) => country.id === id);
    if (countryToEdit) {
      setSelectedCountry(countryToEdit);
      setIsEditCountryModalOpen(true);
    }
  };

  const handleEdit = (updatedData: Partial<TransformedCountryData>) => {
    console.log(updatedData);
    if (selectedCountry && selectedCountry.id) {
      dispatch({
        type: 'country/edited',
        payload: { id: selectedCountry.id, updatedData },
      });
      setSelectedCountry(null);
      setIsEditCountryModalOpen(false);
    }
  };

  console.log(transformedCountriesData);

  return (
    <div className={styles.countryList}>
      <SortButton onSort={toggleSortOrder} isAscending={state.isAscending} />
      <AddCountryButton
        handleOpenModal={() => setIsAddNewCountryModalOpen(true)}
      />
      <Suspense fallback={<CountryCardWrapperSkeleton />}>
        <CountryCardWrapper
          countries={state.countries}
          handleLike={handleLike}
          handleDelete={handleDelete}
          handleEdit={handleEditCountry}
        />
      </Suspense>

      <ReusableModal
        open={isEditCountryModalOpen && selectedCountry !== null}
        handleClose={() => setIsEditCountryModalOpen(false)}
        title={translations[lang].editCountry}
      >
        <EditCountryForm
          existingCountry={selectedCountry!}
          handleClose={() => setIsEditCountryModalOpen(false)}
          handleEditCountry={handleEdit}
        />
      </ReusableModal>

      <ReusableModal
        open={isAddNewCountryModalOpen}
        handleClose={() => setIsAddNewCountryModalOpen(false)}
        title={translations[lang].addNewCountry}
      >
        <NewCountryForm
          handleClose={() => setIsAddNewCountryModalOpen(false)}
          handleAddCountry={handleAddCountry}
          existingCountries={state.countries}
        />
      </ReusableModal>
    </div>
  );
};

export default CountryList;
