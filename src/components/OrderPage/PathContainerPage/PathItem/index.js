import React from 'react';

import Map from "../../../MapUI/Map";
import TypeOfRoutes from "../../../MapUI/TypeOfRoutes";

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
      <div className={'route-item-wrapper'}>
        <>
          <div className={'route-points-wrapper'}>
            {path.routes.map((route, index) => <TypeOfRoutes step={index} route={route}/>)}
          </div>
          <Map points={getPoints(path)}/>
        </>
        <div className={'route-info'}>
          <div className={'route-total-cost'}>{path.total_cost}€/{(path.total_cost * 1.18).toFixed(2)}$</div>
          <div className={'route-total-duration'}>Время
            прибытия: {(path.total_duration.min).toFixed(0)} - {(path.total_duration.max).toFixed(0)} дней
          </div>
          <div className={'route-info-title'}>Информация о грузе</div>
          <div className={'route-time-and-cost-wrapper'}>
            <div className={'weight'}>Вес: {weight} кг</div>
            <div className={'volume'}>Объем: {volume} м³</div>
          </div>
          <button className={'choose-button'} onClick={() => setIndex(index)}>Выбрать</button>
        </div>
      </div>
  )
};

export default PathItem;