import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { Country } from "@/pages/countries/components/country-details/types";

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_URL;

export const countryDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params;

  if (!name) {
    throw new Error("Country name is required.");
  }

  const response = await axios.get<Country[]>(
    `${BASE_URL}${name}?fullText=true`
  );

  return response.data;
};
