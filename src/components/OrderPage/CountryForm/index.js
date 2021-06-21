import React,{useEffect, useState} from 'react';

import axios from "axios";
import Select from 'react-select';

import './CountryForm.scss'

const CountryForm = ({setIdFrom, setIdTo, cityWarningTo, setWarningTo, cityWarningFrom, setWarningFrom}) => {

  const [allCountries, setAllCountries] = useState([])
  const [allCitiesFrom, setAllCitiesFrom] = useState([])
  const [allCitiesTo, setAllCitiesTo] = useState([])
  const [modifyCountryObj ,setModifyCountryObj] = useState([])
  const [modifyCitiesFromObj ,setModifyCitiesFromObj] = useState([])
  const [modifyCitiesToObj ,setModifyCitiesToObj] = useState([])
  const [optionCountryFromValue, setOptionCountryFromValue] = useState({})
  const [optionCountryToValue, setOptionCountryToValue] = useState({})
  const [optionCityFromValue, setOptionCityToValue] = useState({})
  const [optionCityToValue, setOptionCityFromValue] = useState({})
  console.log(optionCountryFromValue.value)
  console.log(optionCountryToValue.value)
  console.log(allCitiesFrom)
  console.log(allCitiesTo)

  const getCountries = async () => {
    const countries = await axios.get('https://ancient-temple-39835.herokuapp.com/geo/countries/')
    setAllCountries([...countries.data])
  }

  const createModifyCountryObj = () => {
    const countryOptions = []
    allCountries.map(item => {
      countryOptions.push({value: item.name, label: item.name})
    })
    setModifyCountryObj(countryOptions)
  }

  const createModifyCitiesFromObj = () => {
    const citiesFromOptions = []
    allCitiesFrom.map(item => {
      citiesFromOptions.push({value: item.name, label: item.name, id: item.id})
    })
    setModifyCitiesFromObj(citiesFromOptions)
  }

  const createModifyCitiesToObj = () => {
    const citiesToOptions = []
    allCitiesTo.map(item => {
      citiesToOptions.push({value: item.name, label: item.name, id: item.id})
    })
    setModifyCitiesToObj(citiesToOptions)
  }

  const getCitiesFrom = async () => {
    if (optionCountryFromValue.value !== undefined) {
      console.log(1)
      const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${optionCountryFromValue.value}`)
      setAllCitiesFrom([...cities.data])
    }
  }

  const getCitiesTo = async () => {
    if (optionCountryToValue.value !== undefined) {
      console.log(2)
      const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${optionCountryToValue.value}`)
      setAllCitiesTo([...cities.data])
    }
  }

  const selectedCityIdFromHandler = (newValue) => {
      setOptionCityFromValue(newValue)
      setIdFrom(newValue.id)
  }

  const selectedCityIdToHandler = (newValue) => {
    setOptionCityToValue((newValue))
    setIdTo(newValue.id)
  }

  useEffect(() => {
    createModifyCountryObj()
  }, [allCountries])

  useEffect(() => {
    createModifyCitiesFromObj()
    createModifyCitiesToObj()
  }, [allCitiesFrom, allCitiesTo])


  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    getCitiesFrom()
    getCitiesTo()
  }, [optionCityFromValue, optionCityToValue])


  return (
      <div className={'country-form-wrapper'}>
        <div className={'from-form-wrapper'}>
          <div className={'from-form-title-wrapper'}>
            <div className={'from-form-title'}>Забрать груз</div>
            <div className={'from-form-text'}>Пункт отправления</div>
          </div>
          <div className={'country-select-from'}>
            <label htmlFor="country">Страна</label>
            <Select
                options={modifyCountryObj}
                onChange={setOptionCountryFromValue}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите страну'}
            />
          </div>
          <div className={'city-select-from'}>
            <label htmlFor="country">Город</label>
            <Select
              options={modifyCitiesFromObj}
              onChange={selectedCityIdFromHandler}
              noOptionsMessage={() => 'Не найдено 🖕'}
              placeholder={'Выберите город'}
            />
          </div>
          <div className={'place-select-from'}>
            <label htmlFor="place">Место</label>
            <select name="place-select" id="place">
              <option value="">Со склада</option>
              <option value="">Морской порт</option>
              <option value="">Аэропорт</option>
            </select>
          </div>
        </div>
        <div className={'where-form-wrapper'}>
          <div className={'where-form-title-wrapper'}>
            <div className={'where-form-title'}>Доставить до</div>
            <div className={'where-form-text'}>Пункт назначения</div>
          </div>
          <div className={'country-select-where'}>
            <label htmlFor="country">Страна</label>
            <Select
                options={modifyCountryObj}
                onChange={setOptionCountryToValue}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите страну'}
            />
          </div>
          <div className={'city-select-where'}>
            <label htmlFor="country">Город</label>
            <Select
                options={modifyCitiesToObj}
                onChange={selectedCityIdToHandler}
                noOptionsMessage={() => 'Не найдено 🖕'}
                placeholder={'Выберите город'}
            />
          </div>
          <div className={'place-select-where'}>
            <label htmlFor="place">Место</label>
            <select name="place-select" id="place">
              <option value="">Со склада</option>
              <option value="">Морской порт</option>
              <option value="">Аэропорт</option>
            </select>
          </div>
        </div>
      </div>
  );
};

export default CountryForm;