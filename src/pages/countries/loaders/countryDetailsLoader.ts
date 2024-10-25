import { LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';
import { Country } from '@/pages/countries/components/country-details/types';

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_URL;

export const countryDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params;

  if (!name) {
    throw new Error('Country name is required.');
  }

  try {
    const response = await axios.get<Country[]>(
      `${BASE_URL}${name}?fullText=true`,
    );

    if (response.data.length === 0) {
      throw new Error('No country found with the specified name.');
    }

    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching country data: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
