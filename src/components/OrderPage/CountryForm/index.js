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
import Place from "react-here-map/dist/es/components/Places";

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

    const handleDestSwitcher = value => {
        if (sourceType === PlaceType.CITY || sourceType === value || value === PlaceType.CITY) {
            setDestinationType(value)
        }
    }
    const handleSourceSwitcher = value => {
        setSourceType(value)
        if (destinationType !== value && destinationType !== PlaceType.CITY){
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
        setIdFrom(newValue.id)
        setCityWarningFrom(false)
        return newValue
    }

    const selectedCityIdToHandler = (newValue) => {
        setIdTo(newValue.id)
        setCityWarningTo(false)
        return newValue
    }


    useEffect(() => {
        if ((optionCountryFromValue.value && optionCountryToValue.value)
            && (optionCountryFromValue.value === optionCountryToValue.value)) {
            setCountryWarning(true)
        } else {
            setCountryWarning(false)
        }
        if(optionCountryFromValue.value && optionCountryToValue.value) {
            if((optionCountryFromValue.value !== `Russia`
              && optionCountryToValue.value === `Russia`) ||
              (optionCountryFromValue.value === `Russia`
                && optionCountryToValue.value !== `Russia`)) {
                setChooseRussiaWarning(false)
            } else {
                setChooseRussiaWarning(true)
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
                {chooseRussiaWarning ? <div className={'warning-country-text'}>Точка отправки/доставки обязательно должен быть регион России</div>: ''}
                <div className={'place-select-to'}>
                    <button
                        onClick={() => handleSourceSwitcher(PlaceType.CITY)}
                        className={sourceType === PlaceType.CITY ? 'active-city-button' : 'place-button'}>Город
                    </button>
                    <button
                      onClick={() => handleSourceSwitcher(PlaceType.WAREHOUSE)}
                      className={sourceType === PlaceType.WAREHOUSE ? 'active-storage-button' : 'place-button'}>Наш
                        склад
                    </button>
                    <button
                        onClick={() => handleSourceSwitcher(PlaceType.AIRPORT)}
                        className={sourceType === PlaceType.AIRPORT ? 'active-air-button' : 'place-button'}>Аэропорт
                    </button>
                    <button
                        onClick={() => handleSourceSwitcher(PlaceType.RAILWAY_STATION)}
                        className={sourceType === PlaceType.RAILWAY_STATION ? 'active-train-button' : 'place-button'}>Ж/Д
                        станция
                    </button>
                    <button
                      onClick={() => handleSourceSwitcher(PlaceType.SEAPORT)}
                      className={sourceType === PlaceType.SEAPORT ? 'active-sea-button' : 'place-button'}>Морской порт
                    </button>
                </div>
                {
                    sourceType === PlaceType.CITY ?
                      <div className={'city-select-from'}>
                          <label htmlFor="country">{placeHolderFromType(sourceType)}</label>
                          <AsyncSelect
                            classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                            theme={customTheme}
                            loadOptions={loadCitiesOptionsFrom}
                            options={modifyCitiesFromObj}
                            onChange={selectedCityIdFromHandler}
                            noOptionsMessage={() => 'Не найдено'}
                            placeholder={placeHolderFromType(sourceType)}
                            filterOption={filterOptions}
                          />
                      </div>
                      :
                      <div className={'city-select-from'}>
                          <label htmlFor="country">{placeHolderFromType(sourceType)}</label>
                          <Select
                            classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                            theme={customTheme}
                            options={modifyCitiesFromObj}
                            onChange={selectedCityIdFromHandler}
                            noOptionsMessage={() => 'Не найдено'}
                            placeholder={placeHolderFromType(sourceType)}
                            filterOption={filterOptions}
                          />
                      </div>
                }
                <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
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
                {chooseRussiaWarning ? <div className={'warning-country-text'}>Точка отправки/доставки обязательно должен быть регион России</div>: ''}
              <div className={'place-select-where'}>
                    <button
                        onClick={() => handleDestSwitcher(PlaceType.CITY)}
                        className={destinationType === PlaceType.CITY ? 'active-city-button' : 'place-button'}>Город
                    </button>
                    <button
                      disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.WAREHOUSE)}
                      onClick={() => handleDestSwitcher(PlaceType.WAREHOUSE)}
                      className={destinationType === PlaceType.WAREHOUSE ? 'active-storage-button' : 'place-button'}>Наш
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
                        станция
                    </button>
                    <button
                      disabled={!(sourceType === PlaceType.CITY || sourceType === PlaceType.SEAPORT)}
                      onClick={() => handleDestSwitcher(PlaceType.SEAPORT)}
                      className={destinationType === PlaceType.SEAPORT ? 'active-sea-button' : 'place-button'}>Морской
                        порт
                    </button>
                </div>
                {
                    destinationType === PlaceType.CITY ?
                      <div className={'city-select-where'}>
                          <label htmlFor="country">{placeHolderFromType(destinationType)}</label>
                          <AsyncSelect
                            classNamePrefix={cityWarningTo ? 'react-select' : ''}
                            theme={customTheme}
                            loadOptions={loadCitiesOptionsTo}
                            options={modifyCitiesToObj}
                            onChange={selectedCityIdToHandler}
                            noOptionsMessage={() => 'Не найдено'}
                            placeholder={placeHolderFromType(destinationType)}
                            filterOption={filterOptions}
                          />
                      </div>
                      :
                      <div className={'city-select-where'}>
                          <label htmlFor="country">{placeHolderFromType(destinationType)}</label>
                          <Select
                            classNamePrefix={cityWarningTo ? 'react-select' : ''}
                            theme={customTheme}
                            options={modifyCitiesToObj}
                            onChange={selectedCityIdToHandler}
                            noOptionsMessage={() => 'Не найдено'}
                            placeholder={placeHolderFromType(destinationType)}
                            filterOption={filterOptions}
                          />
                      </div>
                }
                <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
            </div>
        </div>
    );
};

export default CountryForm;