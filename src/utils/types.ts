export type TotalStatistics = {
  updated_at: string;
  date: string;
  deaths: number;
  confirmed: number;
  recovered: number;
  active: number;
  new_confirmed: number;
  new_recovered: number;
  new_deaths: number;
};

export type CountryStatistics = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  code: string;
  population: number;
  updated_at: string;
  today: {
    deaths: number;
    confirmed: number;
  };
  latest_data: {
    deaths: number;
    confirmed: number;
    recovered: number;
    critical: number;
    calculated: {
      death_rate: number;
      recovery_rate: number;
      recovered_vs_death_ratio: number | null;
      cases_per_million_population: number;
    };
  };
};

export type CountriesNames = {
  name: string;
  code: string;
};
