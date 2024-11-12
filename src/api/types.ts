export type CountryApiResponse = {
  id: string;
  name: {
    en: string;
    ka: string;
  };
  officialName: string;
  flag: string;
  population: number;
  capital: {
    en: string;
    ka: string;
  };
  region: string;
  subregion: string;
  area: number;
  languages: string[];
  currencies: {
    name: string;
    symbol: string;
  }[];
  timezones: string[];
  demonyms: {
    male: string;
    female: string;
  };
  borders: string[];
  drivingSide: string;
  fifaCode: string;
  startOfWeek: string;
  maps: {
    google: string;
    osm: string;
  };
  photo: string;
  likes: number;
};

export type ResponseData = {
  data: BaseCountryData[];
  currentOffset: number;
  nextOffset: number | null;
};

export type BaseCountryData = {
  id?: string;
  name: {
    en: string;
    ka: string;
  };
  flag: string;
  population: number;
  capital: {
    en: string;
    ka: string;
  };
  photo: string;
  likes: number;
};

export type BaseCountryDataDetails = {
  id?: string;
  name: {
    en: string;
    ka: string;
  };
  officialName: string;
  flag: string;
  population: number;
  capital: {
    en: string;
    ka: string;
  };
  region: string;
  subregion: string;
  area: number;
  languages: string[];
  currencies: {
    name: string;
    symbol: string;
  }[];
  timezones: string[];
  demonyms: {
    male: string;
    female: string;
  };
  borders: string[];
  drivingSide: string;
  fifaCode: string;
  startOfWeek: string;
  maps: {
    google: string;
    osm: string;
  };
};
