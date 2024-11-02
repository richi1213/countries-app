import { TransformedCountryData } from '@/pages/countries/components/list/CountryList';
import { Lang } from '@/types';

export type State = {
  countries: TransformedCountryData[];
  isAscending: boolean;
};

type Action =
  | { type: 'country/liked'; payload: { name: string; lang: Lang } }
  | {
      type: 'country/setSortOrderAndSort';
      payload: { isAscending: boolean; lang: Lang };
    }
  | {
      type: 'country/toggleDelete';
      payload: { name: string; isDeleted: boolean; lang: Lang };
    }
  | {
      type: 'country/added';
      payload: { country: TransformedCountryData; lang: Lang };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'country/liked': {
      const newCountries = state.countries.map((country) =>
        country.name[action.payload.lang] === action.payload.name
          ? { ...country, likes: country.likes + 1 }
          : country,
      );
      return {
        ...state,
        countries: newCountries,
      };
    }

    case 'country/setSortOrderAndSort': {
      const nonDeletedCountries = state.countries.filter(
        (country) => !country.isDeleted,
      );
      const deletedCountries = state.countries.filter(
        (country) => country.isDeleted,
      );

      const sortedNonDeletedCountries = [...nonDeletedCountries].sort((a, b) =>
        action.payload.isAscending ? a.likes - b.likes : b.likes - a.likes,
      );

      return {
        ...state,
        isAscending: action.payload.isAscending,
        countries: [...sortedNonDeletedCountries, ...deletedCountries],
      };
    }

    case 'country/toggleDelete': {
      const newCountries = state.countries.map((country) =>
        country.name[action.payload.lang] === action.payload.name
          ? { ...country, isDeleted: action.payload.isDeleted }
          : country,
      );

      return {
        ...state,
        countries: newCountries.sort((a, b) =>
          a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1,
        ),
      };
    }

    case 'country/added': {
      return {
        ...state,
        countries: [action.payload.country, ...state.countries],
      };
    }

    default:
      return state;
  }
};
