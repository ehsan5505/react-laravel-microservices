const dev = {
  BASE_URL: "http://localhost:8005/api/admin",
  USER_URL: "http://localhost:8001/api"
};

const prod = {
  CHECKOUT_URL: "",
  BASE_URL: "",
  USER_URL: ""
};

const constant = process.env.NODE_ENV === "development" ? dev : prod;

export default constant;
