import { coldCountries } from "@/pages/countries/utils/coldCountries";
import { fetchColdCountryData } from "@/pages/countries/api/countriesApi/countriesApi";
import { fetchCapitalCityPhoto } from "@/pages/countries/api/unsplashApi/unsplashApi";

export async function countriesLoader() {
  const dataPromises = coldCountries.map(async (country) => {
    const countryData = await fetchColdCountryData(country);
    if (countryData) {
      const photoUrl = await fetchCapitalCityPhoto(countryData.capital);
      return { ...countryData, photo: photoUrl };
    }
    return null;
  });

  const results = await Promise.all(dataPromises);

  return results.filter((data) => data !== null);
}
