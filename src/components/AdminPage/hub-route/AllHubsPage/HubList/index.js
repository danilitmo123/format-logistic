import React from 'react';
import HubsItem from "./HubsItem";

const HubList = ({hubs, link=''}) => {

  return (
      <tbody className={'table-body'}>
        {hubs && hubs.map(hub =>  <HubsItem key={hub.id} hub={hub} link={link}/>)}
      </tbody>
  );
};

export default HubList;