import { BaseCountryData } from '@/api/types';

export type State = {
  countries: BaseCountryData[];
};

type Action =
  | { type: 'country/liked'; payload: { id: string } }
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

    default:
      return state;
  }
};
