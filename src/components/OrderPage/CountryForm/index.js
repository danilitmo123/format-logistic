import React, {useEffect, useRef, useState} from 'react';

import {customTheme} from "../../../templates/templatesOfOptions";
import {
  getCountries,
  getCities,
  createModifyCountries,
  createModifyCities
} from "../../../templates/templateGetCountryAndCity";
import {PlaceType} from "../../../constants/unit";

import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import './CountryForm.scss'

const CountryForm = ({setIdFrom, setIdTo, cityWarningTo, cityWarningFrom, sourceType, destinationType, setDestinationType, setSourceType}) => {

  const [allCountries, setAllCountries] = useState([])
  const [allCitiesFrom, setAllCitiesFrom] = useState([])
  const [allCitiesTo, setAllCitiesTo] = useState([])
  const [modifyCountryObj, setModifyCountryObj] = useState([])
  const [modifyCitiesFromObj, setModifyCitiesFromObj] = useState([])
  const [modifyCitiesToObj, setModifyCitiesToObj] = useState([])
  const [optionCountryFromValue, setOptionCountryFromValue] = useState({})
  const [optionCountryToValue, setOptionCountryToValue] = useState({})
  const [countryWarning, setCountryWarning] = useState(false)
  const [placeholderFrom, setPlaceholderFrom] = useState('Введите город/населенный пункт')
  const [placeholderTo, setPlaceholderTo] = useState('Введите город/населенный пункт')
  const [activePlaceTo, setActivePlaceTo] = useState({cityButton: true, seaButton: false, airButton: false, trainButton: false, storageButton: false})
  const [activePlaceFrom, setActivePlaceFrom] = useState({cityButton: true, seaButton: false, airButton: false, trainButton: false, storageButton: false})

  const activePlaceButtonHandler = (e) => {
    const buttonId = e.target.getAttribute('id')
    const value = e.target.textContent
    switch (value) {
      case 'Город':
        if (buttonId === 'from-place') {
          setActivePlaceFrom({cityButton: true, seaButton: false, airButton: false, trainButton: false, storageButton: false})
          setSourceType(PlaceType.CITY)
          setPlaceholderFrom('Введите город/населенный пункт')
        } else {
          setActivePlaceTo({cityButton: true, seaButton: false, airButton: false, trainButton: false, storageButton: false})
          setDestinationType(PlaceType.CITY)
          setActivePlaceTo('Введите город/населенный пункт')
        }
        break
      case 'Морской порт':
        if (buttonId === 'from-place') {
          setActivePlaceFrom({cityButton: false, seaButton: true, airButton: false, trainButton: false, storageButton: false})
          setSourceType(PlaceType.SEAPORT)
          setPlaceholderFrom('Выбрать морской порт')
        } else {
          setActivePlaceTo({cityButton: false, seaButton: true, airButton: false, trainButton: false, storageButton: false})
          setDestinationType(PlaceType.SEAPORT)
          setPlaceholderTo('Выбрать морской порт')
        }
        break
      case 'Аэропорт':
        if (buttonId === 'from-place') {
          setActivePlaceFrom({cityButton: false, seaButton: false, airButton: true, trainButton: false, storageButton: false})
          setSourceType(PlaceType.AIRPORT)
          setPlaceholderFrom('Выбрать аэропорт')
        } else {
          setActivePlaceTo({cityButton: false, seaButton: false, airButton: true, trainButton: false, storageButton: false})
          setDestinationType(PlaceType.AIRPORT)
          setPlaceholderTo('Выбрать аэропорт')
        }
        break
      case 'Ж/Д станция':
        if (buttonId === 'from-place') {
          setActivePlaceFrom({cityButton: false, seaButton: false, airButton: false, trainButton: true, storageButton: false})
          setSourceType(PlaceType.RAILWAY_STATION)
          setPlaceholderFrom('Выбрать станцию')
        } else {
          setActivePlaceTo({cityButton: false, seaButton: false, airButton: false, trainButton: true, storageButton: false})
          setDestinationType(PlaceType.RAILWAY_STATION)
          setPlaceholderTo('Выбрать станцию')
        }
        break
      case 'Наш склад':
        if (buttonId === 'from-place') {
          setActivePlaceFrom({cityButton: false, seaButton: false, airButton: false, trainButton: false, storageButton: true})
          setPlaceholderFrom('Выбрать склад')
        } else {
          setActivePlaceTo({cityButton: false, seaButton: false, airButton: false, trainButton: false, storageButton: true})
          setPlaceholderFrom('Выбрать склад')
        }
        break
      default:
        return activePlaceTo 
    }
  }

  const filterCandidate = (candidate, inputValue) => {
    let alias = candidate.data ? candidate.data.alias : candidate.alias
    if (alias)
      return candidate.label.toLowerCase().startsWith(inputValue.toLowerCase())
          || alias.toLowerCase().startsWith(inputValue.toLowerCase())
    else
      return candidate.label.toLowerCase().startsWith(inputValue.toLowerCase())
  }

  const filterOptions = (candidate, input) => {
    if (input) {
      return filterCandidate(candidate, input)
    }
    return true;
  };

  const filterCitiesOptions = (inputValue, modifyObject) => {
    return modifyObject.filter(candidate => {
          if (inputValue)
            return filterCandidate(candidate, inputValue)
          else
            return false
        }
    );
  };

  const loadCitiesOptionsFrom = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterCitiesOptions(inputValue, modifyCitiesFromObj));
    }, 500);
  };

  const loadCitiesOptionsTo = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterCitiesOptions(inputValue, modifyCitiesToObj));
    }, 500);
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
    if((optionCountryFromValue.value && optionCountryToValue.value)
        && (optionCountryFromValue.value === optionCountryToValue.value) ) {
      setCountryWarning(true)
    } else {
      setCountryWarning(false)
    }
  }, [optionCountryFromValue.value, optionCountryToValue.value])

  useEffect(() => {
    createModifyCountries(allCountries, setModifyCountryObj)
  }, [allCountries])

  useEffect(() => {
    createModifyCities(allCitiesFrom, setModifyCitiesFromObj)
  }, [allCitiesFrom])

  useEffect(() => {
    createModifyCities(allCitiesTo, setModifyCitiesToObj)
  }, [allCitiesTo])

  useEffect(() => {
    getCountries(setAllCountries)
  }, [])

  useEffect(() => {
    if (optionCountryFromValue.value)
      getCities(optionCountryFromValue, setAllCitiesFrom, sourceType)
  }, [optionCountryFromValue.value, sourceType])

  useEffect(() => {
    if (optionCountryToValue.value)
      getCities(optionCountryToValue, setAllCitiesTo, destinationType)
  }, [optionCountryToValue.value, destinationType])

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
                classNamePrefix={countryWarning ? 'react-select' : ''}
                theme={customTheme}
                options={modifyCountryObj}
                onChange={setOptionCountryFromValue}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Выберите страну'}
                filterOption={filterOptions}
            />
          </div>
          {countryWarning ? <div className={'warning-country-text'}>Названия стран должны отличаться</div> : ''}
          <div className={'place-select-to'}>
            <button
                id={'from-place'}
                onClick={activePlaceButtonHandler}
                className={activePlaceFrom.cityButton ? 'active-city-button' : 'place-button'}>Город
            </button>
            <button
                id={'from-place'}
                onClick={activePlaceButtonHandler}
                className={activePlaceFrom.seaButton ? 'active-sea-button' : 'place-button'}>Морской порт
            </button>
            <button
                id={'from-place'}
                onClick={activePlaceButtonHandler}
                className={activePlaceFrom.airButton ? 'active-air-button' : 'place-button'}>Аэропорт
            </button>
            <button
                id={'from-place'}
                onClick={activePlaceButtonHandler}
                className={activePlaceFrom.trainButton ? 'active-train-button' : 'place-button'}>Ж/Д станция
            </button>
            <button
                id={'from-place'}
                onClick={activePlaceButtonHandler}
                className={activePlaceFrom.storageButton ? 'active-storage-button' : 'place-button'}>Наш склад</button>
          </div>
          <div className={'city-select-from'}>
            <label htmlFor="country">{placeholderFrom}</label>
            <AsyncSelect
                classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                theme={customTheme}
                loadOptions={loadCitiesOptionsFrom}
                options={modifyCitiesFromObj}
                onChange={selectedCityIdFromHandler}
                noOptionsMessage={() => 'Не найдено'}
                placeholder={placeholderFrom}
                filterOption={filterOptions}
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
                classNamePrefix={countryWarning ? 'react-select' : ''}
                theme={customTheme}
                options={modifyCountryObj}
                onChange={setOptionCountryToValue}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Выберите страну'}
                filterOption={filterOptions}
            />
          </div>
          {countryWarning ? <div className={'warning-country-text'}>Названия стран должны отличаться</div> : ''}
          <div className={'place-select-where'}>
            <button
                onClick={activePlaceButtonHandler}
                className={activePlaceTo.cityButton ? 'active-city-button' : 'place-button'}>Город
            </button>
            <button
                disabled={activePlaceFrom.airButton || activePlaceFrom.trainButton}
                onClick={activePlaceButtonHandler}
                className={activePlaceTo.seaButton ? 'active-sea-button' : 'place-button'}>Морской порт
            </button>
            <button
                disabled={activePlaceFrom.seaButton || activePlaceFrom.trainButton}
                onClick={activePlaceButtonHandler}
                className={activePlaceTo.airButton ? 'active-air-button' : 'place-button'}>Аэропорт
            </button>
            <button
                disabled={activePlaceFrom.seaButton || activePlaceFrom.airButton}
                onClick={activePlaceButtonHandler}
                className={activePlaceTo.trainButton ? 'active-train-button' : 'place-button'}>Ж/Д станция
            </button>
            <button
                disabled={activePlaceFrom.airButton || activePlaceFrom.trainButton || activePlaceFrom.seaButton}
                onClick={activePlaceButtonHandler}
                className={activePlaceTo.storageButton ? 'active-storage-button' : 'place-button'}>Наш склад</button>
          </div>
          <div className={'city-select-where'}>
            <label htmlFor="country">{placeholderTo}</label>
            <AsyncSelect
                classNamePrefix={cityWarningTo ? 'react-select' : ''}
                theme={customTheme}
                loadOptions={loadCitiesOptionsTo}
                options={modifyCitiesToObj}
                onChange={selectedCityIdToHandler}
                noOptionsMessage={() => 'Не найдено'}
                placeholder={placeholderTo}
                filterOption={filterOptions}
            />
          </div>
        </div>
      </div>
  );
};

export default CountryForm;