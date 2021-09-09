import React, {useEffect, useState} from 'react';

import Map from "../Map";
import TypeOfRoutes from "../TypeOfRoutes";

import './MapBlock.scss'

const MapBlock = ({weight, index, setIndex, path, volume, chosenPath}) => {

  const [displayedPath, setPath] = useState(null)
  const [displayedInfo, setInfo] = useState(null)

  useEffect(() => {
    if (chosenPath) {
      setPath(chosenPath[0].routes)
      setInfo(chosenPath[0])
    } else {
      setPath(path.routes)
      setInfo(path)
    }
  }, [path, chosenPath])

  const getPoints = (pathOfItem) => {
    let pointsOfPath = []
    if (pathOfItem) {
      pathOfItem.map(item => {
        pointsOfPath.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
        pointsOfPath.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
      })
    }
    return pointsOfPath
  }

  return (
      <div className={'all-route-info'}>
        <div className={'route-points-wrapper'}>
          {displayedPath && displayedPath.map((route, index) => <TypeOfRoutes step={index} route={route}/>)}
        </div>
        <div className={'route-item-wrapper'}>
          <Map points={getPoints(displayedPath)}/>
          <div className={'route-info'}>
            <div className={'route-total-cost'}>{displayedInfo && displayedInfo.total_cost}€
              /{displayedInfo && (displayedInfo.total_cost * 1.18).toFixed(2)}$
            </div>
            <div className={'route-total-duration'}>Время
              прибытия: {displayedInfo && (displayedInfo.total_duration.min).toFixed(0)}
              - {displayedInfo && (displayedInfo.total_duration.max).toFixed(0)} дней
            </div>
            <div className={'route-total-distance'}>
              Расстояние: {(displayedInfo.total_distance).toFixed(0)} км
            </div>
            <div className={'route-info-title'}>Информация о грузе</div>
            <div className={'route-time-and-cost-wrapper'}>
              <div className={'weight'}>Вес: {weight} кг</div>
              <div className={'volume'}>Объем: {volume} м³</div>
            </div>
            {chosenPath ? '' : <button className={'choose-button'} onClick={() => setIndex(index)}>Выбрать</button>}
          </div>
        </div>
      </div>
  );
};

export default MapBlock;