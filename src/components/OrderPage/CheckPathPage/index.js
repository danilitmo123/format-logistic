import React from 'react';

import {GoogleMap, useJsApiLoader, Polyline} from "react-google-maps";
import {Route} from 'react-router-dom'

import './CheckPathPage.scss'

const CheckPathPage = ({path, }) => {

  const containerStyle ={
    width: '400px',
    height: '400px'
  }

  // const {isLoaded} = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyDQkoIx58Yls4-63ZKAhxng86ANa5recEo"
  // })
  //
  // const [map, setMap] = React.useState(null)
  //
  //
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])
  //
  // const center = {
  //   lat: source.location.latitude,
  //   lng: source.location.longitude
  // };
  //
  // const polylinePath = () => {
  //   let polyline = []
  //   path.routes.forEach( route => {
  //     polyline.push({lat: route.source.location.latitude, lng: route.source.location.longitude})
  //     polyline.push({lat: route.destination.location.latitude, lng: route.destination.location.longitude})
  //   })
  //   return polyline
  // }
  //
  // const polylineOpts = () => {
  //   return {
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.35,
  //     clickable: false,
  //     draggable: false,
  //     editable: false,
  //     visible: true,
  //     radius: 30000,
  //     paths: polylinePath(),
  //     zIndex: 1
  //   }
  // }



  return (
      <section className={'second-step-wrapper'}>
          <div className={'path-card'}>
            <div className={'path-info'}>
              <div className={'path-route-info'}>
              </div>
              <div className={'total-info'}>
                <span>Total distance: <strong>{99999}</strong> meters</span>
                <span>Total duration: <strong>{99999}</strong> minutes</span>
                <span>Total cost: <strong>{99999}</strong> euro</span>
              </div>
            </div>
            <br/>

          </div>
      </section>
  );
};

export default CheckPathPage;