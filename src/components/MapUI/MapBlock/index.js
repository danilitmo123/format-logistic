import React, {useEffect, useState} from 'react';

import Map from "../Map";
import TypeOfRoutes from "../TypeOfRoutes";

import './MapBlock.scss'
import {YANDEX_ACCOUNT} from "../../../constants/metrix";
import {Button} from "antd";

const MapBlock = ({
                    weight,
                    index,
                    setIndex,
                    path,
                    volume,
                    chosenPath,
                    setThirdPage,
                    containerWeight,
                    bigCount,
                    middleCount,
                    smallCount
                  }) => {

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
      {displayedInfo && (displayedInfo.cheapest && <div className={'variant cheapest-variant'}>Самый дешевый</div>)}
      {displayedInfo && (displayedInfo.fastest && <div className={'variant fastest-variant'}>Самый быстрый</div>)}
      {displayedInfo && (displayedInfo.optimal && <div className={'variant fastest-variant'}>Самый оптимальный</div>)}
      <div className={'route-points-wrapper'}>
        {displayedPath && displayedPath.map((route, index) => <TypeOfRoutes key={index} step={index} route={route}/>)}
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
            Расстояние: {displayedInfo && (displayedInfo.total_distance).toFixed(0)} км
          </div>
          <div className={'route-info-title'}>Информация о грузе</div>
          <div className={'route-time-and-cost-wrapper'}>
            {localStorage.getItem('goodType') === 'CONTAINER' ?
              <div className={'container-info-wrapper'}>
                <div className={'container-cargo'}>{smallCount}x20', {middleCount}x40', {bigCount}x40'HC</div>
                <div className={'weight'}>Вес: {containerWeight} кг</div>
              </div> : ''
            }
            {localStorage.getItem('goodType') === 'BOX' ?
            <>
              <div className={'weight'}>Вес: {weight} кг</div>
              <div className={'volume'}>Объем: {volume} м³</div>
            </> : ''
            }
          </div>
          {chosenPath ? '' : <Button type={'primary'} style={{ width: 150, height: 30, borderRadius: 4 }} onClick={() => {
              if (typeof window.ym != 'undefined') {
                  window.ym(YANDEX_ACCOUNT, 'reachGoal', 'calc_next2')
              }
            setIndex(index)
            setThirdPage(true)
          }}>Выбрать</Button>}
        </div>
      </div>
    </div>
  );
};

export default MapBlock;
