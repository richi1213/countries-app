import axios from 'axios';
import {
  CountryApiResponse,
  BaseCountryDataDetails,
} from '@/pages/countries/api/types';

const BASE_URL = import.meta.env.VITE_COLD_COUNTRIES;

export const fetchColdCountryDetails = async (
  country: string,
): Promise<BaseCountryDataDetails | null> => {
  try {
    const response = await axios.get<CountryApiResponse[]>(
      `${BASE_URL}?name.en=${country}`,
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('No data found for the specified country.');
    }

    const {
      name,
      flag,
      officialName,
      capital,
      region,
      subregion,
      population,
      area,
      languages,
      currencies,
      timezones,
      demonyms,
      borders,
      drivingSide,
      fifaCode,
      startOfWeek,
      maps,
    } = response.data[0];

    return {
      name,
      flag,
      officialName,
      capital,
      region,
      subregion,
      population,
      area,
      languages,
      currencies,
      timezones,
      demonyms,
      borders,
      drivingSide,
      fifaCode,
      startOfWeek,
      maps,
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
