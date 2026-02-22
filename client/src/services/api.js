import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-3-108-67-162.ap-south-1.compute.amazonaws.com:5000/api"
});

export default api;
