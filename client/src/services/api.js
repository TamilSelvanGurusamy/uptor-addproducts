import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-100-53-18-75.compute-1.amazonaws.com:5000/api"
});

export default api;
