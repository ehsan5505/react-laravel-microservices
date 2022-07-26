const dev = {
  BASE_URL: "http://192.168.22.138:8004/api",
  USER_URL: "http://192.168.22.138:8001/api",
  BASE_USER: "http://192.168.22.138:8004/api",
};

const prod = {
  CHECKOUT_URL: "",
  BASE_URL: "",
  USER_URL: "",
  BASE_USER: ""
};

const constant = process.env.NODE_ENV === "development" ? dev : prod;

export default constant;
