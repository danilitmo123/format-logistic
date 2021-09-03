import React, {useEffect, useState} from 'react';

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
import ErrorMessage from "../../Common/ErrorMessage";

const placeHolderFromType = type => {
  switch (type) {
    case PlaceType.CITY:
      return 'Введите город / населенный пункт'
    case PlaceType.AIRPORT:
      return 'Выбрать аэропорт'
    case PlaceType.SEAPORT:
      return 'Выбрать морской порт'
    case PlaceType.RAILWAY_STATION:
      return 'Выбрать станцию'
    case PlaceType.WAREHOUSE:
      return 'Выбрать склад'
  }
}

const CountryForm = ({
                       setCityWarningFrom,
                       setCityWarningTo,
                       setIdFrom,
                       setIdTo,
                       cityWarningTo,
                       cityWarningFrom,
                       sourceType,
                       destinationType,
                       setDestinationType,
                       setSourceType,
                       setChooseRussiaWarning,
                       chooseRussiaWarning
                     }) => {

  const [allCountries, setAllCountries] = useState([])
  const [allCitiesFrom, setAllCitiesFrom] = useState([])
  const [allCitiesTo, setAllCitiesTo] = useState([])
  const [modifyCountryObj, setModifyCountryObj] = useState([])
  const [modifyCitiesFromObj, setModifyCitiesFromObj] = useState([])
  const [modifyCitiesToObj, setModifyCitiesToObj] = useState([])
  const [optionCountryFromValue, setOptionCountryFromValue] = useState({})
  const [optionCountryToValue, setOptionCountryToValue] = useState({})
  const [countryWarning, setCountryWarning] = useState(false)
  const [optionCityFrom, setOptionCityFrom] = useState(null)
  const [optionCityTo, setOptionCityTo] = useState(null)

  const handleDestSwitcher = value => {
    setIdTo(null)
    setOptionCityTo(null)
    if (sourceType === PlaceType.CITY || sourceType === value || value === PlaceType.CITY) {
      setDestinationType(value)
    }
  }

  const handleSourceSwitcher = value => {
    setSourceType(value)
    setIdFrom(null)
    setOptionCityFrom(null)
    setOptionCityTo(null)
    if (destinationType !== value && destinationType !== PlaceType.CITY) {
      setDestinationType(value)
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
      setCountryWarning(false)
      return filterCandidate(candidate, input)
    }
    return true;
  };

  const filterCitiesOptions = (inputValue, modifyObject) => {
    return modifyObject.filter(candidate => {
          if (inputValue) {
            return filterCandidate(candidate, inputValue)
          } else {
            return false
          }
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
    setOptionCityFrom(newValue)
    setIdFrom(newValue.id)
    setCityWarningFrom(false)
    return newValue
  }

  const selectedCityIdToHandler = (newValue) => {
    setOptionCityTo(newValue)
    setIdTo(newValue.id)
    setCityWarningTo(false)
    return newValue
  }

  const setCountryFromOption = (newValue) => {
    if (optionCountryFromValue.value !== newValue.value) {
      setOptionCityFrom(null)
    }
    setOptionCountryFromValue(newValue)
  }

  const setCountryToOption = (newValue) => {
    if (optionCountryToValue.value !== newValue.value) {
      setOptionCityTo(null)
    }
    setOptionCountryToValue(newValue)
  }

  useEffect(() => {
    if ((optionCountryFromValue.value && optionCountryToValue.value)
        && (optionCountryFromValue.value === optionCountryToValue.value)) {
      setCountryWarning(true)
    } else {
      setCountryWarning(false)
    }
    if (optionCountryFromValue.value && optionCountryToValue.value) {
      if ((optionCountryFromValue.value !== `Russia`
              && optionCountryToValue.value === `Russia`) ||
          (optionCountryFromValue.value === `Russia`
              && optionCountryToValue.value !== `Russia`)) {
        setChooseRussiaWarning(false)
      } else {
        setChooseRussiaWarning(true)
      }
      if (optionCountryFromValue.value === 'Russia'
          && optionCountryToValue.value === 'Russia') {
        setChooseRussiaWarning(false)
      }
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
      getCities(optionCountryFromValue, setAllCitiesFrom, sourceType, 's')
  }, [optionCountryFromValue.value, sourceType])

  useEffect(() => {
    if (optionCountryToValue.value)
      getCities(optionCountryToValue, setAllCitiesTo, destinationType, 'd')
  }, [optionCountryToValue.value, destinationType])

  return (
      <div className={'choose-tiles-wrapper'}>
        <div className={'choose-tile'}>
          <div className={'tile-title-wrapper'}>
            <div className={'title'}>Забрать груз</div>
            <div className={'text'}>Пункт отправления</div>
          </div>
          <div className={'country-select'}>
            <label className={'select-title'}>Страна</label>
            <div className={'select'}>
              <Select
                  classNamePrefix={countryWarning ? 'react-select' : ''}
                  theme={customTheme}
                  options={modifyCountryObj}
                  onChange={setCountryFromOption}
                  noOptionsMessage={() => `Не найдено`}
                  loadingMessage={() => 'Поиск...'}
                  placeholder={'Выберите страну'}
                  filterOption={filterOptions}
              />
            </div>
          </div>
          {countryWarning && <ErrorMessage text={'Названия стран должны отличаться'} />}
          {chooseRussiaWarning && <ErrorMessage text={'Точка отправки/доставки обязательно должен быть регион'} />}
          <div className={'place-switcher'}>
            <div className={'place-switcher-title'}>Точка отправления</div>
            <div className={'switcher-buttons'}>
              <button
                  onClick={() => handleSourceSwitcher(PlaceType.CITY)}
                  className={sourceType === PlaceType.CITY ? 'active-place-button' : 'place-button'}>Город
              </button>
              <button
                  onClick={() => handleSourceSwitcher(PlaceType.WAREHOUSE)}
                  className={sourceType === PlaceType.WAREHOUSE ? 'active-place-button' : 'place-button'}>Наш
                склад
              </button>
              <button
                  onClick={() => handleSourceSwitcher(PlaceType.AIRPORT)}
                  className={sourceType === PlaceType.AIRPORT ? 'active-place-button' : 'place-button'}>Аэропорт
              </button>
              <button
                  onClick={() => handleSourceSwitcher(PlaceType.RAILWAY_STATION)}
                  className={sourceType === PlaceType.RAILWAY_STATION ? 'active-place-button' : 'place-button'}>Ж/Д
              </button>
              <button
                  onClick={() => handleSourceSwitcher(PlaceType.SEAPORT)}
                  className={sourceType === PlaceType.SEAPORT ? 'active-place-button' : 'place-button'}>Порт
              </button>
            </div>
          </div>
          <div className={'city-select'}>
            <label className={'select-title'}>{placeHolderFromType(sourceType)}</label>
            {
              sourceType === PlaceType.CITY ?
                  <div className={'select'}>
                    <AsyncSelect
                        value={optionCityFrom}
                        classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                        theme={customTheme}
                        loadOptions={loadCitiesOptionsFrom}
                        options={modifyCitiesFromObj}
                        onChange={selectedCityIdFromHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        loadingMessage={() => 'Поиск...'}
                        placeholder={placeHolderFromType(sourceType)}
                        filterOption={filterOptions}
                    />
                  </div>
                  :
                  <div className={'select'}>
                    <Select
                        value={optionCityFrom}
                        classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                        theme={customTheme}
                        options={modifyCitiesFromObj}
                        onChange={selectedCityIdFromHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        loadingMessage={() => 'Поиск...'}
                        placeholder={placeHolderFromType(sourceType)}
                        filterOption={filterOptions}
                    />
                  </div>
            }
          </div>
          <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
        </div>
        <div className={'choose-tile'}>
          <div className={'tile-title-wrapper'}>
            <div className={'title'}>Доставить до</div>
            <div className={'text'}>Пункт назначения</div>
          </div>
          <div className={'country-select'}>
            <label className={'select-title'}>Страна</label>
            <div className={'select'}>
              <Select
                  classNamePrefix={countryWarning ? 'react-select' : ''}
                  theme={customTheme}
                  options={modifyCountryObj}
                  onChange={setCountryToOption}
                  noOptionsMessage={() => `Не найдено`}
                  loadingMessage={() => 'Поиск...'}
                  placeholder={'Выберите страну'}
                  filterOption={filterOptions}
              />
            </div>
          </div>
          {countryWarning && <ErrorMessage text={'Названия стран должны отличаться'}/>}
          {chooseRussiaWarning && <ErrorMessage text={'Точка отправки/доставки обязательно должен быть регион России'}/>}
          <div className={'place-switcher'}>
            <div className={'place-switcher-title'}>Точка доставки</div>
            <div className={'switcher-buttons'}>
              <button
                  onClick={() => handleDestSwitcher(PlaceType.CITY)}
                  className={destinationType === PlaceType.CITY ? 'active-place-button' : 'place-button'}>Город
              </button>
              <button
                  disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.WAREHOUSE)}
                  onClick={() => handleDestSwitcher(PlaceType.WAREHOUSE)}
                  className={destinationType === PlaceType.WAREHOUSE ? 'active-place-button' : 'place-button'}>Наш
                склад
              </button>
              <button
                  disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.AIRPORT)}
                  onClick={() => handleDestSwitcher(PlaceType.AIRPORT)}
                  className={destinationType === PlaceType.AIRPORT ? 'active-air-button' : 'place-button'}>Аэропорт
              </button>
              <button
                  disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.RAILWAY_STATION)}
                  onClick={() => handleDestSwitcher(PlaceType.RAILWAY_STATION)}
                  className={destinationType === PlaceType.RAILWAY_STATION ? 'active-train-button' : 'place-button'}>Ж/Д
              </button>
              <button
                  disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.SEAPORT)}
                  onClick={() => handleDestSwitcher(PlaceType.SEAPORT)}
                  className={destinationType === PlaceType.SEAPORT ? 'active-sea-button' : 'place-button'}>Порт
              </button>
            </div>
          </div>
          <div className={'city-select'}>
            <label className={'select-title'}>{placeHolderFromType(destinationType)}</label>
            {
              destinationType === PlaceType.CITY ?
                  <div className={'select'}>
                    <AsyncSelect
                        classNamePrefix={cityWarningTo ? 'react-select' : ''}
                        theme={customTheme}
                        value={optionCityTo}
                        loadOptions={loadCitiesOptionsTo}
                        options={modifyCitiesToObj}
                        onChange={selectedCityIdToHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        loadingMessage={() => 'Поиск...'}
                        placeholder={placeHolderFromType(destinationType)}
                        filterOption={filterOptions}
                    />
                  </div>
                  :
                  <div className={'select'}>
                    <Select
                        classNamePrefix={cityWarningTo ? 'react-select' : ''}
                        theme={customTheme}
                        options={modifyCitiesToObj}
                        value={optionCityTo}
                        onChange={selectedCityIdToHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        loadingMessage={() => 'Поиск...'}
                        placeholder={placeHolderFromType(destinationType)}
                        filterOption={filterOptions}
                    />
                  </div>
            }
          </div>
          <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
        </div>
      </div>
  );
};

export default CountryForm;