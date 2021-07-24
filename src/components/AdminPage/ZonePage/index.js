import React, {useState, useEffect} from 'react'

import axios from "axios";

import {ADMIN_SERVER_URL, GEO_SERVER_URL} from "../../../constants/URL";
import ZoneItem from "./ZoneItem";

import loader from '../../../img/loader.svg'

import './ZonePage.scss'

const ZONE_SUMMARY_URL = `${ADMIN_SERVER_URL}admin-zones/summary`

const ZonePage = () => {
    const [zoneSummaryData, setZoneSummaryData] = useState([])
    const [loading, setLoading] = useState(false)

    const loadZoneSummaryData = () => {
        axios.get(ZONE_SUMMARY_URL).then(res => {
            setZoneSummaryData(res.data)
            setLoading(true)
        })
    }

    useEffect(() => {
        loadZoneSummaryData()
    }, [])

    return (
      <div className={'zone-page-wrapper'}>
          <div className={'zone-title'}>
              <div>Зоны и регионы</div>
              <button className={'create-zone-button'}>Создать зону</button>
          </div>
          {
              loading ?
                <div className={'zone-wrapper'}>
                    {zoneSummaryData.map(item => {
                        return (<ZoneItem data={item}/>)
                    })}
                </div>
                :
                <div className={'loader-wrapper'}><img src={loader} alt=""/><div>Загрузка...</div></div>
          }
      </div>
    )
}

export default ZonePage