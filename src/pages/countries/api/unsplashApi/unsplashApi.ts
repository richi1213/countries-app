import axios from "axios";

const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchCapitalCityPhoto = async (
  capital: string
): Promise<string | null> => {
  try {
    const response = await axios.get(UNSPLASH_BASE_URL, {
      params: {
        query: capital,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching photo for ${capital}:`, error);
    return null;
  }
};
