import React from 'react';

import axios from "axios";

import './CountryForm.scss'

const CountryForm = () => {


  return (
      <div className={'country-form-wrapper'}>
        <div className={'from-form-wrapper'}>
          <div className={'from-form-title-wrapper'}>
            <div className={'from-form-title'}>Забрать груз</div>
            <div className={'from-form-text'}>Пункт отправления</div>
          </div>
          <div className={'country-select-from'}>
            <label htmlFor="country">Страна</label>
            <select name="country-select" id="country">
              <option value="">Россия</option>
              <option value="">Германия</option>
              <option value="">Франция</option>
            </select>
          </div>
          <div className={'country-select-from'}>
            <label htmlFor="country">Город</label>
            <select name="country-select" id="country">
              <option value="">Россия</option>
              <option value="">Германия</option>
              <option value="">Франция</option>
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
            <select name="country-select" id="country">
              <option value="">Россия</option>
              <option value="">Германия</option>
              <option value="">Франция</option>
            </select>
          </div>
          <div className={'country-select-where'}>
            <label htmlFor="country">Город</label>
            <select name="country-select" id="country">
              <option value="">Россия</option>
              <option value="">Германия</option>
              <option value="">Франция</option>
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