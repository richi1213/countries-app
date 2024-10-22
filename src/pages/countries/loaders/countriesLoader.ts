import { coldCountries } from '@/pages/countries/utils/coldCountries';
import { fetchColdCountryData } from '@/pages/countries/api/countriesApi/countriesApi';
import { fetchCapitalCityPhoto } from '@/pages/countries/api/unsplashApi/unsplashApi';

export const countriesLoader = async () => {
  const dataPromises = coldCountries.map(async (country) => {
    try {
      const countryData = await fetchColdCountryData(country);

      if (countryData && countryData.capital) {
        const photoUrl = await fetchCapitalCityPhoto(countryData.capital);
        return { ...countryData, photo: photoUrl };
      }

      return null;
    } catch (error) {
      console.error(`Error fetching data for ${country}:`, error);
      return null;
    }
  });

  const results = await Promise.all(dataPromises);

  return results.filter((data) => data !== null);
};
