import { Provider } from "react-redux";

const dev = {
  CHECKOUT_URL: "http://192.168.22.138:3002/",
  BASE_URL: "http://192.168.22.138:8000/api/influencer/",
};

const prod = {
  CHECKOUT_URL: "",
  BASE_URL: "",
};

const constant = process.env.NODE_ENV === "development" ? dev : prod;

export default constant;
