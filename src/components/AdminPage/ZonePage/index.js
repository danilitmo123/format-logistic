import {useState, useEffect} from 'react';
import {ADMIN_SERVER_URL} from "../../../constants/URL";
import axios from "axios";

const ZONE_URL = `${ADMIN_SERVER_URL}admin-zones`

const ZonePage = () => {
    const [zoneData, setZoneData] = useState()


    const loadZoneData = () => {
        axios.get(ZONE_URL).then(res => {
            setZoneData(res.data)
        })
    }

    useEffect(() => {
        loadZoneData()
    }, [])

    return (
        <div>
            {JSON.stringify(zoneData)}
        </div>
    )
}

export default ZonePage