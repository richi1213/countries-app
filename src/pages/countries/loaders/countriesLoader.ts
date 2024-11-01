import { fetchColdCountryData } from '@/pages/countries/api/countriesApi/countriesApi';
import { fetchCapitalCityPhoto } from '@/pages/countries/api/unsplashApi/unsplashApi';
import { transformedCountryTranslationsMap } from '@/pages/countries/components/list/countryTranslations';

export const countriesLoader = async () => {
  const dataPromises = Array.from(transformedCountryTranslationsMap.keys()).map(
    async (countryName) => {
      try {
        const countryData = await fetchColdCountryData(countryName);

        if (countryData && countryData.capital.en) {
          const photoUrl = await fetchCapitalCityPhoto(countryData.capital.en);

          // Fetch the translations from the map
          const translations =
            transformedCountryTranslationsMap.get(countryName);

          return {
            ...countryData,
            photo: photoUrl,
            name: {
              en: translations?.en[0] || countryData.name.en, // Default to common name if not found
              ka: translations?.ka[0] || 'N/A', // Default to 'N/A' if not found
            },
            capital: {
              en: translations?.en[1] || countryData.capital,
              ka: translations?.ka[1] || 'N/A',
            },
          };
        }

        return null;
      } catch (error) {
        console.error(`Error fetching data for ${countryName}:`, error);
        return null;
      }
    },
  );

  const results = await Promise.all(dataPromises);

  console.log(JSON.stringify(results, null, 2));

  return results.filter((data) => data !== null);
};
