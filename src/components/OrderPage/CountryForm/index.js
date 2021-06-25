import React, {useEffect, useRef, useState} from 'react';

import axios from "axios";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import {placeOfCargoOptions, customTheme} from "../../../templates/templatesOfOptions";
import {
  getCountries,
  getCitiesFrom,
  getCitiesTo,
  createModifyCountryObj,
  createModifyCitiesFromObj,
  createModifyCitiesToObj
} from "../../../templates/templateGetCountryAndCity";

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

  const prevCountryFromValue = useRef()
  const prevCountryToValue = useRef()

  const prevCountryFrom = prevCountryFromValue.current;
  const prevCountryTo = prevCountryToValue.current;

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

  const selectedCityIdFromHandler = (newValue) => {
    setIdFrom(newValue.id)
    return newValue
  }

  const selectedCityIdToHandler = (newValue) => {
    setIdTo(newValue.id)
    return newValue
  }

  useEffect(() => {
    prevCountryFromValue.current = optionCountryFromValue.value;
  }, [optionCountryFromValue.value]);

  useEffect(() => {
    prevCountryToValue.current = optionCountryToValue.value;
  }, [optionCountryToValue.value]);

  useEffect(() => {
    createModifyCountryObj(allCountries, setModifyCountryObj)
  }, [allCountries])

  useEffect(() => {
    createModifyCitiesFromObj(allCitiesFrom, setModifyCitiesFromObj)
  }, [allCitiesFrom])

  useEffect(() => {
    createModifyCitiesToObj(allCitiesTo, setModifyCitiesToObj)
  }, [allCitiesTo])

  useEffect(() => {
    getCountries(setAllCountries)
  }, [])

  useEffect(() => {
    getCitiesFrom(prevCountryFrom, optionCountryFromValue, setAllCitiesFrom)
  }, [optionCountryFromValue.value])

  useEffect(() => {
    getCitiesTo(prevCountryTo, optionCountryToValue, setAllCitiesTo)
  }, [optionCountryToValue.value])

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
                theme={customTheme}
                options={modifyCountryObj}
                onChange={setOptionCountryFromValue}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите страну'}
            />
          </div>
          <div className={'city-select-from'}>
            <label htmlFor="country">Город</label>
            <AsyncSelect
                theme={customTheme}
                loadOptions={loadOptionsFrom}
                options={modifyCitiesFromObj}
                onChange={selectedCityIdFromHandler}
                noOptionsMessage={() => 'Не найдено 🖕'}
                placeholder={'Выберите город'}
            />
          </div>
          <div className={'place-select-from'}>
            <label htmlFor="place">Место</label>
            <Select
                theme={customTheme}
                options={placeOfCargoOptions}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите место отправления'}
            />
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
                theme={customTheme}
                options={modifyCountryObj}
                onChange={setOptionCountryToValue}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите страну'}
            />
          </div>
          <div className={'city-select-where'}>
            <label htmlFor="country">Город</label>
            <AsyncSelect
                theme={customTheme}
                loadOptions={loadOptionsTo}
                options={modifyCitiesToObj}
                onChange={selectedCityIdToHandler}
                noOptionsMessage={() => 'Не найдено 🖕'}
                placeholder={'Выберите город'}
            />
          </div>
          <div className={'place-select-where'}>
            <label htmlFor="place">Место</label>
            <Select
                theme={customTheme}
                options={placeOfCargoOptions}
                noOptionsMessage={() => `Не найдено 🖕`}
                placeholder={'Выберите место прибытия'}
            />
          </div>
        </div>
      </div>
  );
};

export default CountryForm;