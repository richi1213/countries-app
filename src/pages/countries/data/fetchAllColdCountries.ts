// import axios from 'axios';
// import { coldCountries } from '@/pages/countries/utils/coldCountries';

// const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_URL;

// export const fetchAllColdCountriesData = async () => {
//   try {
//     const countryNames = coldCountries
//       .map((country) => encodeURIComponent(country))
//       .join(',');
//     const response = await axios.get(`${BASE_URL}${countryNames}`);

//     // Log in JSON format
//     console.log(JSON.stringify(response.data, null, 2));

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cold countries data:', error);
//     return null;
//   }
// };
