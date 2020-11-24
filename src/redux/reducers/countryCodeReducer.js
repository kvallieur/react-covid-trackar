import { CHANGE_COUNTRY_CODE } from "../actions/actions";

function countryCodeReducer(countryCode = "worldwide", action) {
    switch (action.type) {
        case CHANGE_COUNTRY_CODE:
            return action.countryCode

        default:
            return countryCode;
    }
}

export default countryCodeReducer;