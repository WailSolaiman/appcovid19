import axios from "axios";

export const getStatistics = () => {
  return axios.get(`https://corona-api.com/timeline`);
};

export const getCountryStatistics = (country: string) => {
  console.log("country: ", country);

  return axios.get(
    `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
    {
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "a054f306camsh8cff6bc0c25e37ap168447jsn00438a179c9f",
      },
    }
  );
};

export const getAllCountries = () => {
  return axios.get(`https://covid-193.p.rapidapi.com/countries`, {
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "a054f306camsh8cff6bc0c25e37ap168447jsn00438a179c9f",
    },
  });
};
