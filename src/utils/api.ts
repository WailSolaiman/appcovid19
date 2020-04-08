import axios from "axios";

export const getStatistics = () => {
  return axios.get(`https://covid-193.p.rapidapi.com/statistics`, {
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "a054f306camsh8cff6bc0c25e37ap168447jsn00438a179c9f",
    },
  });
};
