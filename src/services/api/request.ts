import axios from "axios";

export const requestInstance = axios.create({
  // baseURL: "http://data.fixer.io/api/",
  baseURL: "https://api.exchangerate.host/",
  params: {
    // access_key: "cdce3b38c10ceb3fa5fdf188221099c3",
    places: 2,
  },
});

export default requestInstance;
