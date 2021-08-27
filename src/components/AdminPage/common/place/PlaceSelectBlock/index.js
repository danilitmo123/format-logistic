import React, {useState, useEffect} from 'react';

import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../../templates/filterSelectTemplate";
import AsyncSelect from "react-select/async/dist/react-select.esm";
import {GEO_SERVER_URL} from "../../../../../constants/URL";
import axios from "axios";
import {usePlaceDispatcherContext} from "../placeContext";

import './PlaceSelectBlock.scss'
import {adminInstance} from "../../../../../api/admin";

const loadCountries = async () => {
    let response = await adminInstance.get(`${GEO_SERVER_URL}countries`)
    return response.data
}

const loadCities = async (countryName) => {
    let response = await adminInstance.get(`${GEO_SERVER_URL}cities?country=${countryName}`)

    return response.data
}

const optionsFromCityData = (cities) => {
    const citiesFromOptions = []
    cities.map(item => {
        citiesFromOptions.push({value: item.id, label: item.name, id: item.id})
    })
    return citiesFromOptions
}

const optionsFromCountryData = (countries) => {
    const countryOptions = []
    countries.map(item => {
        countryOptions.push({value: item.name, label: item.name})
    })
    return countryOptions
}

export const PlaceSelectBlock = ({titleCountry, titleCity, dispatchKey, setStorage, isStorage}) => {

    const [city, setCityRaw] = useState()
    const [country, setCountryRaw] = useState()
    const [activeCitySelect, setActiveCitySelect] = useState(false)
    const [cityLoaded, setCityLoaded] = useState(false)

    const [countryOptions, setCountryOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])

    const context = usePlaceDispatcherContext()

    useEffect(() => {
        loadCountries().then(countries => {
                let options = optionsFromCountryData(countries)
                setCountryOptions(options)
            }
        )
    }, [])

    const filterCities = (inputValue) => {
        return cityOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCities(inputValue));
        }, 1500);
    };

    const setCity = (city) => {
        setCityRaw(city)
        context.dispatch({type: "setCity", key: dispatchKey, city: {id: city.value, name: city.label}})
    }
    const setCountry = (country) => {
        setCountryRaw(country.value)
        setCityOptions([])
        context.dispatch({type: "setCountry", key: dispatchKey, country: country.value})
        setActiveCitySelect(true)
        loadCities(country.value).then(cities => {
                setCityOptions(optionsFromCityData(cities))
                setCityLoaded(true)
            }
        )
    }

    return (
        <div className={'from-select-wrapper'}>
            <div className={'departure-country-select'}>
                <label className={'label-departure-select'}>{titleCountry}</label>
                <Select
                    theme={customTheme}
                    onChange={setCountry}
                    options={countryOptions}
                    placeholder={'Страна'}
                    noOptionsMessage={() => `Не найдено`}
                    filterOption={createFilter(filterConfig)}
                />
            </div>
            <div className={'departure-city-select'}>
                <label className={'label-departure-select'}>{titleCity}</label>
                <AsyncSelect
                    theme={customTheme}
                    onChange={setCity}
                    options={cityOptions}
                    cacheOptions
                    loadOptions={loadOptions}
                    placeholder={'Город'}
                    noOptionsMessage={() => !cityLoaded ? `Загрузка...` : `Не найдено`}
                    filterOption={createFilter(filterConfig)}
                />
            </div>
            <div className={'check-storage'}>
                <div>Внести город в 'Наш склад'</div>
                <input type="checkbox" />
            </div>
        </div>
    )
}
