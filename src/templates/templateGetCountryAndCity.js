import axios from "axios";
import {GEO_SERVER_URL} from "../constants/URL";

export const getCountries = (setAllCountries) => {
    axios.get(`${GEO_SERVER_URL}countries/`)
        .then(res => {
            setAllCountries([...res.data])
        })
}

export const getCitiesFrom = (prevCountryFrom, optionCountryFromValue, setAllCitiesFrom, sourceType) => {
    axios.get(`${GEO_SERVER_URL}cities/short?country=${optionCountryFromValue.value}&type=${sourceType}`)
        .then(res => {
            setAllCitiesFrom([...res.data])
        })

}

export const getCitiesTo = (prevCountryTo, optionCountryToValue, setAllCitiesTo, destinationType) => {
    axios.get(`${GEO_SERVER_URL}cities/short?country=${optionCountryToValue.value}&type=${destinationType}`)
        .then(res => {
            setAllCitiesTo([...res.data])
        })

}

export const createModifyCountryObj = (allCountries, setModifyCountryObj) => {
    const countryOptions = []
    allCountries.map(item => {
        countryOptions.push({value: item.name, label: item.name})
    })
    setModifyCountryObj(countryOptions)
}

export const createModifyCitiesFromObj = (allCitiesFrom, setModifyCitiesFromObj) => {
    const citiesFromOptions = []
    allCitiesFrom.map(item => {
        citiesFromOptions.push({value: item.name, label: item.name, id: item.id})
    })
    setModifyCitiesFromObj(citiesFromOptions)
}

export const createModifyCitiesToObj = (allCitiesTo, setModifyCitiesToObj) => {
    const citiesToOptions = []
    allCitiesTo.map(item => {
        citiesToOptions.push({value: item.name, label: item.name, id: item.id})
    })
    setModifyCitiesToObj(citiesToOptions)
}

