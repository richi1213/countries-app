import { coldCountries } from '@/pages/countries/utils/coldCountries';
import { fetchColdCountryData } from '@/pages/countries/api/coldCountriesApi';
import { BaseCountryData } from '@/pages/countries/api/types';

export const countriesLoader = async (): Promise<BaseCountryData[]> => {
  const dataPromises = coldCountries.map((country) =>
    fetchColdCountryData(country),
  );

  const results = await Promise.all(dataPromises);

  return results.filter((data) => data !== null) as BaseCountryData[];
};
