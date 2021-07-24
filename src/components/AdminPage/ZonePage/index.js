import React, {useState, useEffect} from 'react'

import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../constants/URL";

import ZoneItem from "./ZoneItem";

import loader from '../../../img/loader.svg'

import './ZonePage.scss'

const ZONE_SUMMARY_URL = `${ADMIN_SERVER_URL}admin-zones/summary`
const ZONE_CREATE_URL = `${ADMIN_SERVER_URL}zones/create/`

const ZonePage = () => {
    const [zoneSummaryData, setZoneSummaryData] = useState([])
    const [loading, setLoading] = useState(false)
    const [showCreateZone, setShowCreateZone] = useState(false)
    const [zoneName, setZoneName] = useState('')

    const createZone = (zoneName) => {
        let body = {name: zoneName}
        let options = {
            headers: {'Content-Type': 'application/json'}
        }
        axios.post(ZONE_CREATE_URL, body, options).then(res => {
                loadZoneSummaryData()
            }
        )
    }

    const createZoneHandler = () => {
        setShowCreateZone(!showCreateZone)
        if (zoneName) {
            createZone(zoneName)
            setZoneName('')
        }
    }

    const zoneNameHandler = (e) => {
        setZoneName(e.target.value)
    }

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
                <button className={'create-zone-button'} onClick={createZoneHandler}>Создать зону</button>
                {
                    showCreateZone ?
                        <div className={'create-zone'}>
                            <input type="text" value={zoneName} onChange={zoneNameHandler}/>
                            <button onClick={createZoneHandler} className={'create-zone-button'}>Создать</button>
                        </div>
                        :
                        ''
                }
            </div>
            {
                loading ?
                    <div className={'zone-wrapper'}>
                        {zoneSummaryData.map(item => {
                            return (<ZoneItem data={item}/>)
                        })}
                    </div>
                    :
                    <div className={'loader-wrapper'}>
                        <img src={loader} alt=""/>
                        <div>Загрузка...</div>
                    </div>
            }
        </div>
    )
}

export default ZonePage