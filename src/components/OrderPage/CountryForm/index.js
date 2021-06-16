import React,{useEffect, useState} from 'react';

import axios from "axios";

import './CountryForm.scss'

const CountryForm = ({setIdFrom, setIdTo, cityWarningTo, setWarningTo, cityWarningFrom, setWarningFrom}) => {

  const [allCountries, setAllCountries] = useState([])
  const [allCitiesFrom, setAllCitiesFrom] = useState([])
  const [allCitiesTo, setAllCitiesTo] = useState([])
  const [selectedCountryFrom, setSelectedCountryFrom] = useState('')
  const [selectedCountryTo, setSelectedCountryTo] = useState('')



  const getCountries = async () => {
    const countries = await axios.get('https://ancient-temple-39835.herokuapp.com/geo/countries/')
    setAllCountries([...countries.data])
  }

    const getCitiesFrom = async () => {
      if (selectedCountryFrom !== '') {
        const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${selectedCountryFrom}`)
        setAllCitiesFrom([...cities.data])
      }
    }

    const getCitiesTo = async () => {
      if (selectedCountryTo !== '') {
        const cities = await axios.get(`https://ancient-temple-39835.herokuapp.com/geo/cities/?country=${selectedCountryTo}`)
        setAllCitiesTo([...cities.data])
      }
    }

    const selectedCountryFromHandler = (e) => {
      setSelectedCountryFrom(e.target.value)
    }

    const selectedCountryToHandler = (e) => {
      setSelectedCountryTo(e.target.value)
    }

    const selectedCityIdFromHandler = (e) => {
    if(e.target.value !== '') {
      setWarningFrom(true)
    }
      setIdFrom(allCitiesFrom[e.target.value].id)
    }

    const selectedCityIdToHandler = (e) => {
      if(e.target.value !== '') {
        setWarningTo(true)
      }
      setIdTo(allCitiesTo[e.target.value].id)
    }

    useEffect(() => {
      getCountries()
    }, [])

    useEffect(() => {
      getCitiesFrom()
      getCitiesTo()
    }, [selectedCountryFrom, selectedCountryTo])

    return (
        <div className={'country-form-wrapper'}>
          <div className={'from-form-wrapper'}>
            <div className={'from-form-title-wrapper'}>
              <div className={'from-form-title'}>Забрать груз</div>
              <div className={'from-form-text'}>Пункт отправления</div>
            </div>
            <div className={'country-select-from'}>
              <label htmlFor="country">Страна</label>
              <select name="country-select" id="country" onChange={selectedCountryFromHandler}>
                {allCountries.map(item => (
                    <option value={item.name} key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className={'city-select-from'}>
              <label htmlFor="country">Город</label>
              <select className={!cityWarningFrom ? 'warning-border' : 'select'} name="country-select" id="country" onChange={selectedCityIdFromHandler}>
                {allCitiesFrom.map((item, index) => (
                    <option value={index} key={item.id}>{item.name}</option>
                ))}
              </select>
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
              <select name="country-select" id="country" onChange={selectedCountryToHandler}>
                {allCountries.map(item => (
                    <option value={item.name} key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className={'city-select-where'}>
              <label htmlFor="country">Город</label>
              <select className={!cityWarningTo ? 'warning-border' : 'select'} name="country-select" id="country" onChange={selectedCityIdToHandler}>
                {allCitiesTo.map((item, index) => (
                    <option value={index} key={item.id}>{item.name}</option>
                ))}
              </select>
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