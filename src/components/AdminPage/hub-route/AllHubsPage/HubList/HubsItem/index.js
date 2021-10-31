import React, {useEffect, useState} from 'react';

import {ADMIN_SERVER_URL} from "../../../../../../constants/URL";
import {adminInstance} from "../../../../../../api/admin";
import arrow from '../../../../../../img/arrow.svg'
import {defaultOptions} from "../../../../../../api/config";

import {Link} from 'react-router-dom'

import './HubsItem.scss'


const AIR = 'AIR'
const SEA = 'SEA'
const TRAIN = 'TRAIN'
const TRUCK = 'TRUCK'

const HubsItem = ({hub, link}) => {

  const [activePanel, setPanel] = useState(false)
  const [isActiveRoute, setActive] = useState(hub.active)
  const deleteHub = (id) => {
    adminInstance.delete(`${ADMIN_SERVER_URL}admin-routes/${id}`)
        .then(() => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err)
        })
  }

  const setActiveHub = (id) => {
    setActive(!isActiveRoute)
    const body = {
      active: !isActiveRoute
    }
    adminInstance.patch(`${ADMIN_SERVER_URL}admin-routes/${id}/active/`, body, defaultOptions)
        .then((res) => console.log(res))
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
        return 'Автомобильная перевозка'
      default:
        return ''
    }
  }

  return (
      <tr className={'row-wrapper'}>
        <td>
          <div className={'row-main-info'}>
            <img className={activePanel ? 'arrow-icon-up' : 'arrow-icon-down'} src={arrow} alt="arrow"
                 onClick={() => setPanel(!activePanel)}/>
            <div>{hub.source.name} - {hub.destination.name}</div>
          </div>
          {activePanel && <div className={'table-info-buttons'}>
            <Link to={`/admin/hub-routes/${link}edit/${hub.id}`}>
              <button className={'btn edit-button'}>Редактировать</button>
            </Link>
            <button className={'btn delete-button'} onClick={(e) => {
              deleteHub(hub.id)
              e.preventDefault()
            }}>Удалить
            </button>
            <div className={'active-checkbox'}>
              <input
                  type="checkbox"
                  checked={isActiveRoute}
                  onChange={() => setActiveHub(hub.id)}
              />
              <label>Активно</label>
            </div>
          </div>}
        </td>
        <td>{hub.title ? hub.title : '----'}</td>
        <td>{hub.source.state.country.name}</td>
        <td>{hub.source.name}</td>
        <td>{hub.destination.state.country.name}</td>
        <td>{hub.destination.name}</td>
        <td>{hubType(hub.type)}</td>
        <td>{hub.rates_valid_to}</td>
      </tr>
  );
};

export default HubsItem;