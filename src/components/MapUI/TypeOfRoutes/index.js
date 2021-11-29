import React, {useEffect, useState} from "react";

import airplane from "../../../img/black-airplane-icon.svg";
import ship from "../../../img/ship.svg";
import train from "../../../img/train-icon.svg";
import truck from "../../../img/black-truck-icon.svg";

import './TypeOfRoutes.scss'

const AIR = 'AIR'
const SEA = 'SEA'
const TRAIN = 'TRAIN'
const TRUCK = 'TRUCK'

const TypeOfRoutes = ({route, step}) => {

  const [isDestWordLong, setDestWord] = useState(false)
  const [isSourceWordLong, setSourceWord] = useState(false)

  useEffect(() => {
    if (route.source.name.split('').length >= 15) {
      setSourceWord(true)
    }
    if (route.destination.name.split('').length >= 15) {
      setDestWord(true)
    }
  }, [])

  const hubType = (type) => {
    switch (type) {
      case AIR:
        return airplane
      case SEA:
        return ship
      case TRAIN:
        return train
      case TRUCK:
        return truck
      default:
        return ''
    }
  }

  return (
      <div className={'step-of-route-wrapper'}>
        <div className={'step-description'}>
          <div className={'step-circle'}>{step + 1}</div>
          <div className={'step'}>
            <div className={'step-info'}>
              <img className={'step-icon'} src={hubType(route.type)} alt=""/>
              <div className={isSourceWordLong ? 'source' : ''}>{route.source.name}</div>
              <div className={'circle'}>&#x25CB;</div>
              <div className={isDestWordLong ? 'destination' : ''}>{route.destination.name}</div>
            </div>
            <div className={'step-distance'}>
              <div className={'label'}>Расстояние:</div>
              <div className={'route-distance'}>{(route.distance).toFixed(0)}км {route.total_cost}</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TypeOfRoutes;
