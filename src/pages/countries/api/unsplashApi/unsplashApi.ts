import axios from "axios";

const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL; // Use the env variable for base URL
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Your Unsplash access key from .env

export const fetchCapitalCityPhoto = async (
  capital: string
): Promise<string | null> => {
  try {
    const response = await axios.get(UNSPLASH_BASE_URL, {
      params: {
        query: capital, // Use the capital city name as the query
        client_id: UNSPLASH_ACCESS_KEY, // Pass your access key
        per_page: 1, // Number of images to return, set to 1 for a single image
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small; // Return the URL of the first image
    }

    return null; // Return null if no images were found
  } catch (error) {
    console.error(`Error fetching photo for ${capital}:`, error);
    return null; // Return null if there's an error
  }
};
