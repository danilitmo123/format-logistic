import React, {useEffect, useRef, useState} from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import {customTheme} from "../../../templates/templatesOfOptions";
import {
    getCountries,
    getCities,
    createModifyCountries,
    createModifyCities
} from "../../../templates/templateGetCountryAndCity";

import './CountryForm.scss'
import {PlaceType} from "../../../constants/unit";

const filterCandidate = (candidate, inputValue) => {
    let alias = candidate.data ? candidate.data.alias: candidate.alias
    if (alias)
        return candidate.label.toLowerCase().startsWith(inputValue.toLowerCase()) || alias.toLowerCase().startsWith(inputValue.toLowerCase())
    else
        return candidate.label.toLowerCase().startsWith(inputValue.toLowerCase())
}

const filterOptions = (candidate, input) => {
    if (input) {
        return filterCandidate(candidate, input)
    }
    return true;
};

const CountryForm = ({
                         setIdFrom,
                         setIdTo,
                         cityWarningTo,
                         cityWarningFrom,
                         sourceType,
                         destinationType,
                         setDestinationType,
                         setSourceType
                     }) => {

    const [allCountries, setAllCountries] = useState([])
    const [allCitiesFrom, setAllCitiesFrom] = useState([])
    const [allCitiesTo, setAllCitiesTo] = useState([])
    const [modifyCountryObj, setModifyCountryObj] = useState([])
    const [modifyCitiesFromObj, setModifyCitiesFromObj] = useState([])
    const [modifyCitiesToObj, setModifyCitiesToObj] = useState([])
    const [optionCountryFromValue, setOptionCountryFromValue] = useState({})
    const [optionCountryToValue, setOptionCountryToValue] = useState({})
    const [activeCityButtonTo, setActiveCityButtonTo] = useState(true)
    const [activeSeaButtonTo, setActiveSeaButtonTo] = useState(false)
    const [activeAirButtonTo, setActiveAirButtonTo] = useState(false)
    const [activeTrainButtonTo, setActiveTrainButtonTo] = useState(false)
    const [activeCityButtonFrom, setActiveCityButtonFrom] = useState(true)
    const [activeSeaButtonFrom, setActiveSeaButtonFrom] = useState(false)
    const [activeAirButtonFrom, setActiveAirButtonFrom] = useState(false)
    const [activeTrainButtonFrom, setActiveTrainButtonFrom] = useState(false)

    const prevCountryFromValue = useRef()
    const prevCountryToValue = useRef()

    const prevCountryFrom = prevCountryFromValue.current;
    const prevCountryTo = prevCountryToValue.current;

    const filterCitiesOptionsFrom = (inputValue) => {
        return modifyCitiesFromObj.filter(candidate => {
                if (inputValue)
                    return filterCandidate(candidate, inputValue)
                else
                    return false
            }
        );
    };

    const loadCitiesOptionsFrom = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCitiesOptionsFrom(inputValue));
        }, 500);
    };


    const filterCitiesOptionsTo = (inputValue) => {
        return modifyCitiesToObj.filter(candidate => {
                if (inputValue)
                    return filterCandidate(candidate, inputValue)
                else
                    return false
            }
        );
    };

    const loadCitiesOptionsTo = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCitiesOptionsTo(inputValue));
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

    const activeCityToButtonHandler = () => {
        setActiveCityButtonTo(true)
        setActiveSeaButtonTo(false)
        setActiveTrainButtonTo(false)
        setActiveAirButtonTo(false)
        setDestinationType(PlaceType.CITY)
    }

    const activeAirToButtonHandler = () => {
        setActiveCityButtonTo(false)
        setActiveSeaButtonTo(false)
        setActiveTrainButtonTo(false)
        setActiveAirButtonTo(true)
        setDestinationType(PlaceType.AIRPORT)

    }

    const activeSeaToButtonHandler = () => {
        setActiveCityButtonTo(false)
        setActiveSeaButtonTo(true)
        setActiveTrainButtonTo(false)
        setActiveAirButtonTo(false)
        setDestinationType(PlaceType.SEAPORT)

    }

    const activeTrainToButtonHandler = () => {
        setActiveCityButtonTo(false)
        setActiveSeaButtonTo(false)
        setActiveTrainButtonTo(true)
        setActiveAirButtonTo(false)
        setDestinationType(PlaceType.RAILWAY_STATION)
    }

    const activeCityFromButtonHandler = () => {
        setActiveCityButtonFrom(true)
        setActiveSeaButtonFrom(false)
        setActiveTrainButtonFrom(false)
        setActiveAirButtonFrom(false)
        setSourceType(PlaceType.CITY)
    }

    const activeAirFromButtonHandler = () => {
        setActiveCityButtonFrom(false)
        setActiveSeaButtonFrom(false)
        setActiveTrainButtonFrom(false)
        setActiveAirButtonFrom(true)
        setActiveCityButtonTo(true)
        setActiveAirButtonTo(false)
        setActiveTrainButtonTo(false)
        setActiveSeaButtonTo(false)
        setSourceType(PlaceType.AIRPORT)

    }

    const activeSeaFromButtonHandler = () => {
        setActiveCityButtonFrom(false)
        setActiveSeaButtonFrom(true)
        setActiveTrainButtonFrom(false)
        setActiveAirButtonFrom(false)
        setActiveCityButtonTo(true)
        setActiveAirButtonTo(false)
        setActiveTrainButtonTo(false)
        setActiveSeaButtonTo(false)
        setSourceType(PlaceType.SEAPORT)

    }

    const activeTrainFromButtonHandler = () => {
        setActiveCityButtonFrom(false)
        setActiveSeaButtonFrom(false)
        setActiveTrainButtonFrom(true)
        setActiveAirButtonFrom(false)
        setActiveCityButtonTo(true)
        setActiveAirButtonTo(false)
        setActiveTrainButtonTo(false)
        setActiveSeaButtonTo(false)
        setSourceType(PlaceType.RAILWAY_STATION)
    }

    useEffect(() => {
        prevCountryFromValue.current = optionCountryFromValue.value;
    }, [optionCountryFromValue.value]);

    useEffect(() => {
        prevCountryToValue.current = optionCountryToValue.value;
    }, [optionCountryToValue.value]);

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
                        theme={customTheme}
                        options={modifyCountryObj}
                        onChange={setOptionCountryFromValue}
                        noOptionsMessage={() => `Не найдено`}
                        placeholder={'Выберите страну'}
                        filterOption={filterOptions}
                    />
                </div>
                <div className={'place-select-to'}>
                    <button
                        onClick={activeCityFromButtonHandler}
                        className={activeCityButtonFrom ? 'active-city-button' : 'place-button'}>Город
                    </button>
                    <button
                        onClick={activeSeaFromButtonHandler}
                        className={activeSeaButtonFrom ? 'active-sea-button' : 'place-button'}>Морской порт
                    </button>
                    <button
                        onClick={activeAirFromButtonHandler}
                        className={activeAirButtonFrom ? 'active-air-button' : 'place-button'}>Аэропорт
                    </button>
                    <button
                        onClick={activeTrainFromButtonHandler}
                        className={activeTrainButtonFrom ? 'active-train-button' : 'place-button'}>Ж/Д станция
                    </button>
                </div>
                <div className={'city-select-from'}>
                    <label htmlFor="country">Город</label>
                    <AsyncSelect
                        classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                        theme={customTheme}
                        loadOptions={loadCitiesOptionsFrom}
                        options={modifyCitiesFromObj}
                        onChange={selectedCityIdFromHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        placeholder={'Выберите точку отправления'}
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
                        theme={customTheme}
                        options={modifyCountryObj}
                        onChange={setOptionCountryToValue}
                        noOptionsMessage={() => `Не найдено`}
                        placeholder={'Выберите страну'}
                        filterOption={filterOptions}
                    />
                </div>
                <div className={'place-select-where'}>
                    <button
                        onClick={activeCityToButtonHandler}
                        className={activeCityButtonTo ? 'active-city-button' : 'place-button'}>Город
                    </button>
                    <button
                        disabled={activeAirButtonFrom || activeTrainButtonFrom}
                        onClick={activeSeaToButtonHandler}
                        className={activeSeaButtonTo ? 'active-sea-button' : 'place-button'}>Морской порт
                    </button>
                    <button
                        disabled={activeSeaButtonFrom || activeTrainButtonFrom}
                        onClick={activeAirToButtonHandler}
                        className={activeAirButtonTo ? 'active-air-button' : 'place-button'}>Аэропорт
                    </button>
                    <button
                        disabled={activeSeaButtonFrom || activeAirButtonFrom}
                        value={'Ж/Д станция'}
                        onClick={activeTrainToButtonHandler}
                        className={activeTrainButtonTo ? 'active-train-button' : 'place-button'}>Ж/Д станция
                    </button>
                </div>
                <div className={'city-select-where'}>
                    <label htmlFor="country">Город</label>
                    <AsyncSelect
                        classNamePrefix={cityWarningTo ? 'react-select' : ''}
                        theme={customTheme}
                        loadOptions={loadCitiesOptionsTo}
                        options={modifyCitiesToObj}
                        onChange={selectedCityIdToHandler}
                        noOptionsMessage={() => 'Не найдено'}
                        placeholder={'Выберите точку прибытия'}
                        filterOption={filterOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default CountryForm;