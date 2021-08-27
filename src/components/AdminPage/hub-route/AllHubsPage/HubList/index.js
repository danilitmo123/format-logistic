import React from 'react';
import HubsItem from "./HubsItem";

const HubList = ({hubs}) => {

  return (
      <tbody className={'table-body'}>
        {hubs && hubs.map(hub =>  <HubsItem key={hub.id} hub={hub} />)}
      </tbody>
  );
};

export default HubList;