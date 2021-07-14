import React from 'react';

import {Link} from 'react-router-dom'

import './HubsItem.scss'

const HubsItem = ({hub}) => {

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
        </div>
      </Link>
  );
};

export default HubsItem;