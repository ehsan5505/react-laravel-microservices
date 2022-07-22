const dev = {
  BASE_URL: "http://192.168.22.138:8005/api/influencer",
  USER_URL: "http://192.168.22.138:8001/api/"
};

const prod = {
  CHECKOUT_URL: "",
  BASE_URL: "",
  USER_URL: ""
};

const constant = process.env.NODE_ENV === "development" ? dev : prod;

export default constant;
