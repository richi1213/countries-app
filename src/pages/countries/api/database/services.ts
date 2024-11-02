import axios from 'axios';
import { PostData } from '@/pages/countries/api/database/types';
import { BaseCountryData } from '@/pages/countries/api/types';

const BASE_URL = 'http://localhost:3000/countries';

export const postData = async (data: PostData): Promise<BaseCountryData> => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deleteData = async (countryName: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}?name.en=${countryName}`);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
