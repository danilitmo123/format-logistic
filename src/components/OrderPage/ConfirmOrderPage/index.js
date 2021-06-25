import React from 'react';
import HPlatform, {HMap, HMapPolyLine} from "react-here-map";

import './ConfirmOrderPage.scss'

import airplane from '../../../img/black-airplane-icon.svg'
import truck from '../../../img/black-truck-icon.svg'

const ConfirmOrderPage = ({chosenPath}) => {
  console.log(chosenPath)
  const getPoints = (pathOfItem) => {
    let pointsOfPath = []
    pathOfItem[0].routes.map(item => {
      pointsOfPath.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
      pointsOfPath.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
    })
    return pointsOfPath
  }

  const Map = ({points}) => {
    return (<HPlatform
            apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
            useCIT
            useHTTPS
            includeUI
            includePlaces
        >
          <HMap
              mapOptions={{zoom: 1}}
          >
            <HMapPolyLine points={points}/>
          </HMap>
        </HPlatform>
    )
  }

  return (
      <div className={'final-order-page-wrapper'}>
        <div className={'final-map-wrapper'}>
          <div className={'route'}>
            {chosenPath[0].routes ? chosenPath[0].routes.map((item, index) => ((
                <div className={'type-of-route-wrapper'}>
                  <div className={'step-circle'}>{index + 1}</div>
                  <div className={'step-wrapper'}>
                    <div className={'source'}>{item.source.name}</div>
                    <div className={'route-info'}>
                      <div className={'type'}>{item.type === 'TRUCK' ? <img className={'truck'} src={truck} alt="truck"/> :
                          <img className={'airplane'} src={airplane} alt="airplane"/>}</div>
                      <div className={'route-distance'}>{(item.distance / 1000).toFixed(0)}км</div>
                    </div>
                    <div className={'destination'}>{item.destination.name}</div>
                  </div>
                </div>)))
                :
                ''
            }
          </div>
          <Map points={getPoints(chosenPath)}/>
        </div>
        <div className={'all-info-route'}>
          <div className={'title'}>Итого:</div>
          <div>Расстояние: {(chosenPath[0].total_distance / 1000).toFixed(0)} км</div>
          <div>Цена: {(chosenPath[0].total_cost)} руб</div>
          <div>Время в пути: {(chosenPath[0].total_duration.min)} - {chosenPath[0].total_duration.max} дней </div>
        </div>
       <div className={'final-form-wrapper'}>
         <div className="shipper">
           <div className={'shipper-title'}>Грузоотправитель</div>
           <div className={'input-example'}>
             <label htmlFor="">Компания</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Индекс</label>
             <input type="number"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Адрес</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Контактное лицо</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Телефон</label>
             <input type="tel" pattern={'+7([0-9]){3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'} placeholder={'+7(999)-999-99-99'}/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Email</label>
             <input type="email" placeholder={'email@gmail.com'}/>
           </div>
         </div>
         <div className="consignee">
           <div className={'consignee-title'}>Грузополучатель</div>
           <div className={'input-example'}>
             <label htmlFor="">Компания</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Индекс</label>
             <input type="number"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Адрес</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Контактное лицо</label>
             <input type="text"/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Телефон</label>
             <input type="tel" pattern={'+7([0-9]){3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'} placeholder={'+7(999)-999-99-99'}/>
           </div>
           <div className={'input-example'}>
             <label htmlFor="">Email</label>
             <input type="email" placeholder={'email@gmail.com'}/>
           </div>
         </div>
       </div>
      </div>
  );
};

export default ConfirmOrderPage;