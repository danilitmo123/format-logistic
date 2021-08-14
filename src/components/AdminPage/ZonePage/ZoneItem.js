import React,{useState, useEffect} from 'react';

import {ADMIN_SERVER_URL, GEO_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import {customTheme} from "../../../templates/templatesOfOptions";

import Select from "react-select";
import {adminInstance} from "../../../api/admin";

import './ZoneItem.scss'

const STATES_BY_ZONE_URL = `${GEO_SERVER_URL}states`
const ADMIN_ZONE_URL = `${ADMIN_SERVER_URL}admin-zones`

const ZoneItem = ({data}) => {

    const [states, setStates] = useState([])
    const [loadedStates, setLoadedStates] = useState(false)
    const [open, setOpen] = useState(false)
    const [stateOptions, setStateOptions] = useState([])
    const [chosenState, setChosenState] = useState(null)

    const loadListStates = () => {
        adminInstance.get(`${STATES_BY_ZONE_URL}?zone=${data.zone.name}`).then(res => {
            setStates(res.data)
            setLoadedStates(true)
        })
    }
    const loadStateOptions = () => {
        adminInstance.get(`${STATES_BY_ZONE_URL}`).then(res => {
            let options = []
            res.data.map(state => {
                options.push({value: state.id, label: state.name, id: state.id})
            })
            setStateOptions(options)
        })

    }
    useEffect(() => {
        loadStateOptions();
    }, [])


    const onClick = () => {
        if (open)
            setOpen(false)
        else {
            if (!loadedStates)
                loadListStates()
            setOpen(true)
        }

    }

    const addState = () => {
        if (chosenState) {
            let body = {state_id: chosenState.value}
            const options = {
                headers: {'Content-Type': 'application/json'}
            }
            adminInstance.post(`${ADMIN_ZONE_URL}/${data.zone.id}/states/add/`, body, options).then( res => {
                    loadStateOptions()
                    loadListStates()
                }
            )
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

    console.log(data)

    return (
        <div  className={'zone-item-wrapper'}>
            <div>
                <h2>{data.zone.name}</h2>
            </div>
            <div className={'count-wrapper'}>
                <div className={'add-region-wrapper'}>
                    <Select
                        noOptionsMessage={() => `Не найдено`}
                        theme={customTheme}
                        onChange={setChosenState}
                        options={stateOptions}
                        classNamePrefix={'add-region'}
                        placeholder={'Выберите регион'}
                    />
                    <button className={'add-region-button'} onClick={addState}>Добавить</button>
                </div>
                <div onClick={onClick}>
                    <div className={'count-of-cities'}>Количество городов: {data.city_count}</div>
                    <div className={'count-of-zones'}>Количество регионов: {data.state_count}</div>
                </div>
            </div>
            {open ? (loadedStates ? <StateList states={states}/> : "") : ""}
        </div>
    )
}

export default ZoneItem