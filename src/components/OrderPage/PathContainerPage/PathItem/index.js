import React from 'react';
import HPlatform, {HMap, HMapPolyLine} from "react-here-map";

import airplane from '../../../../img/airplane.svg'
import truck from '../../../../img/truck-icon.svg'

import './PathItem.scss'

const PathItem = ({path}) => {

   let points = []
   path.routes.map(item => {
     points.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
     points.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
   })

  const TypeOfRoutes = ({route, step}) => {
     return (
         <div className={'type-of-route-wrapper'}>
             <div className={'step-circle'}>{step + 1}</div>
           <div className={'step-wrapper'}>
             <div className={'source'}>{route.source.name}</div>
            <div className={'type'}>{route.type}</div>
            <div className={'destination'}>{route.destination.name}</div>
           </div>
         </div>
     )
  }
  return (
      <div className={'path-item-wrapper'}>
        <div className={'info-routes-wrapper'}>
          {path.routes.map((route, index) => <TypeOfRoutes step={index} route={route}/>)}
        </div>
        <HPlatform
            apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
            useCIT
            useHTTPS
            includeUI
            includePlaces
        >
          <HMap
              style={{width: 550, height: 400}}
              mapOptions={{ zoom: 1 }}
          >
            <HMapPolyLine points={points} />
          </HMap>
        </HPlatform>
      </div>
  );
};

export default PathItem;