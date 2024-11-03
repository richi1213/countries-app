import axios from 'axios';
import {
  CountryApiResponse,
  BaseCountryData,
} from '@/pages/countries/api/types';

const BASE_URL = 'http://localhost:3000/countries';

export const fetchColdCountryData = async (
  country: string,
): Promise<BaseCountryData | null> => {
  try {
    const response = await axios.get<CountryApiResponse[]>(
      `${BASE_URL}?name.en=${country}`,
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('No data found for the specified country.');
    }

    const { id, name, flag, population, capital, photo } = response.data[0];

    return {
      id,
      name,
      flag,
      population,
      capital,
      photo,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error fetching data for ${country}: ${error.response?.status}`,
      );
    } else if (error instanceof Error) {
      console.error(`Error fetching data for ${country}:`, error.message);
    } else {
      console.error(`Error fetching data for ${country}:`, error);
    }
    return null;
  }
};
