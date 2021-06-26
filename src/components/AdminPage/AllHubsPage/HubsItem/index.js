import React from 'react';

import './HubsItem.scss'

const HubsItem = ({hub, index}) => {
  return (
      <div className={'hub-wrapper'}>
        <div className={'countries-hub-wrapper'}>
          <div>{hub.source.name}</div>
          <div>{hub.destination.name}</div>
        </div>
        <div className={'cities-hub-wrapper'}>
          <div>{hub.type}</div>
          <div></div>
        </div>
      </div>
  );
};

export default HubsItem;