import React,{useEffect, useState} from 'react';

import axios from "axios";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

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

  const filterCitiesFrom = (inputValue) => {
    return modifyCitiesFromObj.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsFrom = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterCitiesFrom(inputValue));
    }, 1000);
  };

  const filterCitiesTo = (inputValue) => {
    return modifyCitiesToObj.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsTo = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterCitiesTo(inputValue));
    }, 1000);
  };

  const getCitiesFrom = async () => {
    if (optionCountryFromValue.value) {
      const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${optionCountryFromValue.value}`)
      setAllCitiesFrom([...cities.data])
    }
  }

  const getCitiesTo = async () => {
    if (optionCountryToValue.value) {
      const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${optionCountryToValue.value}`)
      setAllCitiesTo([...cities.data])
    }
  }

  const selectedCityIdFromHandler = (newValue) => {
      setOptionCityFromValue(newValue)
      setIdFrom(newValue.id)
      return newValue
  }

  const selectedCityIdToHandler = (newValue) => {
    setOptionCityToValue(newValue)
    setIdTo(newValue.id)
    return newValue
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
  }, [optionCountryFromValue.value || optionCountryToValue.value])


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
            <AsyncSelect
              loadOptions={loadOptionsFrom}
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
            <AsyncSelect
                loadOptions={loadOptionsTo}
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