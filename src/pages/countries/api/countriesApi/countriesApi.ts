import axios from 'axios';

type CountryApiResponse = {
  name: { common: string };
  flags: { png: string; jpg?: string };
  population: number;
  capital: string[];
};

export type BaseCountryData = {
  name: string;
  capital: string;
  population: number;
  flag: string;
};

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_URL;

export const fetchColdCountryData = async (
  country: string,
): Promise<BaseCountryData | null> => {
  try {
    const response = await axios.get<CountryApiResponse[]>(
      `${BASE_URL}${country}?fullText=true`,
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('No data found for the specified country.');
    }

    const { name, flags, population, capital } = response.data[0];

    return {
      name: name.common,
      flag: flags.png || flags.jpg || '',
      population: population ?? 0,
      capital: capital?.[0] ?? 'N/A',
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
