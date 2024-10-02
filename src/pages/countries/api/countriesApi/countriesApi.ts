import axios from "axios";

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_URL;

export type CountryData = {
  name: string;
  flag: string;
  population: number;
  capital: string;
};

export const fetchColdCountryData = async (
  country: string
): Promise<CountryData | null> => {
  try {
    const response = await axios.get(`${BASE_URL}${country}?fullText=true`);

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error("No data found for the specified country.");
    }

    const { name, flags, population, capital } = response.data[0];

    return {
      name: name.common,
      flag: flags?.png ?? "",
      population: population ?? 0,
      capital: capital?.[0] ?? "N/A",
    };
  } catch (error) {
    console.error(`Error fetching data for ${country}:`, error);
    return null;
  }
};
