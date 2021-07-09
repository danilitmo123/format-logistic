import React,{useState, useEffect} from 'react';

import {Link} from "react-router-dom";
import axios from "axios";

import ExtraShoulderItem from "./ExtraShoulderItem";

import {ADMIN_SERVER_URL} from "../../../constants/URL";

import './ExtraShouldersPage.scss'
import {get} from "react-hook-form";

const ZONE_URL = `${ADMIN_SERVER_URL}admin-zones/`


const ExtraShouldersPage = () => {

  const [zones, setZones] = useState([])

  const getZones = () => {
    axios.get(ZONE_URL).then(res => setZones([res.data]))
  }

  useEffect(() => {
    getZones()
  }, [])

  return (
      <div className={'extra-shoulder-page-wrapper'}>
          <div className={'top-extra-shoulders-tile'}>
              <div className={'extra-shoulders-title'}>Вспомогательные плечи</div>
              <Link to={'/admin/hubs'}>
                  <button className={'back-to-hubs-button'}>Вернуться</button>
              </Link>
          </div>
          <div className={'items-wrapper'}>
            {zones[0] !== undefined ? zones[0].map(item => <ExtraShoulderItem item={item}/>) : '' }
          </div>
          <button className={'refresh-price-button'}>Обновить цены</button>
      </div>
  );
};

export default ExtraShouldersPage;