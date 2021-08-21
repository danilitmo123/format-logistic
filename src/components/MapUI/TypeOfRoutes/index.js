import React from "react";

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

  const hubType = (type) => {
    switch (type) {
      case AIR:
        return airplane
      case SEA:
        return ship
      case TRAIN:
        return train
      case TRUCK:
        return  truck
      default:
        return ''
    }
  }

  return (
      <div className={'type-of-route-wrapper'}>
        <div className={'step-circle'}>{step + 1}</div>
        <div className={'step-wrapper'}>
          <div className={'source'}>{route.source.name}</div>
          <div className={'route-info'}>
            <div className={'type'}>
              <img className={'type-icon'} src={hubType(route.type)} alt=""/>
            </div>
            <div className={'route-distance'}>{(route.distance).toFixed(0)}км {route.total_cost}</div>
          </div>
          <div className={'destination'}>{route.destination.name}</div>
        </div>
      </div>
  )
}

export default TypeOfRoutes;