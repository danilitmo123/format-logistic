import {useState, useEffect} from 'react';
import {GEO_SERVER_URL} from "../../../constants/URL";
import axios from "axios";

const STATES_BY_ZONE_URL = `${GEO_SERVER_URL}states`

const ZoneItem = ({data}) => {

    const [states, setStates] = useState([])
    const [loadedStates, setLoadedStates] = useState(false)
    const [open, setOpen] = useState(false)

    const loadListStates = () => {
        axios.get(`${STATES_BY_ZONE_URL}?zone=${data.zone.name}`).then(res=>{
            setStates(res.data)
            setLoadedStates(true)
        })
    }

    const onClick = () => {
        if (open)
            setOpen(false)
        else {
            if (!loadedStates)
                loadListStates()
            setOpen(true)
        }

    }

    const StateList = ({states}) => {
        return (<div>
            {states.map(state => {
                return <div>
                    {state.name}
                    <br/>
                </div>
            })}
        </div>)
    }

    return (
        <div style={{marginLeft: 50}} onClick={onClick}>
            <h2>{data.zone.name}</h2>
            <div>
                количество городов: {data.city_count}
                <br/>
                количество регионов: {data.state_count}
            </div>
            { open ? (loadedStates ? <StateList states={states}/> : "huy") : ""}
        </div>
    )
}

export default ZoneItem