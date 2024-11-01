import axios from 'axios';
import { convertUrlToBase64 } from '@/helpers/conversions';

type CountryApiResponse = {
  name: { common: string; official: string };
  flags: { svg: string };
  population: number;
  capital: string[];
  region: string;
  subregion: string;
  area: number;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  demonyms: Record<string, { m: string; f: string }>;
  borders?: string[];
  car: { side: string };
  fifa: string;
  startOfWeek: string;
  maps: { googleMaps: string; openStreetMaps: string };
};

export type BaseCountryData = {
  name: { en: string };
  officialName: string;
  capital: { en: string };
  population: number;
  region: string;
  subregion: string;
  area: number;
  languages: string[];
  currencies: { name: string; symbol: string }[];
  timezones: string[];
  demonyms: { male: string; female: string };
  borders?: string[];
  drivingSide: string;
  fifaCode: string;
  startOfWeek: string;
  maps: { google: string; osm: string };
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

    const {
      name,
      flags,
      population,
      capital,
      region,
      subregion,
      area,
      languages,
      currencies,
      timezones,
      demonyms,
      borders,
      car,
      fifa,
      startOfWeek,
      maps,
    } = response.data[0];

    const flagBase64 = await convertUrlToBase64(flags.svg || '');

    return {
      name: {
        en: name.common,
      },
      officialName: name.official,
      flag: flagBase64,
      population,
      capital: {
        en: capital?.[0] ?? 'N/A',
      },
      region,
      subregion,
      area,
      languages: Object.values(languages),
      currencies: Object.values(currencies),
      timezones,
      demonyms: { male: demonyms.eng.m, female: demonyms.eng.f },
      borders: borders ?? [],
      drivingSide: car.side,
      fifaCode: fifa,
      startOfWeek,
      maps: { google: maps.googleMaps, osm: maps.openStreetMaps },
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
