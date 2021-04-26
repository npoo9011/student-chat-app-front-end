import axios from "axios";

 export const BASE_URL = "http://localhost:4000/";

export default function axiosClient() {
  let defaultOptions = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  //Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    // const token = localStorage.getItem("token");
    // config.headers.Authorization = token;
    config.headers.common = {
      "Authorization":"Bearer"+ ' '+ `${localStorage.getItem("Chattoken")}`,
    };
    return config;
  });

  return instance;
}
