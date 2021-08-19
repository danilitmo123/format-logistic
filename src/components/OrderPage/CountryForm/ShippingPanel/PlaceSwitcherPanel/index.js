import React from 'react';

import {PlaceType} from "../../../../../constants/unit";

import './PlaceSelectPanel.scss'

const PlaceSelectPanel = ({type, handleSwitcher}) => {

  return (
      <div className={'place-select'}>
        <button
            onClick={() => handleSwitcher(PlaceType.CITY)}
            className={type === PlaceType.CITY ? 'active-city-button' : 'place-button'}>Город
        </button>
        <button
            onClick={() => handleSwitcher(PlaceType.WAREHOUSE)}
            className={type === PlaceType.WAREHOUSE ? 'active-storage-button' : 'place-button'}>Наш
          склад
        </button>
        <button
            onClick={() => handleSwitcher(PlaceType.AIRPORT)}
            className={type === PlaceType.AIRPORT ? 'active-air-button' : 'place-button'}>Аэропорт
        </button>
        <button
            onClick={() => handleSwitcher(PlaceType.RAILWAY_STATION)}
            className={type === PlaceType.RAILWAY_STATION ? 'active-train-button' : 'place-button'}>Ж/Д
          станция
        </button>
        <button
            onClick={() => handleSwitcher(PlaceType.SEAPORT)}
            className={type === PlaceType.SEAPORT ? 'active-sea-button' : 'place-button'}>Морской порт
        </button>
      </div>
  );
};

export default PlaceSelectPanel;