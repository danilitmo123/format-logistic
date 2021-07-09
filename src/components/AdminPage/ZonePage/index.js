import React from 'react'
import {useState, useEffect} from 'react';
import {ADMIN_SERVER_URL, GEO_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import ZoneItem from "./ZoneItem";

import './ZonePage.scss'

const ZONE_SUMMARY_URL = `${ADMIN_SERVER_URL}admin-zones/summary`

const ZonePage = () => {
    const [zoneSummaryData, setZoneSummaryData] = useState([])


    const loadZoneSummaryData = () => {
        axios.get(ZONE_SUMMARY_URL).then(res => {
            setZoneSummaryData(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        loadZoneSummaryData()
    }, [])

    return (
        <div className={'zone-wrapper'}>
            {zoneSummaryData.map(item => {
                return (<ZoneItem data={item}/>)
            })}
        </div>
    )
}

export default ZonePage