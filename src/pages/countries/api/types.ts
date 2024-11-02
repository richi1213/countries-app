export type CountryApiResponse = {
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
};

export type BaseCountryData = {
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
};

export type BaseCountryDataDetails = {
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
