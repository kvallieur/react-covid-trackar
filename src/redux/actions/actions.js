export const CHANGE_COUNTRY_CODE = "CHANGE_COUNTRY_CODE";

export function changeCountryCode(countryCode) {
    return {type : CHANGE_COUNTRY_CODE, countryCode: countryCode};
}

export const CHANGE_COUNTRY_INFO = "CHANGE_COUNTRY_INFO";

export function changeCountryInfo(countryInfo) {
    return {type : CHANGE_COUNTRY_INFO, countryInfo : countryInfo}
}