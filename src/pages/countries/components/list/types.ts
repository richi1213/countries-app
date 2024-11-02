import { BaseCountryData } from '@/pages/countries/api/types';

export type TransformedCountryData = BaseCountryData & {
  likes: number;
  isDeleted: boolean;
};
