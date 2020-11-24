import countryCodeReducer from './countryCodeReducer';
import { combineReducers } from "redux";
import countryInfoReducer from './countryInfoReducer';


const reducers = combineReducers({
    countryCode: countryCodeReducer,
    countryInfo: countryInfoReducer

})

export default reducers;