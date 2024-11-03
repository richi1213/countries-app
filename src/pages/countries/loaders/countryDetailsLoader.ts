import { LoaderFunctionArgs } from 'react-router-dom';
import { BaseCountryDataDetails } from '@/pages/countries/api/types';
import { fetchColdCountryDetails } from '@/pages/countries/api/coldCountryDetailsApi';

export const countryDetailsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<BaseCountryDataDetails | null> => {
  const { name } = params;

  if (!name) {
    throw new Error('Country name is required.');
  }

  return await fetchColdCountryDetails(name);
};
