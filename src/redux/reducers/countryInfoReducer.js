import { CHANGE_COUNTRY_INFO } from "../actions/actions";

function countryInfoReducer(countryInfo = null, action) {
    switch (action.type) {
        case CHANGE_COUNTRY_INFO:
            return action.countryInfo

        default:
            return countryInfo;
    }
}

export default countryInfoReducer;