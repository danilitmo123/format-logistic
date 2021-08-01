import React from 'react';
import HPlatform, {HMap, HMapPolyLine} from "react-here-map";

import airplane from '../../../../img/black-airplane-icon.svg'
import truck from '../../../../img/black-truck-icon.svg'
import train from '../../../../img/train-icon.svg'


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

  const TypeOfRoutes = ({route, step}) => {
     return (
         <div className={'type-of-route-wrapper'}>
           <div className={'step-circle'}>{step + 1}</div>
           <div className={'step-wrapper'}>
              <div className={'source'}>{route.source.name}</div>
              <div className={'route-info'}>
                <div className={'type'}>{route.type === 'TRUCK' ?
                    <img className={'truck'} src={truck} alt="truck"/>
                    : route.type ===  'AIR' ?
                    <img className={'airplane'} src={airplane} alt="airplane"/>
                    : <img className={'train'} src={train} alt="train"/>
                }
                </div>
                <div className={'route-distance'}>{(route.distance).toFixed(0)}км {route.total_cost}</div>
              </div>
              <div className={'destination'}>{route.destination.name}</div>
           </div>
         </div>
     )
  }

  const Map = ({points}) => {
    return (
        <HPlatform
            apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
            useCIT
            useHTTPS
            includeUI
            includePlaces>
          <HMap mapOptions={{zoom: 1}}>
            <HMapPolyLine points={points}/>
          </HMap>
        </HPlatform>
    )
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
              <div className={'route-total-cost'}>Цена: {path.total_cost}€/{(path.total_cost * 1.18).toFixed(2)}$</div>
              <div className={'route-total-duration'}>Время прибытия: {(path.total_duration.min).toFixed(0)} - {(path.total_duration.max).toFixed(0)} дней</div>
              <div className={'route-total-weight'}>Вес: {weight} кг</div>
              <div>Объем: {volume} м³</div>
            </div>
          </div>
          <button className={'choose-button'} onClick={() => setIndex(index)}>Выбрать</button>
        </div>
        <Map points={getPoints(path)}/>
      </div>
  )
};

export default PathItem;