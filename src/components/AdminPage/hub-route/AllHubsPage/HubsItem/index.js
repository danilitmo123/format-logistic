import React, {useState} from 'react';

import {ADMIN_SERVER_URL} from "../../../../../constants/URL";
import {adminInstance} from "../../../../../api/admin";
import arrow from '../../../../../img/arrow.svg'

import {Link} from 'react-router-dom'

import './HubsItem.scss'
const AIR = 'AIR'
const SEA = 'SEA'
const TRAIN = 'TRAIN'
const TRUCK = 'TRUCK'

const HubsItem = ({hub}) => {

  const [activePanel, setPanel] = useState(false)

  const deleteHub = (id) => {
      adminInstance.delete(`${ADMIN_SERVER_URL}admin-routes/${id}`)
        .then(() => {
          window.location.reload();
        })
        .catch(err => {console.log(err)})
  }

  const hubType = (type) => {
    switch (type) {
      case AIR:
        return 'Авиафрахт'
      case SEA:
        return 'Морская перевозка'
      case TRAIN:
        return 'Ж/Д перевозка'
      case TRUCK:
        return  'Автомобильная перевозка'
      default:
        return ''
    }
  }

  return (
      // <Link to={`/admin/hub-routes/edit/${hub.id}`}>
      //   <div className={'hub-wrapper'}>
      //     <div className={'countries-hub-wrapper'}>
      //       <div className={'source-name'}>{hub.source.name}</div>
      //       -
      //       <div className={'destination-name'}>{hub.destination.name}</div>
      //     </div>
      //     <div className={'cities-hub-wrapper'}>
      //       <div className={'hub-type'}>{hubType(hub.type)}</div>
      //     </div>
      //     <button className={'delete-hub-button'} onClick={(e) => {
      //       deleteHub(hub.id)
      //       e.preventDefault()
      //     }}>X</button>
      //   </div>
      // </Link>
      <tr className={'row-wrapper'}>
        <td>
          <div className={'row-main-info'}>
            <img className={activePanel ? 'arrow-icon-up' : 'arrow-icon-down'} src={arrow} alt="arrow" onClick={() => setPanel(!activePanel)}/>
            <div>{hub.source.name} - {hub.destination.name}</div>
          </div>
          {activePanel &&  <div className={'table-info-buttons'}>
            <Link to={`/admin/hub-routes/edit/${hub.id}`}>
              <button className={'btn edit-button'}>Редактировать</button>
            </Link>
            <button className={'btn delete-button'} onClick={(e) => {
              deleteHub(hub.id)
              e.preventDefault()
            }}>Удалить</button>
          </div>}
        </td>
        <td>{hubType(hub.type)}</td>
      </tr>
  );
};

export default HubsItem;