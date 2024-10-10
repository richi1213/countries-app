import { Suspense, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CountryData as BaseCountryData } from "@/pages/countries/api/countriesApi/countriesApi";
import { SortButton } from "components/ui/buttons";
import CountryCardWrapper from "@/pages/countries/components/list/card-wrapper/CountryCardWrapper";
import styles from "@/pages/countries/components/list/CountryList.module.css";
import CountryCardWrapperSkeleton from "@/pages/countries/components/list/card-wrapper/skeleton/CountryCardWrapperSkeleton";

export type CountryData = BaseCountryData & {
  photo?: string;
  likes: number;
};

const CountryList = () => {
  const countriesData = useLoaderData() as CountryData[];

  const [countries, setCountries] = useState<CountryData[]>(
    countriesData.map((country) => ({
      ...country,
      likes: country.likes || 0,
    }))
  );

  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleLike = (name: string) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.name === name
          ? { ...country, likes: country.likes + 1 }
          : country
      )
    );
  };

  const sortCountries = () => {
    setIsAscending((prev) => !prev);
    setCountries((prevCountries) =>
      [...prevCountries].sort((a, b) =>
        isAscending ? b.likes - a.likes : a.likes - b.likes
      )
    );
  };

  return (
    <div className={styles.countryList}>
      <SortButton onSort={sortCountries} isAscending={isAscending} />
      <Suspense fallback={<CountryCardWrapperSkeleton />}>
        <CountryCardWrapper countries={countries} handleLike={handleLike} />
      </Suspense>
    </div>
  );
};

export default CountryList;
