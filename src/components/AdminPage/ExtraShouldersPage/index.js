import React,{useState} from 'react';

import {Link} from "react-router-dom";

import ExtraShoulderItem from "./ExtraShoulderItem";

import './ExtraShouldersPage.scss'

const ExtraShouldersPage = () => {

  const [carInputRussia, setCarInputRussia] = useState('')
  const [railwayInputRussia, setRailwayInputRussia] = useState('')
  const [airInputRussia, setAirInputRussia] = useState('')
  const [waterInputRussia, setWaterInputRussia] = useState('')

  return (
      <div className={'extra-shoulder-page-wrapper'}>
          <div className={'top-extra-shoulders-tile'}>
              <div className={'extra-shoulders-title'}>Вспомогательные плечи</div>
              <Link to={'/admin/hubs'}>
                  <button className={'back-to-hubs-button'}>Вернуться</button>
              </Link>
          </div>
          <div className={'items-wrapper'}>
              <ExtraShoulderItem type={'Автомобильная перевозка'} title={'Россия'}/>
              <ExtraShoulderItem type={'Морская перевозка'} title={'Россия'}/>
              <ExtraShoulderItem type={'Авиафрахт'} title={'Россия'}/>
              <ExtraShoulderItem type={'Железнодорожная перевозка'} title={'Россия'}/>
              <ExtraShoulderItem type={'Автомобильная перевозка'} title={'США'}/>
              <ExtraShoulderItem type={'Морская перевозка'} title={'США'}/>
              <ExtraShoulderItem type={'Авиафрахт'} title={'США'}/>
              <ExtraShoulderItem type={'Железнодорожная перевозка'} title={'США'}/>
              <ExtraShoulderItem type={'Автомобильная перевозка'} title={'Европейский союз'}/>
              <ExtraShoulderItem type={'Морская перевозка'} title={'Европейский союз'}/>
              <ExtraShoulderItem type={'Авиафрахти'} title={'Европейский союз'}/>
              <ExtraShoulderItem type={'Железнодорожная перевозка'} title={'Европейский союз'}/>
              <ExtraShoulderItem type={'Автомобильная перевозка'} title={'Азиатский регион'}/>
              <ExtraShoulderItem type={'Морская перевозкаа'} title={'Азиатский регион'}/>
              <ExtraShoulderItem type={'Авиафрахт'} title={'Азиатский регион'}/>
              <ExtraShoulderItem type={'Железнодорожная перевозка'} title={'Азиатский регион'}/>
          </div>
          <button className={'refresh-price-button'}>Обновить цены</button>
      </div>
  );
};

export default ExtraShouldersPage;