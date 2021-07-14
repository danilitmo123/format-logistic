import React from 'react';

import {Link, useHistory} from 'react-router-dom'

import './HubsItem.scss'
import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../../../constants/URL";


const HubsItem = ({hub}) => {

  const deleteHub = (id) => {
    axios.delete(`${ADMIN_SERVER_URL}admin-routes/${id}`)
        .then(r => {
          console.log("deleted " + id)
          window.location.reload();
        })
        .catch(err => {console.log(err)})
  }

  return (
      <Link to={`/admin/hub-routes/edit/${hub.id}`}>
        <div className={'hub-wrapper'}>
          <div className={'countries-hub-wrapper'}>
            <div className={'source-name'}>{hub.source.name}</div>
            -
            <div className={'destination-name'}>{hub.destination.name}</div>
          </div>
          <div className={'cities-hub-wrapper'}>
            <div className={'hub-type'}>{hub.type === 'AIR' ? 'Авиафрахт' : hub.type === 'TRAIN' ? 'ЖД перевозка' : 'Автомобильная перевозка'}</div>
          </div>
          <button className={'delete-hub-button'} onClick={(e) => {
            deleteHub(hub.id)
            e.preventDefault()
          }}>X</button>
        </div>
      </Link>
  );
};

export default HubsItem;