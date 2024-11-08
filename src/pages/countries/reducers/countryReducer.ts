import { Lang } from '@/types';
import { BaseCountryData } from '@/pages/countries/api/types';

export type State = {
  countries: BaseCountryData[];
  isAscending: boolean;
};

type Action =
  | { type: 'country/liked'; payload: { id: string } }
  | {
      type: 'country/setSortOrderAndSort';
      payload: { isAscending: boolean; lang: Lang };
    }
  | {
      type: 'country/deleted';
      payload: { id: string };
    }
  | {
      type: 'country/added';
      payload: { country: BaseCountryData };
    }
  | {
      type: 'country/edited';
      payload: { id: string; updatedData: Partial<BaseCountryData> };
    }
  | {
      type: 'country/setInitialData';
      payload: BaseCountryData[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'country/liked': {
      const newCountries = state.countries.map((country) => {
        return country.id === action.payload.id
          ? { ...country, likes: country.likes + 1 }
          : country;
      });
      return {
        ...state,
        countries: newCountries,
      };
    }

    case 'country/setSortOrderAndSort': {
      const sortedCountries = [...state.countries].sort((a, b) =>
        action.payload.isAscending ? a.likes - b.likes : b.likes - a.likes,
      );

      return {
        ...state,
        isAscending: action.payload.isAscending,
        countries: sortedCountries,
      };
    }

    case 'country/deleted': {
      const newCountries = state.countries.filter(
        (country) => country.id !== action.payload.id,
      );

      return {
        ...state,
        countries: newCountries,
      };
    }

    case 'country/added': {
      const existingCountry = state.countries.find(
        (country) => country.id === action.payload.country.id,
      );

      if (!existingCountry) {
        return {
          ...state,
          countries: [action.payload.country, ...state.countries],
        };
      }
      return state;
    }

    case 'country/edited': {
      const newCountries = state.countries.map((country) => {
        if (country.id === action.payload.id) {
          return { ...country, ...action.payload.updatedData };
        }
        return country;
      });
      return {
        ...state,
        countries: newCountries,
      };
    }

    case 'country/setInitialData': {
      return {
        ...state,
        countries: action.payload,
      };
    }

    default:
      return state;
  }
};
