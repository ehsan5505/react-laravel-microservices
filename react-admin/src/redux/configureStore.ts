import { createStore } from "redux";
import setUserReducer from "./reduces/setUserReducers";

const configureStore = () => {
  return createStore(setUserReducer);
};

export default configureStore;
