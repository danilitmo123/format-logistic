import React, {useEffect, useMemo, useState} from 'react';
import {ShippingType} from "../../../../constants/unit";
import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";

import './FilterPanel.scss'
import {createModifyCities, getCities} from "../../../../templates/templateGetCountryAndCity";


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

const FilterPanel = ({filter, setFilter}) => {

  return (
      <div className={'filter-panel'}>
        <div className={'filter-title'}>Отфилитровать по</div>
        <div className={'all-filters-wrapper'}>
          <div className={'type-filter'}>
            <div className={'type-title'}>Тип перевозки:</div>
            <Select
                theme={customTheme}
                options={typeOfShippingOptions}
                onChange={({value}) => setFilter({...filter, type: value})}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Перевозка'}
                filterOption={createFilter(filterConfig)}
            />
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Страна отправления:</div>
            <input type="text" onChange={e => setFilter({...filter, countryFrom: e.target.value})}/>
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Город отправления:</div>
            <input type="text" onChange={e => setFilter({...filter, cityFrom: e.target.value})}/>
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Страна прибытия:</div>
            <input type="text" onChange={e => setFilter({...filter, countryTo: e.target.value})}/>
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Город прибытия:</div>
            <input type="text" onChange={e => setFilter({...filter, cityTo: e.target.value})}/>
          </div>
          <div className={'type-filter'}>
            <div className={'type-title'}>Активен:</div>
            <Select
                theme={customTheme}
                // options={typeOfShippingOptions}
                // onChange={({value}) => filterActive.onChange(value)}
                noOptionsMessage={() => `Не найдено`}
                placeholder={'Перевозка'}
                filterOption={createFilter(filterConfig)}
            />
          </div>
        </div>
        <button className={'clear-filter-button'} onClick={() => setFilter({...filter, clear: true})}>Очистить</button>
      </div>
  );
};

export default FilterPanel;