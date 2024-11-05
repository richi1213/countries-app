import { TransformedCountryData } from '@/pages/countries/components/list/types';
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
      type: 'country/deleted';
      payload: { name: string; lang: Lang };
    }
  | {
      type: 'country/added';
      payload: { country: TransformedCountryData };
    }
  | {
      type: 'country/edited';
      payload: { id: string; updatedData: Partial<TransformedCountryData> };
    }
  | {
      type: 'country/setInitialData';
      payload: TransformedCountryData[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'country/liked': {
      const newCountries = state.countries.map((country) => {
        const countryName = country.name?.[action.payload.lang] || '';
        return countryName === action.payload.name
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
        (country) =>
          (country.name?.[action.payload.lang] || '') !== action.payload.name,
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
