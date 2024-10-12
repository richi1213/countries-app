import { Suspense, useReducer, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CountryData as BaseCountryData } from "@/pages/countries/api/countriesApi/countriesApi";
import { SortButton, AddCountryButton } from "components/ui/buttons";
import CountryCardWrapper from "@/pages/countries/components/list/card-wrapper/CountryCardWrapper";
import styles from "@/pages/countries/components/list/CountryList.module.css";
import CountryCardWrapperSkeleton from "@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton";
import AddCountryModal from "components/ui/modals/AddCountryModal";
import { reducer, State } from "@/pages/countries/reducers/countryReducer";

export type CountryData = BaseCountryData & {
  photo?: string;
  likes: number;
  isDeleted: boolean;
};

const CountryList = () => {
  const countriesData = useLoaderData() as CountryData[];

  const adjustedCountriesData = countriesData.map((country) => ({
    ...country,
    likes: country.likes || 0,
    isDeleted: false,
  }));

  const initialCountries: State = {
    countries: adjustedCountriesData,
    isAscending: true,
  };

  const [state, dispatch] = useReducer(reducer, initialCountries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (name: string) => {
    dispatch({ type: "country/liked", payload: name });
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.preventDefault();
    (event.currentTarget as HTMLButtonElement).blur();

    const country = state.countries.find((country) => country.name === name);
    if (country) {
      dispatch({
        type: "country/toggleDelete",
        payload: { name, isDeleted: !country.isDeleted },
      });
    }
  };

  const toggleSortOrder = () => {
    dispatch({
      type: "country/setSortOrderAndSort",
      payload: !state.isAscending,
    });
  };

  const handleAddCountry = (newCountry: CountryData) => {
    const countryData: CountryData = {
      ...newCountry,
      likes: 0,
      isDeleted: false,
    };
    dispatch({ type: "country/added", payload: countryData });
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
