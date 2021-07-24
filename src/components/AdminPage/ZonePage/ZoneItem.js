import {useState, useEffect} from 'react';
import {GEO_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import {customTheme} from "../../../templates/templatesOfOptions";

import './ZoneItem.scss'
import Select from "react-select";

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
        return (
            <div>
            {states.map(state => {
                return <div>
                    {state.name}
                    <br/>
                </div>
            })}
            </div>
        )
    }

    return (
        <div  className={'zone-item-wrapper'}>
            <div>
                <h2>{data.zone.name}</h2>
            </div>
            <div className={'count-wrapper'}>
                <div className={'add-region-wrapper'}>
                    <AsyncSelect
                        noOptionsMessage={() => `Не найдено`}
                        theme={customTheme}
                        classNamePrefix={'add-region'}
                        placeholder={'Выберите регион'}
                    />
                    <button className={'add-region-button'}>Добавить</button>
                </div>
                <div onClick={onClick}>
                    <div className={'count-of-cities'}>Количество городов: {data.city_count}</div>
                    <div className={'count-of-zones'}>Количество регионов: {data.state_count}</div>
                </div>
            </div>
            { open ? (loadedStates ? <StateList states={states}/> : "") : ""}
        </div>
    )
}

export default ZoneItem