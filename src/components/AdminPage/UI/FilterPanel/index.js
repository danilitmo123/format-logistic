import React, {useState, useEffect} from 'react';
import {ShippingType} from "../../../../constants/unit";
import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";

import './FilterPanel.scss'

const labelTypeOfShipping = {
  [ShippingType.AIR]: "Авиафрахт",
  [ShippingType.TRAIN]: "Железнодородная перевозка",
  [ShippingType.TRUCK]: "Автомобильная перевозка",
  [ShippingType.SEA]: 'Морская перевозка'
}
const typeOfShippingOptions = [
  {value: ShippingType.AIR, label: labelTypeOfShipping[ShippingType.AIR], id: ShippingType.AIR},
  {value: ShippingType.TRUCK, label: labelTypeOfShipping[ShippingType.TRUCK], id: ShippingType.TRUCK},
  {value: ShippingType.TRAIN, label: labelTypeOfShipping[ShippingType.TRAIN], id: ShippingType.TRAIN},
  {value: ShippingType.SEA, label: labelTypeOfShipping[ShippingType.SEA], id: ShippingType.SEA}
]

const cargoType = [
  {value: 'container', label: 'Контейнеры'},
  {value: 'box', label: 'Коробки'}
]

const FilterPanel = ({filter, setFilter}) => {

  const [selectValue, setSelectValue] = useState({})

  const optionHandler = (newValue) => {
    setFilter({...filter, type: newValue.value})
    setSelectValue(newValue)
  }

  const clearFilter = () => {
    setFilter({
      ...filter ,
      type: '',
      countryFrom: '',
      cityFrom: '',
      countryTo: '',
      cityTo: '',
      date: '',
      cargoType: '',
      clear: true
    })
    setSelectValue(null)
  }

  return (
      <div className={'filter-panel'}>
        <div className={'filter-title'}>Отфилитровать по</div>
        <div className={'all-filters-wrapper'}>
          <div className={'type-filter'}>
            <div className={'type-title'}>Тип перевозки:</div>
            <Select
                theme={customTheme}
                value={selectValue}
                options={typeOfShippingOptions}
                onChange={optionHandler}
                onFocus={() => setFilter({...filter, clear: false})}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Перевозка'}
                filterOption={createFilter(filterConfig)}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Тип груза:</div>
            <Select
                theme={customTheme}
                value={selectValue}
                options={cargoType}
                onChange={optionHandler}
                onFocus={() => setFilter({...filter, clear: false})}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Перевозка'}
                filterOption={createFilter(filterConfig)}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Страна отправления:</div>
            <input
                type="text"
                value={filter.countryFrom}
                onChange={e => setFilter({...filter, countryFrom: e.target.value})}
                onFocus={() => setFilter({...filter, clear: false})}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Город отправления:</div>
            <input
                type="text"
                value={filter.cityFrom}
                onChange={e => setFilter({...filter, cityFrom: e.target.value})}
                onFocus={() => setFilter({...filter, clear: false})}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Страна прибытия:</div>
            <input
                type="text"
                value={filter.countryTo}
                onChange={e => setFilter({...filter, countryTo: e.target.value})}
                onFocus={() => setFilter({...filter, clear: false})}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Город прибытия:</div>
            <input
                type="text"
                value={filter.cityTo}
                onChange={e => setFilter({...filter, cityTo: e.target.value})}
                onFocus={() => setFilter({...filter, clear: false})}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Окончание тарифа:</div>
            <input
                type="date"
                value={filter.date}
                onChange={e => setFilter({...filter, date: e.target.value})}
                onFocus={() => setFilter({...filter, clear: false})}
            />
          </div>
        </div>
        <button
            className={'clear-filter-button'}
            onClick={clearFilter}
        >Очистить</button>
      </div>
  );
};

export default FilterPanel;