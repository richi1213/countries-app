type Currency = {
  name: string;
  code: string;
  symbol: string;
};

type Language = {
  [key: string]: string;
};

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: Language;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: Language;
  currencies: Record<string, Currency>;
  timezones: string[];
  flags: {
    png: string;
    svg: string;
  };
  continents: string[];
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  borders?: string[];
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  startOfWeek: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
};
