import React, {useEffect, useState} from 'react';
import {Tooltip, Button, Select, Row, Col} from "antd";
import {
  getCountries,
  getCities,
  createModifyCountries,
  createModifyCities
} from "../../../templates/templateGetCountryAndCity";

import ErrorMessage from "../../Common/ErrorMessage";

import {PlaceType} from "../../../constants/unit";

import './CountryForm.scss'

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
                       chooseRussiaWarning,
                       activeCargo
                     }) => {

  const [allCountries, setAllCountries] = useState([])
  const [allCitiesFrom, setAllCitiesFrom] = useState([])
  const [allCitiesTo, setAllCitiesTo] = useState([])
  const [modifyCountryObj, setModifyCountryObj] = useState([])
  const [modifyCitiesFromObj, setModifyCitiesFromObj] = useState([])
  const [modifyCitiesToObj, setModifyCitiesToObj] = useState([])
  const [optionCountryFromValue, setOptionCountryFromValue] = useState('')
  const [optionCountryToValue, setOptionCountryToValue] = useState('')
  const [countryWarning, setCountryWarning] = useState(false)
  const [cityFromOption, setCityFromOption] = useState(null)
  const [cityToOption, setCityToOption] = useState(null)

  const labelFromType = type => {
    switch (type) {
      case PlaceType.CITY:
        return 'Мы заберём груз из этого места / Incoterms - EXW'
      case PlaceType.AIRPORT:
        return 'Груз доставят в аэропорт отправления / Incoterms - FCA,CPT'
      case PlaceType.SEAPORT:
        if (activeCargo === 'container') {
          return 'Груз доставят в порт отправления / Inctomers - FOB'
        }
        return 'Выбрать морской порт'
      case PlaceType.RAILWAY_STATION:
        if (activeCargo === 'container') {
          return 'Груз доставят на ж/д станцию компании Format / Inctomers - FOB,FOT'
        }
        return 'Выбрать станцию'
      case PlaceType.WAREHOUSE:
        return 'Груз доставят на склад компании Format / Inctomers - FCA,CPT'
    }
  }

  const labelToType = type => {
    switch (type) {
      case PlaceType.CITY:
        return 'Доставим груз до этого места (до двери получателя)'
      case PlaceType.AIRPORT:
        return 'Доставим груз до выбранного аэропорта'
      case PlaceType.SEAPORT:
        if (activeCargo === 'container') {
          return 'Доставим груз до выбранного порта'
        }
        return 'Выбрать морской порт'
      case PlaceType.RAILWAY_STATION:
        if (activeCargo === 'container') {
          return 'Доставим груз до выбранной ж/д станции'
        }
        return 'Выбрать станцию'
      case PlaceType.WAREHOUSE:
        return 'Доставим груз на склад компании Format'
    }
  }

  const placeholderFromType = type => {
    switch (type) {
      case PlaceType.CITY:
        return 'Выберите город / населенный пункт'
      case PlaceType.AIRPORT:
        return 'Выберите аэропорт'
      case PlaceType.SEAPORT:
        return 'Выбрать морской порт'
      case PlaceType.RAILWAY_STATION:
        return 'Выбрать станцию'
      case PlaceType.WAREHOUSE:
        return 'Выберите склад'
    }
  }

  const handleDestSwitcher = value => {
    setIdTo(null)
    setDestinationType(value)
  }

  const handleSourceSwitcher = value => {
    setSourceType(value)
    setIdFrom(null)
    if (value !== cityFromOption) {
      setCityFromOption(null)
    }
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

  const selectedCityIdFromHandler = (newValue) => {
    setCityFromOption(newValue)
    setIdFrom(newValue)
    setCityWarningFrom(false)
  }

  const selectedCityIdToHandler = (newValue) => {
    setCityToOption(newValue)
    setIdTo(newValue)
    setCityWarningTo(false)
  }

  const setCountryFromOption = (newValue) => {
    setOptionCountryFromValue(newValue)
  }

  const setCountryToOption = (newValue) => {
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
    if (optionCountryFromValue)
      getCities(optionCountryFromValue, setAllCitiesFrom, sourceType, 's')
  }, [optionCountryFromValue, sourceType])

  useEffect(() => {
    if (optionCountryToValue)
      getCities(optionCountryToValue, setAllCitiesTo, destinationType, 'd')
  }, [optionCountryToValue, destinationType])

  return (
    <Row className={'choose-tiles-wrapper'}>
      <Col span={11} className={'choose-tile'}>
        <div className={'tile-title-wrapper'}>
          <div className={'title'}>Забрать груз</div>
          <div className={'text'}>Пункт отправления</div>
        </div>
        <div className={'country-select'}>
          <label className={'select-title'}>Страна</label>
          <div className={'select'}>
            <Select
              showSearch
              style={{width: '100%'}}
              placeholder={'Выберите страну'}
              onChange={setCountryFromOption}
              filterOption={(input, option) =>
                option.children.join("").toLowerCase().startsWith(input.toLowerCase())
              }
              notFoundContent={'Не найдено'}
            >
              {allCountries.map(country => (
                <Select.Option value={country.name}
                               key={country.name}>{country.name} / {country.alias_ru}</Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {countryWarning && <ErrorMessage text={'Названия стран должны отличаться'}/>}
        {chooseRussiaWarning && <ErrorMessage text={'Точка отправки/доставки обязательно должен быть регион'}/>}
        <div className={'place-switcher'}>
          <div className={'place-switcher-title'}>Точка отправления</div>
          <div className={'switcher-buttons'}>
            <Button
              onClick={() => handleSourceSwitcher(PlaceType.CITY)}
              type={sourceType === PlaceType.CITY ? 'primary' : 'default'}
              style={{borderRadius: '4px 0 0 4px', width: '20%'}}
            >Город
            </Button>
            {
              activeCargo === 'container' ?
                <>
                  <Tooltip title={'Недоступно для контейнеров'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{borderRadius: 0, width: '100%'}}
                      type={sourceType === PlaceType.WAREHOUSE ? 'primary' : 'default'}
                      disabled={activeCargo === 'container'}
                      onClick={() => handleSourceSwitcher(PlaceType.WAREHOUSE)}
                    >
                      Наш склад
                    </Button>
                  </Tooltip>
                  <Tooltip title={'Недоступно для контейнеров'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      type={sourceType === PlaceType.AIRPORT ? 'primary' : 'default'}
                      disabled={activeCargo === 'container'}
                      onClick={() => handleSourceSwitcher(PlaceType.AIRPORT)}
                      style={{borderRadius: 0, width: '100%'}}
                    >Аэропорт
                    </Button>
                  </Tooltip>
                </>
                :
                <>
                  <Button
                    style={{borderRadius: 0, width: '25%'}}
                    type={sourceType === PlaceType.WAREHOUSE ? 'primary' : 'default'}
                    disabled={activeCargo === 'container'}
                    onClick={() => handleSourceSwitcher(PlaceType.WAREHOUSE)}
                  >Наш склад
                  </Button>
                  <Button
                    style={{borderRadius: 0, width: '25%'}}
                    type={sourceType === PlaceType.AIRPORT ? 'primary' : 'default'}
                    disabled={activeCargo === 'container'}
                    onClick={() => handleSourceSwitcher(PlaceType.AIRPORT)}
                  >Аэропорт
                  </Button>
                </>
            }
            {
              activeCargo === 'box' ?
                <>
                  <Tooltip title={'Недоступно для сборных грузов'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{borderRadius: 0, width: '100%'}}
                      type={sourceType === PlaceType.AIRPORT ? 'primary' : 'default'}
                      disabled={activeCargo === 'box'}
                      onClick={() => handleSourceSwitcher(PlaceType.RAILWAY_STATION)}
                    >Ж/Д
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={'Недоступно для сборных грузов'}
                    placement={'topRight'}
                    color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{borderRadius: '0 4px 4px 0', width: '100%'}}
                      type={sourceType === PlaceType.SEAPORT ? 'primary' : 'default'}
                      disabled={activeCargo === 'box'}
                      onClick={() => handleSourceSwitcher(PlaceType.SEAPORT)}
                    >Порт
                    </Button>
                  </Tooltip>
                </>
                :
                <>
                  <Button
                    style={{borderRadius: 0, width: '15%'}}
                    type={sourceType === PlaceType.RAILWAY_STATION ? 'primary' : 'default'}
                    disabled={activeCargo === 'box'}
                    onClick={() => handleSourceSwitcher(PlaceType.RAILWAY_STATION)}
                  >Ж/Д
                  </Button>
                  <Button
                    style={{borderRadius: '0 4px 4px 0', width: '15%'}}
                    type={sourceType === PlaceType.SEAPORT ? 'primary' : 'default'}
                    disabled={activeCargo === 'box'}
                    onClick={() => handleSourceSwitcher(PlaceType.SEAPORT)}
                  >Порт
                  </Button>
                </>
            }
          </div>
        </div>
        <div className={'city-select'}>
          <label className={'select-title'}>{labelFromType(sourceType)}</label>
          <Select
            placeholder={placeholderFromType(sourceType)}
            style={{width: '100%', marginTop: '10px'}}
            showSearch
            filterOption={(input, option) =>
              option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={selectedCityIdFromHandler}
            value={cityFromOption}
            notFoundContent={'Не найдено'}
            disabled={!optionCountryFromValue}
          >
            {allCitiesFrom.map(city => (
              <Select.Option value={city.id} key={city.id}>{city.name} / {city.alias_ru}</Select.Option>
            ))}
          </Select>
        </div>
        <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
      </Col>
      <Col span={11} className={'choose-tile'}>
        <div className={'tile-title-wrapper'}>
          <div className={'title'}>Доставить до</div>
          <div className={'text'}>Пункт назначения</div>
        </div>
        <div className={'country-select'}>
          <label className={'select-title'}>Страна</label>
          <div className={'select'}>
            <Select
              showSearch
              style={{width: '100%'}}
              placeholder={'Выберите страну'}
              onChange={setCountryToOption}
              filterOption={(input, option) =>
                option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              notFoundContent={'Не найдено'}
            >
              {allCountries.map(country => (
                <Select.Option value={country.name}
                               key={country.name}>{country.name} / {country.alias_ru}</Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {countryWarning && <ErrorMessage text={'Названия стран должны отличаться'}/>}
        {chooseRussiaWarning && <ErrorMessage text={'Точка отправки/доставки обязательно должен быть регион России'}/>}
        <div className={'place-switcher'}>
          <div className={'place-switcher-title'}>Точка доставки</div>
          <div className={'switcher-buttons'}>
            <Button
              style={{width: '20%', borderRadius: '4px 0 0 4px'}}
              onClick={() => handleDestSwitcher(PlaceType.CITY)}
              type={destinationType === PlaceType.CITY ? 'primary' : 'default'}
            >Город
            </Button>
            {
              activeCargo === 'container' ?
                <>
                  <Tooltip title={'Недоступно для контейнеров'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{width: '100%', borderRadius: 0}}
                      disabled={activeCargo === 'container'}
                      onClick={() => handleDestSwitcher(PlaceType.WAREHOUSE)}
                      type={destinationType === PlaceType.WAREHOUSE ? 'primary' : 'default'}
                    >Наш склад
                    </Button>
                  </Tooltip>
                  <Tooltip title={'Недоступно для контейнеров'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{width: '100%', borderRadius: 0}}
                      disabled={activeCargo === 'container'}
                      onClick={() => handleDestSwitcher(PlaceType.AIRPORT)}
                      type={destinationType === PlaceType.AIRPORT ? 'primary' : 'default'}
                    >Аэропорт
                    </Button>
                  </Tooltip>
                </>
                :
                <>
                  <Button
                    style={{width: '25%', borderRadius: 0}}
                    disabled={activeCargo === 'container'}
                    onClick={() => handleDestSwitcher(PlaceType.WAREHOUSE)}
                    type={destinationType === PlaceType.WAREHOUSE ? 'primary' : 'default'}
                  >Наш склад
                  </Button>
                  <Button
                    style={{width: '25%', borderRadius: 0}}
                    disabled={activeCargo === 'container'}
                    onClick={() => handleDestSwitcher(PlaceType.AIRPORT)}
                    type={destinationType === PlaceType.AIRPORT ? 'primary' : 'default'}
                  >Аэропорт
                  </Button>
                </>
            }
            {
              activeCargo === 'box' ?
                <>
                  <Tooltip title={'Недоступно для сборных грузов'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{width: '100%', borderRadius: 0}}
                      disabled={activeCargo === 'box'}
                      onClick={() => handleDestSwitcher(PlaceType.RAILWAY_STATION)}
                      type={destinationType === PlaceType.RAILWAY_STATION ? 'primary' : 'default'}
                    >Ж/Д
                    </Button>
                  </Tooltip>
                  <Tooltip title={'Недоступно для сборных грузов'} placement={'topRight'} color={'rgba(0,0,0,.6)'}>
                    <Button
                      style={{width: '100%', borderRadius: '0 4px 4px 0'}}
                      disabled={activeCargo === 'box'}
                      onClick={() => handleDestSwitcher(PlaceType.SEAPORT)}
                      type={destinationType === PlaceType.SEAPORT ? 'primary' : 'default'}
                    >Порт
                    </Button>
                  </Tooltip>
                </>
                :
                <>
                  <Button
                    style={{width: '15%', borderRadius: 0}}
                    disabled={activeCargo === 'box'}
                    onClick={() => handleDestSwitcher(PlaceType.RAILWAY_STATION)}
                    type={destinationType === PlaceType.RAILWAY_STATION ? 'primary' : 'default'}
                  >Ж/Д
                  </Button>
                  <Button
                    style={{width: '15%', borderRadius: '0 4px 4px 0'}}
                    disabled={activeCargo === 'box'}
                    onClick={() => handleDestSwitcher(PlaceType.SEAPORT)}
                    type={destinationType === PlaceType.SEAPORT ? 'primary' : 'default'}
                  >Порт
                  </Button>
                </>
            }
          </div>
        </div>
        <div className={'city-select'}>
          <label className={'select-title'}>{labelToType(sourceType)}</label>
          <Select
            placeholder={placeholderFromType(destinationType)}
            style={{width: '100%', marginTop: '10px'}}
            showSearch
            filterOption={(input, option) =>
              option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={selectedCityIdToHandler}
            value={cityToOption}
            notFoundContent={'Не найдено'}
            disabled={!optionCountryToValue}
          >
            {allCitiesTo.map(city => (
              <Select.Option value={city.id} key={city.id}>{city.name} / {city.alias_ru}</Select.Option>
            ))}
          </Select>
        </div>
        <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
      </Col>
    </Row>
  );
};

export default CountryForm;
