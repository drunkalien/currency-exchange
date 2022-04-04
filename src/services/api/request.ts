import axios from "axios";

export const requestInstance = axios.create({
  baseURL: "https://api.exchangerate.host/",
  params: {
    places: 2,
  },
});

export default requestInstance;
