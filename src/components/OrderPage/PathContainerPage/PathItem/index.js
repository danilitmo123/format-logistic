import React from 'react';

import Map from "../../../MapUI/Map";
import TypeOfRoutes from "../../../MapUI/TypeOfRoutes";

import airplane from '../../../../img/black-airplane-icon.svg'
import truck from '../../../../img/black-truck-icon.svg'
import train from '../../../../img/train-icon.svg'
import ship from '../../../../img/ship.svg'

import './PathItem.scss'

const PathItem = ({path, setIndex, index, volume, weight}) => {

  const getPoints = (pathOfItem) => {
    let pointsOfPath = []
    pathOfItem.routes.map(item => {
          pointsOfPath.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
          pointsOfPath.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
        })
   return pointsOfPath
  }

  return (
      <div className={'path-item-wrapper'}>
        <div className={'info-routes-wrapper'}>
         <div>
           {path.routes.map((route, index) => <TypeOfRoutes step={index} route={route}/>)}
         </div>
          <div>
            <div className={'route-info-title'}>Информация о грузе</div>
            <div className={'route-time-and-cost-wrapper'}>
              <div className={'route-total-weight'}>Вес: {weight} кг</div>
              <div>Объем: {volume} м³</div>
            </div>
            <div className={'route-info-title'}>Информация о маршруте</div>
            <div className={'route-time-and-cost-wrapper'}>
              <div className={'route-total-cost'}>Цена: {path.total_cost}€/{(path.total_cost * 1.18).toFixed(2)}$</div>
              <div className={'route-total-duration'}>Время прибытия: {(path.total_duration.min).toFixed(0)} - {(path.total_duration.max).toFixed(0)} дней</div>
            </div>
          </div>
          <button className={'choose-button'} onClick={() => setIndex(index)}>Выбрать</button>
        </div>
        <Map points={getPoints(path)}/>
      </div>
  )
};

export default PathItem;