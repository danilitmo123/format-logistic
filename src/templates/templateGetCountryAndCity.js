import axios from "axios";

export const getCountries = (setAllCountries) => {
  axios.get('https://ancient-temple-39835.herokuapp.com/geo/countries/')
      .then(res => {setAllCountries([...res.data])})
}

export const getCitiesFrom = (prevCountryFrom, optionCountryFromValue, setAllCitiesFrom) => {
  if (prevCountryFrom !== optionCountryFromValue.value) {
    axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/short?country=${optionCountryFromValue.value}`)
        .then(res => {setAllCitiesFrom([...res.data])})
  }
}

export const getCitiesTo = (prevCountryTo, optionCountryToValue, setAllCitiesTo) => {
  if (prevCountryTo !== optionCountryToValue.value) {
    axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/short?country=${optionCountryToValue.value}`)
        .then(res => {setAllCitiesTo([...res.data])})
  }
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

