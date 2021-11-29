import axios from "axios";
import {GEO_SERVER_URL} from "../constants/URL";
import {PlaceType} from "../constants/unit";

export const getCountries = (setAllCountries) => {
    axios.get(`${GEO_SERVER_URL}countries/?alias=ru`)
        .then(res => {
            setAllCountries(res.data)
        })
}

export const getCities = (countryOption, setAllCities, type, flg) => {
    if (type !== PlaceType.CITY) {
        if (flg === 's') {
            type += '_SRC'
        } else {
            type += '_DST'
        }
    }

    axios.get(`${GEO_SERVER_URL}cities/short?country=${countryOption}&type=${type}&alias=ru`)
        .then(res => {
            setAllCities(res.data)
        })
}

export const createModifyCountries = (allCountries, setModifyCountryObj) => {
    const countryOptions = []
    allCountries.map(item => {
        let al = item.alias_ru ? ` \\ ${item.alias_ru}` : ''
        let label = item.name + al
        countryOptions.push({value: item.name, label: label, alias: item.alias_ru})
    })
    setModifyCountryObj(countryOptions)
}

export const createModifyCities = (allCities, setModifyCities) => {
    const citiesFromOptions = []
    allCities.map(item => {
        let al = item.alias_ru ? ` \\ ${item.alias_ru}` : ''
        let label = item.name + al
        citiesFromOptions.push({value: item.name, label: label, id: item.id, alias: item.alias_ru})
    })
    setModifyCities(citiesFromOptions)
}


