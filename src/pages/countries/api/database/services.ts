import { httpClient } from '@/pages/countries/api';
import { isAxiosError } from 'axios';
import {
  BaseCountryData,
  BaseCountryDataDetails,
  CountryApiResponse,
} from '@/pages/countries/api/types';

export const getData = async (): Promise<Partial<CountryApiResponse[]>> => {
  try {
    const response = await httpClient.get('/');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Axios error getting data:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error getting data:', error);
    }
    throw error;
  }
};

export const getCountryData = async (
  country: string,
): Promise<BaseCountryDataDetails[]> => {
  try {
    const response = await httpClient.get(`?name.en=${country}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Axios error getting country data:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error getting country data:', error);
    }
    throw error;
  }
};

export const postData = async (
  data: Partial<CountryApiResponse>,
): Promise<BaseCountryData> => {
  try {
    const response = await httpClient.post('/', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Axios error posting data:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error posting data:', error);
    }
    throw error;
  }
};

export const deleteData = async (countryId: string): Promise<void> => {
  try {
    await httpClient.delete(`/${countryId}`);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Axios error deleting data:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error deleting data:', error);
    }
    throw error;
  }
};

export const editData = async ({
  countryId,
  updatedData,
}: {
  countryId: string;
  updatedData: Partial<CountryApiResponse>;
}): Promise<BaseCountryData> => {
  try {
    const response = await httpClient.patch(`/${countryId}`, updatedData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Axios error editing data:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error editing data:', error);
    }
    throw error;
  }
};
