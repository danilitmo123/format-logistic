import React from 'react';

import {Link} from 'react-router-dom'

import './HubsItem.scss'

const HubsItem = ({hub, setEditing, setId, deleteHub, index}) => {

  const setEditingAndIdHandler = () => {
    setId(hub.id)
    setEditing(true)
  }

  return (
      <Link to={'/admin/edit-hub'}>
        <div className={'hub-wrapper'} onClick={setEditingAndIdHandler}>
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