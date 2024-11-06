import { MouseEvent, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SortButton, AddCountryButton } from 'components/ui/buttons';
import CountryCardWrapper from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper';
import styles from '@/pages/countries/components/list/CountryList.module.css';
import CountryCardWrapperSkeleton from '@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton';
import ReusableModal from 'components/ui/modals/ReusableModal';
import { Lang } from '@/types';
import { TransformedCountryData } from '@/pages/countries/components/list/types';
import { CountryApiResponse } from '@/pages/countries/api/types';
import { deleteData, getData } from '@/pages/countries/api/database/services';
import NewCountryForm from 'components/ui/forms/NewCountryForm';
import { translations } from '@/components/ui/modals/translations';
import EditCountryForm from 'components/ui/forms/EditCountryForm';
import { reducer, State } from '@/pages/countries/reducers/countryReducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import Error from '@/pages/errors/Error';

const CountryList: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Lang }>();
  const [isAddNewCountryModalOpen, setIsAddNewCountryModalOpen] =
    useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<TransformedCountryData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data, error, isLoading } = useQuery<Partial<CountryApiResponse[]>>({
    queryKey: ['baseCountries'],
    queryFn: getData,
  });

  const { mutate } = useMutation<void, Error, string>({
    mutationFn: deleteData,
    onError: (error) => {
      console.error('Error deleting country:', error);
    },
  });

  const transformedCountriesData = data?.map((country) => ({
    id: country?.id,
    name: country?.name,
    flag: country?.flag,
    population: country?.population,
    capital: country?.capital,
    photo: country?.photo,
    likes: 0,
  })) as TransformedCountryData[];

  const initialCountries: State = {
    countries: [],
    isAscending: true,
  };

  const [state, dispatch] = useReducer(reducer, initialCountries);

  useEffect(() => {
    if (
      transformedCountriesData &&
      transformedCountriesData.length > 0 &&
      !isInitialized
    ) {
      dispatch({
        type: 'country/setInitialData',
        payload: transformedCountriesData,
      });
      setIsInitialized(true);
    }
  }, [transformedCountriesData, isInitialized]);

  if (isLoading) {
    return <CountryCardWrapperSkeleton />;
  }

  if (error) {
    return (
      <Error
        customMessage='Failed to load countries.'
        customStatusText={error.message}
      />
    );
  }

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
    event.currentTarget.blur();

    const country = state.countries.find((country) => country.id === countryId);

    if (country) {
      dispatch({
        type: 'country/deleted',
        payload: { name: country.name[lang], lang },
      });
    }

    mutate(countryId);
  };

  const toggleSortOrder = () => {
    dispatch({
      type: 'country/setSortOrderAndSort',
      payload: { isAscending: !state.isAscending, lang },
    });
  };

  const handleAddCountry = (newCountry: TransformedCountryData) => {
    dispatch({
      type: 'country/added',
      payload: { country: { ...newCountry, likes: 0 } },
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
    if (selectedCountry && selectedCountry.id) {
      dispatch({
        type: 'country/edited',
        payload: { id: selectedCountry.id, updatedData },
      });
      setSelectedCountry(null);
      setIsEditCountryModalOpen(false);
    }
  };

  return (
    <div className={styles.countryList}>
      <SortButton onSort={toggleSortOrder} isAscending={state.isAscending} />
      <AddCountryButton
        handleOpenModal={() => setIsAddNewCountryModalOpen(true)}
      />

      <CountryCardWrapper
        countries={state.countries}
        handleLike={handleLike}
        handleDelete={handleDelete}
        handleEdit={handleEditCountry}
      />

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
