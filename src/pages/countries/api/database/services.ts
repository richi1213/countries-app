import axios from 'axios';
import {
  BaseCountryData,
  CountryApiResponse,
} from '@/pages/countries/api/types';

const BASE_URL = import.meta.env.VITE_COLD_COUNTRIES;

export const postData = async (
  data: Partial<CountryApiResponse>,
): Promise<BaseCountryData> => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deleteData = async (countryId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${countryId}`);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export const editData = async (
  countryId: string,
  updatedData: Partial<CountryApiResponse>,
): Promise<BaseCountryData> => {
  try {
    const response = await axios.patch(`${BASE_URL}/${countryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error editing data:', error);
    throw error;
  }
};
