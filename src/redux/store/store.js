import { createStore } from "redux";
import reducers from "../reducers/reducers";

let initialState = {
  countryCode: "worldwide"
};

export default createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
