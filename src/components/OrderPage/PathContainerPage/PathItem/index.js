import React from 'react';
import HPlatform, {HMap, HMapPolyLine} from "react-here-map";

import airplane from '../../../../img/black-airplane-icon.svg'
import truck from '../../../../img/black-truck-icon.svg'

import './PathItem.scss'


const PathItem = ({path, setIndex, index}) => {

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
                <div className={'type'}>{route.type === 'TRUCK' ? <img className={'truck'} src={truck} alt="truck"/> :
                    <img className={'airplane'} src={airplane} alt="airplane"/>}</div>
                <div className={'route-distance'}>{(route.distance / 1000).toFixed(0)}км</div>
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
          {path.routes.map((route, index) => <TypeOfRoutes step={index} route={route}/>)}
          <button className={'choose-button'} onClick={() => setIndex(index)}>Выбрать</button>
        </div>
        <Map points={getPoints(path)}/>
      </div>
  )
};

export default PathItem;