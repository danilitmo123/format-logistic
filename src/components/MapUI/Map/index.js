import React from "react";

import HPlatform, {HMap, HMapPolyLine} from "react-here-map";

const Map = ({points}) => {
  return (
      <HPlatform
          apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
          useHTTPS={true}
         >
        <HMap mapOptions={{zoom: 1}}>
          <HMapPolyLine points={points}/>
        </HMap>
      </HPlatform>
  )
}

export default Map;