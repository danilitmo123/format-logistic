import {PlaceDispatcherContext} from "../../common/place/placeContext";
import {PlaceSelectBlock} from "../../common/place/PlaceSelectBlock";
import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";
import {RatesContext} from "../../common/price/PriceContext";
import PriceBlock from "../../common/price/PriceBlock";
import {ServiceContext} from "../../common/service/ServiceContext";
import ServiceContainer from "../../common/service/serviceBlock/ServiceContainer";
import React, {useState} from "react";
import {useRefReducer, useRefSetter} from "../../../../utils/hooks";
import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import {ShippingType} from "../../../../constants/unit";

const defaultRateMass = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    type: 'MASS'
}

const defaultRateSize = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    type: 'SIZE'
}

const defaultRateLdm = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    type: 'LDM'
}

const initRates = (initData) => {
    if (initData.rates)
        return initData.rates
    else
        return [defaultRateMass, defaultRateSize, defaultRateLdm]
}

const placeReducer = (ref, action) => {
    switch (action.type) {
        case "setCity":
            if (action.key === "from")
                return {...ref, cityFrom: action.city}
            else if (action.key === "to")
                return {...ref, cityTo: action.city}
            break
        case "setCountry":
            if (action.key === "from")
                return {...ref, countryFrom: action.country}
            else if (action.key === "to")
                return {...ref, countryTo: action.country}
            break
        default:
            return {...ref}
    }
}
const initPlaces = {
    cityFrom: {id: "", name: ""},
    cityTo: {id: "", name: ""},
    countryFrom: "",
    countryTo: ""
}

const typeOfShippingOptions = [
    {value: ShippingType.AIR, label: "Авиафрахт", id: ShippingType.AIR},
    {value: ShippingType.TRUCK, label: "Автомобильная перевозка", id: ShippingType.TRUCK},
    {value: ShippingType.TRAIN, label: "Железнодородная перевозка", id: ShippingType.TRAIN},
]

const placeObjectFromInitData = (initData) => {
    if (initData.source && initData.destination) {
        return {
            cityFrom: {id: initData.source.id, name: initData.source.name},
            cityTo: {id: initData.destination.id, name: initData.destination.name},
            countryFrom: "",
            countryTo: ""
        }
    } else {
        return initPlaces
    }

}

export const HubRouteBlock = ({initData}) => {

    const [distance, setDistance] = useState(initData.distance ? initData.distance : 0)
    const [duration, setDuration] = useState(initData.duration ? initData.duration : 0)

    const [activeTimetable, setActiveTimetable] = useState(!!initData.timetable)
    const [timetableDays, setTimetableDays] = useState(initData.timetable ? initData.timetable.weekdays : [0, 0, 0, 0, 0, 0, 0])
    const [prepareDays, setPrepareDays] = useState(initData.timetable ? initData.timetable.preparation_period : 0)

    const [places, dispatchPlaces] = useRefReducer(placeReducer, () => {return placeObjectFromInitData(initData)})
    const [typeOfShipping, setTypeOfShipping] = useRefSetter(initData.type ? initData.type: typeOfShippingOptions[0].value)
    const [rates, setRates] = useState(() => initRates(initData))
    const [additionalServices, setAdditionalServices] = useState(initData.additional_services ? initData.additional_services: [])
    const [rankedServices, setRankedServices] = useState(initData.ranked_services ? initData.ranked_services : [])

    const activateWeekday = (dayInd) => {
        timetableDays[dayInd] = timetableDays[dayInd] ? 0 : 1
        setTimetableDays([...timetableDays])
    }

    const sendRequest = () => {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        let body = {
            source: {
                id: places.current.cityFrom.id,
            },
            destination: {
                id: places.current.cityTo.id
            },
            type: typeOfShipping.current,
            distance: distance,
            duration: duration * 60 * 24,
            rates: rates,
            additional_services: additionalServices,
            ranked_services: rankedServices
        }
        if (activeTimetable) {
            body.timetable = {
                weekdays: timetableDays,
                preparation_period: prepareDays
            }
        }

        console.log({body})
        axios.post(`${ADMIN_SERVER_URL}admin-routes/`, body, options)
            .then(res => console.log(res))
    }


    return (
        <div className={'hubs-settings-wrapper'}>
            <div className={'shipping-title'}>Отправление</div>
            <PlaceDispatcherContext.Provider value={{dispatch: dispatchPlaces}}>
                <PlaceSelectBlock titleCountry={"Страна отправки"}
                                  titleCity={"город отпрвки"}
                                  dispatchKey={"from"}/>
                <PlaceSelectBlock titleCountry={"Страна прибытия"}
                                  titleCity={"город приюытия"}
                                  dispatchKey={"to"}/>
            </PlaceDispatcherContext.Provider>
            <div className={'shipping-selects-wrapper'}>
                <div className={'type-of-place-select'}>
                    <label className={'label-shipping-select'}>Вид перевозки</label>
                    <Select
                        theme={customTheme}
                        options={typeOfShippingOptions}
                        onChange={({value}) => setTypeOfShipping(value)}
                        noOptionsMessage={() => `Не найдено`}
                        defaultValue={{value: initData.type ? initData.type: typeOfShippingOptions[0].value}}
                        placeholder={'Перевозка'}
                        filterOption={createFilter(filterConfig)}
                    />
                </div>
            </div>
            <div className={'upload-dest-and-dur'}>
                <div className={'upload-title'}>Расстояние и время</div>
                <div className={'upload-inputs-wrapper'}>
                    <div className={'destination-wrapper'}>
                        <label>Расстояние</label>
                        <input
                            value={distance}
                            onChange={e => setDistance(e.target.value)}
                            type="number"
                            placeholder={'Расстояния'}/>
                    </div>
                    <div className={'duration-wrapper'}>
                        <label>Дни</label>
                        <input
                            value={duration}
                            placeholder={'Дни'}
                            type="number"
                            onChange={e => setDuration(e.target.value)}/>
                    </div>
                </div>
            </div>
            <RatesContext.Provider value={{rates, setRates}}>
                <PriceBlock/>
            </RatesContext.Provider>
            <div className={'timetable-wrapper'}>
                <div className={'timetable-title-wrapper'}>
                    <div className={'timetable-title'}>Расписание</div>
                    <input type="checkbox" onClick={() => setActiveTimetable(!activeTimetable)}/>
                </div>
                {
                    activeTimetable ? <div className={'timetable'}>
                        <div className={'days-and-buttons-wrapper'}>
                            <div className={'timetable-days'}>Дни недели</div>
                            <div className={'buttons-wrapper'}>
                                <button
                                    value={'Monday'}
                                    onClick={() => activateWeekday(0)}
                                    className={timetableDays[0] ? 'active-button-day' : 'button-day'}>Понедельник
                                </button>
                                <button
                                    value={'Tuesday'}
                                    onClick={() => activateWeekday(1)}
                                    className={timetableDays[1] ? 'active-button-day' : 'button-day'}>Вторник
                                </button>
                                <button
                                    value={'Wednesday'}
                                    onClick={() => activateWeekday(2)}
                                    className={timetableDays[2] ? 'active-button-day' : 'button-day'}>Среда
                                </button>
                                <button
                                    value={'Thursday'}
                                    onClick={() => activateWeekday(3)}
                                    className={timetableDays[3] ? 'active-button-day' : 'button-day'}>Четверг
                                </button>
                                <button
                                    value={'Friday'}
                                    onClick={() => activateWeekday(4)}
                                    className={timetableDays[4] ? 'active-button-day' : 'button-day'}>Пятница
                                </button>
                                <button
                                    value={'Saturday'}
                                    onClick={() => activateWeekday(5)}
                                    className={timetableDays[5] ? 'active-button-day' : 'button-day'}>Суббота
                                </button>
                                <button
                                    value={'Sunday'}
                                    onClick={() => activateWeekday(6)}
                                    className={timetableDays[6] ? 'active-button-day' : 'button-day'}>Воскресенье
                                </button>
                            </div>
                        </div>
                        <div className={'timetable-input'}>
                            <label>Время погрзуки</label>
                            <input type="number" placeholder={'Дни'}
                                   value={prepareDays}
                                   onChange={e => setPrepareDays(e.target.value)}/>
                        </div>
                    </div> : ''
                }
            </div>
            <div className={'services-wrapper'}>
                <div className={'service-title'}>Услуги</div>
                <ServiceContext.Provider
                    value={{additionalServices, setAdditionalServices, rankedServices, setRankedServices}}>
                    <ServiceContainer/>
                </ServiceContext.Provider>
            </div>
            <button onClick={sendRequest} className={'create-hub-button'}>Сохранить</button>
        </div>
    )
}