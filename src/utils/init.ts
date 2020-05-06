export const worldwideDataInitial = {
  updated_at: "",
  date: "",
  deaths: 0,
  confirmed: 0,
  recovered: 0,
  active: 0,
  new_confirmed: 0,
  new_recovered: 0,
  new_deaths: 0,
};

export const countriesDataInitial = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  name: "",
  code: "",
  population: 0,
  updated_at: "",
  today: {
    deaths: 0,
    confirmed: 0,
  },
  latest_data: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
    calculated: {
      death_rate: 0,
      recovery_rate: 0,
      recovered_vs_death_ratio: 0,
      cases_per_million_population: 0,
    },
  },
};

export const userDataInit = {
  uid: "",
  isAuthenticated: false,
  displayName: "",
  email: "",
};
