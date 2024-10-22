import { BaseCountryData } from '@/pages/countries/api/countriesApi/countriesApi';

export type CountryData = BaseCountryData & {
  photo?: string;
  likes: number;
  isDeleted: boolean;
};

export type TranslatedCountryData = {
  name: {
    en: string;
    ka: string;
  };
  capital: {
    en: string;
    ka: string;
  };
  population: number;
  flag: string;
  photo?: string;
  likes: number;
  isDeleted: boolean;
};
