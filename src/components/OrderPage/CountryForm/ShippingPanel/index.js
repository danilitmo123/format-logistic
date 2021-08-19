import React from 'react';

import PlaceSelectPanel from "./PlaceSwitcherPanel";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import {PlaceType} from "../../../../constants/unit";
import {customTheme} from "../../../../templates/templatesOfOptions";

const ShippingPanel  = ({countryOptions, countryHandler, type, cityOptions, setCityId, loadCities, cityValue, handleSwitcher}) => {

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
      // setCountryWarning(false)
      return filterCandidate(candidate, input)
    }
    return true;
  };

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

  console.log(type)

  return (
      <div className={'from-form-wrapper'} >
        <div className={'from-form-title-wrapper'}>
          <div className={'from-form-title'}>Забрать груз</div>
          <div className={'from-form-text'}>Пункт отправления</div>
        </div>
        <div className={'country-select-from'}>
          <label htmlFor="country">Страна</label>
          <Select
              // classNamePrefix={countryWarning ? 'react-select' : ''}
              theme={customTheme}
              options={countryOptions}
              onChange={countryHandler}
              noOptionsMessage={() => `Не найдено`}
              placeholder={'Выберите страну'}
              filterOption={filterOptions}
          />
        </div>
        {/*{countryWarning ? <div className={'warning-country-text'}>Названия стран должны отличаться</div> : ''}*/}
        {/*{chooseRussiaWarning ? <div className={'warning-country-text'}>Точка отправки/доставки обязательно должен быть регион России</div>: ''}*/}
        <PlaceSelectPanel type={type} handleSwitcher={handleSwitcher}/>
         {
          type === PlaceType.CITY ?
              <div className={'city-select-from'}>
                <label htmlFor="country">{placeHolderFromType(type)}</label>
                <AsyncSelect
                    // classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                    theme={customTheme}
                    loadOptions={loadCities}
                    options={cityOptions}
                    onChange={setCityId}
                    noOptionsMessage={() => 'Не найдено'}
                    placeholder={placeHolderFromType(type)}
                    filterOption={filterOptions}
                />
              </div>
              :
              <div className={'city-select-from'}>
                <label htmlFor="country">{placeHolderFromType(type)}</label>
                <Select
                    // classNamePrefix={cityWarningFrom ? 'react-select' : ''}
                    theme={customTheme}
                    value={cityValue}
                    options={cityOptions}
                    onChange={setCityId}
                    noOptionsMessage={() => 'Не найдено'}
                    placeholder={placeHolderFromType(type)}
                    filterOption={filterOptions}
                />
              </div>
        }
        <div className={'prompt-block'}>* рекомендуем вводить названия городов на английском языке</div>
      </div>
  );
};

export default ShippingPanel ;