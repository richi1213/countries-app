import axios from 'axios';
import path from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const BASE_URL = process.env.VITE_REST_COUNTRIES_URL;
const UNSPLASH_BASE_URL = process.env.VITE_UNSPLASH_BASE_URL;
const UNSPLASH_ACCESS_KEY = process.env.VITE_UNSPLASH_ACCESS_KEY;

const writeToDatabase = async (filePath, data) => {
  try {
    const dataWithCountriesKey = { countries: data };
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(dataWithCountriesKey, null, 2),
      'utf-8',
    );
    console.log(`Data written to ${filePath} successfully.`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
};

// Fetch country data from the REST Countries API
const fetchColdCountryData = async (country) => {
  try {
    const response = await axios.get(`${BASE_URL}${country}?fullText=true`);

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('No data found for the specified country.');
    }

    const {
      name,
      flags,
      population,
      capital,
      region,
      subregion,
      area,
      languages,
      currencies,
      timezones,
      demonyms,
      borders,
      car,
      fifa,
      startOfWeek,
      maps,
    } = response.data[0];

    return {
      name: {
        en: name.common,
      },
      officialName: name.official,
      flag: flags.svg || flags.png || '',
      population,
      capital: {
        en: capital?.[0] ?? 'N/A',
      },
      region,
      subregion,
      area,
      languages: Object.values(languages),
      currencies: Object.values(currencies),
      timezones,
      demonyms: { male: demonyms.eng.m, female: demonyms.eng.f },
      borders: borders || [],
      drivingSide: car.side,
      fifaCode: fifa,
      startOfWeek,
      maps: { google: maps.googleMaps, osm: maps.openStreetMaps },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error fetching data for ${country}: ${error.response?.status}`,
      );
    } else if (error instanceof Error) {
      console.error(`Error fetching data for ${country}:`, error.message);
    } else {
      console.error(`Error fetching data for ${country}:`, error);
    }
    return null;
  }
};

// Fetch a photo of the capital city from Unsplash
const fetchCapitalCityPhoto = async (capital) => {
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

const transformedCountryTranslationsMap = new Map([
  ['Canada', { en: ['Canada', 'Ottawa'], ka: ['კანადა', 'ოტავა'] }],
  ['Iceland', { en: ['Iceland', 'Reykjavik'], ka: ['ისლანდია', 'რეიკიავიკი'] }],
  ['Greenland', { en: ['Greenland', 'Nuuk'], ka: ['გრენლანდია', 'ნუუკი'] }],
  ['Norway', { en: ['Norway', 'Oslo'], ka: ['ნორვეგია', 'ოსლო'] }],
  ['Sweden', { en: ['Sweden', 'Stockholm'], ka: ['შვედეთი', 'სტოკჰოლმი'] }],
  ['Finland', { en: ['Finland', 'Helsinki'], ka: ['ფინეთი', 'ჰელსინკი'] }],
  ['Denmark', { en: ['Denmark', 'Copenhagen'], ka: ['დანია', 'კოპენჰაგენი'] }],
  ['Russia', { en: ['Russia', 'Moscow'], ka: ['რუსეთი', 'მოსკოვი'] }],
  ['Estonia', { en: ['Estonia', 'Tallinn'], ka: ['ესტონეთი', 'ტალინი'] }],
  ['Latvia', { en: ['Latvia', 'Riga'], ka: ['ლატვია', 'რიგა'] }],
  ['Lithuania', { en: ['Lithuania', 'Vilnius'], ka: ['ლიტვა', 'ვილნიუსი'] }],
  [
    'United States',
    { en: ['United States', 'Washington, D.C.'], ka: ['აშშ', 'ვაშინგტონი'] },
  ],
  [
    'United Kingdom',
    {
      en: ['United Kingdom', 'London'],
      ka: ['გაერთიანებული სამეფო', 'ლონდონი'],
    },
  ],
  ['Switzerland', { en: ['Switzerland', 'Bern'], ka: ['შვეიცარია', 'ბერნი'] }],
  ['Austria', { en: ['Austria', 'Vienna'], ka: ['ავსტრია', 'ვენა'] }],
  ['Germany', { en: ['Germany', 'Berlin'], ka: ['გერმანია', 'ბერლინი'] }],
  ['Poland', { en: ['Poland', 'Warsaw'], ka: ['პოლონეთი', 'ვარშავა'] }],
  ['Czechia', { en: ['Czechia', 'Prague'], ka: ['ჩეხეთი', 'პრაღა'] }],
  [
    'Slovakia',
    { en: ['Slovakia', 'Bratislava'], ka: ['სლოვაკეთი', 'ბრატისლავა'] },
  ],
  ['Ukraine', { en: ['Ukraine', 'Kyiv'], ka: ['უკრაინა', 'კიევი'] }],
  ['Belarus', { en: ['Belarus', 'Minsk'], ka: ['ბელარუსი', 'მინსკი'] }],
  ['Kazakhstan', { en: ['Kazakhstan', 'Astana'], ka: ['ყაზახეთი', 'ასტანა'] }],
  [
    'Mongolia',
    { en: ['Mongolia', 'Ulaanbaatar'], ka: ['მონღოლეთი', 'ულანბატარი'] },
  ],
  ['Japan', { en: ['Japan', 'Tokyo'], ka: ['იაპონია', 'ტოკიო'] }],
  [
    'South Korea',
    { en: ['South Korea', 'Seoul'], ka: ['სამხრეთ კორეა', 'სეული'] },
  ],
  ['China', { en: ['China', 'Beijing'], ka: ['ჩინეთი', 'პეკინი'] }],
]);

// Get translation for a given country
const getTranslations = (countryName) => {
  return (
    transformedCountryTranslationsMap.get(countryName) || {
      en: ['N/A', 'N/A'],
      ka: ['N/A', 'N/A'],
    }
  );
};

// Main function to initialize and fetch all data
const countriesInit = async () => {
  const dataPromises = Array.from(transformedCountryTranslationsMap.keys()).map(
    async (countryName) => {
      const countryData = await fetchColdCountryData(countryName);
      if (!countryData || !countryData.capital.en) return null;

      const photoUrl = await fetchCapitalCityPhoto(countryData.capital.en);
      const translations = getTranslations(countryName);

      return {
        ...countryData,
        photo: photoUrl,
        name: { en: translations.en[0], ka: translations.ka[0] },
        capital: { en: translations.en[1], ka: translations.ka[1] },
      };
    },
  );

  const results = await Promise.allSettled(dataPromises);
  const filteredResults = results
    .filter((res) => res.status === 'fulfilled' && res.value)
    .map((res) => res.value);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'database.json');

  await writeToDatabase(filePath, filteredResults);
  return filteredResults;
};

// IIFE to initialize countries
(async () => {
  try {
    const countriesData = await countriesInit();
    console.log('Countries data fetched successfully:', countriesData);
  } catch (error) {
    console.error('Error initializing countries:', error);
  }
})();
