import axios from "axios";

export const getStatistics = () => {
  return axios.get(`https://corona-api.com/timeline`);
};

export const getCountryStatistics = (countryCode: string) => {
  return axios.get(
    `https://corona-api.com/countries/${countryCode.toLowerCase()}`
  );
};

export const getAllCountries = () => {
  return axios.get(`https://corona-api.com/countries`);
};
