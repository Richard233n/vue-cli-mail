import axios from "axios";

let service = axios.create({
  baseURL: "http://webapi.hanmaweilai.com",
  timeout: 3000,
});

export default service;
