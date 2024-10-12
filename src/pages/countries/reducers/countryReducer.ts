import { CountryData } from "@/pages/countries/components/list/CountryList";

export type State = {
  countries: CountryData[];
  isAscending: boolean;
};

type Action =
  | { type: "country/liked"; payload: string }
  | { type: "country/setSortOrderAndSort"; payload: boolean }
  | {
      type: "country/toggleDelete";
      payload: { name: string; isDeleted: boolean };
    }
  | { type: "country/added"; payload: CountryData };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "country/liked":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.name === action.payload
            ? { ...country, likes: country.likes + 1 }
            : country
        ),
      };

    case "country/setSortOrderAndSort":
      const nonDeletedCountries = state.countries.filter(
        (country) => !country.isDeleted
      );
      const deletedCountries = state.countries.filter(
        (country) => country.isDeleted
      );

      const sortedNonDeletedCountries = [...nonDeletedCountries].sort((a, b) =>
        action.payload ? a.likes - b.likes : b.likes - a.likes
      );

      return {
        ...state,
        isAscending: action.payload,
        countries: [...sortedNonDeletedCountries, ...deletedCountries],
      };

    case "country/toggleDelete":
      return {
        ...state,
        countries: [
          ...state.countries.map((country) =>
            country.name === action.payload.name
              ? { ...country, isDeleted: action.payload.isDeleted }
              : country
          ),
        ].sort((a, b) =>
          a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1
        ),
      };

    case "country/added":
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };

    default:
      return state;
  }
};
