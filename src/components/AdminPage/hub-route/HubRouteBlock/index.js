import React, {useState} from "react";

import {PlaceDispatcherContext} from "../../common/place/placeContext";
import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";
import {RatesContext} from "../../common/price/PriceContext";
import {ServiceContext} from "../../common/service/ServiceContext";
import {useRefReducer, useRefSetter} from "../../../../utils/useRef";
import {ShippingType} from "../../../../constants/unit";
import {Link} from 'react-router-dom'

import PriceBlock from "../../common/price/PriceBlock";
import {PlaceSelectBlock} from "../../common/place/PlaceSelectBlock";
import ServiceContainer from "../../common/service/serviceBlock/ServiceContainer";

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
const labelTypeOfShipping = {
    [ShippingType.AIR]: "Авиафрахт",
    [ShippingType.TRAIN]: "Железнодородная перевозка",
    [ShippingType.TRUCK]: "Автомобильная перевозка",
    [ShippingType.SEA]: 'Морская перевозка'
}
const typeOfShippingOptions = [
    {value: ShippingType.AIR, label: labelTypeOfShipping[ShippingType.AIR], id: ShippingType.AIR},
    {value: ShippingType.TRUCK, label: labelTypeOfShipping[ShippingType.TRUCK], id: ShippingType.TRUCK},
    {value: ShippingType.TRAIN, label: labelTypeOfShipping[ShippingType.TRAIN], id: ShippingType.TRAIN},
    {value: ShippingType.SEA, label: labelTypeOfShipping[ShippingType.SEA], id: ShippingType.SEA}
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

export const HubRouteBlock = ({initData, onSubmit}) => {

    const [distance, setDistance] = useState(initData.distance ? initData.distance : 0)
    const [duration, setDuration] = useState(initData.duration ? initData.duration : 0)

    const [activeTimetable, setActiveTimetable] = useState(!!initData.timetable)
    const [timetableDays, setTimetableDays] = useState(initData.timetable ? initData.timetable.weekdays : [0, 0, 0, 0, 0, 0, 0])
    const [prepareDays, setPrepareDays] = useState(initData.timetable ? initData.timetable.preparation_period : 0)

    const [places, dispatchPlaces] = useRefReducer(placeReducer, placeObjectFromInitData(initData))
    const [typeOfShipping, setTypeOfShipping] = useRefSetter(initData.type ? initData.type : typeOfShippingOptions[0].value)
    const [rates, setRates] = useState(() => initRates(initData))
    const [additionalServices, setAdditionalServices] = useState(initData.additional_services ? initData.additional_services : [])
    const [rankedServices, setRankedServices] = useState(initData.ranked_services ? initData.ranked_services : [])

    const [minimalPrice, setMinimalPrice] = useState(initData.minimal_price ? initData.minimal_price : 0)
    const [validityOfTariff, setValidity] = useState(initData.rates_valid_to ? initData.rates_valid_to : '')

    const [active, setActive] = useState(initData.active ? initData.active : false)
    const [title, setTitle] = useState(initData.title ? initData.title : '')

    const [isStorageFrom, setStorageFrom] = useState(initData.source_is_storage ? initData.source_is_storage : false)
    const [isStorageTo, setStorageTo] = useState(initData.destination_is_storage ? initData.destination_is_storage : false)

    const [additionalInfoData, setAdditionalInfo] = useState(initData.description ? initData.description.split('\n\n') : [])
    const [additionalPoint, setPoint] = useState('')

    const [markup, setMarkup] = useState(initData.markup ? ((initData.markup - 1) * 100).toFixed(2) : 0)

    const activateWeekday = (dayInd) => {
        timetableDays[dayInd] = timetableDays[dayInd] ? 0 : 1
        setTimetableDays([...timetableDays])
    }

    const addAdditionalPoint = () => {
        setAdditionalInfo([...additionalInfoData, additionalPoint])
        setPoint('')
    }

    const deleteAdditionalPoint = (i) => {
        const newData = [...additionalInfoData.slice(0, i), ...additionalInfoData.slice(i + 1)]
        setAdditionalInfo(newData)
    }

    const submit = () => {
        onSubmit({
            sourceId: places.current.cityFrom.id,
            destinationId: places.current.cityTo.id,
            distance,
            duration,
            rates: rates.filter(rate => {
                return !!rate
            }),
            typeOfShipping: typeOfShipping.current,
            additionalServices: additionalServices.filter(service => {
                return !!service
            }),
            rankedServices: rankedServices.filter(service => {
                return !!service
            }),
            timetableDays,
            prepareDays,
            activeTimetable,
            minimalPrice,
            ratesValidTo: validityOfTariff,
            active: active,
            title: title,
            source_is_storage: isStorageFrom,
            destination_is_storage: isStorageTo,
            description: additionalInfoData.join('\n\n'),
            markup: (markup / 100) + 1
        })
    }

    return (
        <div className={'hubs-settings-wrapper'}>
            <div className={'rate-wrapper'}>
                <label htmlFor={'title'} className={'rate-title'}>Название плеча</label>
                <input id={'title'} type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className={'shipping-title'}>Отправление</div>
            <PlaceDispatcherContext.Provider value={{dispatch: dispatchPlaces}}>
                <PlaceSelectBlock
                    titleCountry={"Страна отправки"}
                    titleCity={"Город отправки"}
                    dispatchKey={"from"}
                />
                <PlaceSelectBlock
                    titleCountry={"Страна прибытия"}
                    titleCity={"Город прибытия"}
                    dispatchKey={"to"}
                />
            </PlaceDispatcherContext.Provider>
            <div className={'shipping-selects-wrapper'}>
                <div className={'type-of-place-select'}>
                    <label className={'label-shipping-select'}>Вид перевозки</label>
                    <Select
                        theme={customTheme}
                        options={typeOfShippingOptions}
                        onChange={({value}) => setTypeOfShipping(value)}
                        noOptionsMessage={() => `Не найдено`}
                        defaultValue={{
                            value: initData.type ? initData.type : typeOfShippingOptions[0].value,
                            label: initData.type ? labelTypeOfShipping[initData.type] : typeOfShippingOptions[0].label
                        }}
                        placeholder={'Перевозка'}
                        filterOption={createFilter(filterConfig)}
                    />
                </div>
            </div>
            <div className={'isStorage-wrapper'}>
                <div className={'isStorage-title'}>Внести точку А хабового плеча в 'Наш склад'</div>
                <input type="checkbox" onChange={() => setStorageFrom(!isStorageFrom)} checked={isStorageFrom}/>
            </div>
            <div className={'isStorage-wrapper'}>
                <div className={'isStorage-title'}>Внести точку B хабового плеча в 'Наш склад'</div>
                <input type="checkbox" onChange={() => setStorageTo(!isStorageTo)} checked={isStorageTo}/>
            </div>
            <div className={'upload-dest-and-dur'}>
                <div className={'upload-title'}>Расстояние и время</div>
                <div className={'upload-inputs-wrapper'}>
                    <div className={'destination-wrapper'}>
                        <label>Расстояние (км)</label>
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
            <div className={'rate-wrapper'}>
                <label className={'rate-title'}>Срок действия тарифов</label>
                <input type="date" value={validityOfTariff} onChange={e => setValidity(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="markup">Наценка
                    <input id={'markup'} type="number" value={markup} onChange={e => setMarkup(e.target.value)}/>%
                </label>
            </div>
            <div className={'active-panel'}>
                <label htmlFor={'active'}>Активно</label>
                <input id={'active'} type="checkbox" checked={active} onChange={() => setActive(!active)}/>
            </div>
            <div className={'minimal-price-wrapper'}>
                <label>Минимальная ставка</label>
                <input type="number" value={minimalPrice} onChange={e => setMinimalPrice(e.target.value)}/>
            </div>
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
            <div className={'additional-block'}>
                <div className={'additional-title'}>Дополнительное описание хабового плеча</div>
                <div className={'add-point-block'}>
            <textarea
                value={additionalPoint}
                onChange={(e) => setPoint(e.target.value)}
            />
            <div>
              <button
                  className={'add-point-btn'}
                  onClick={addAdditionalPoint}
                  disabled={!additionalPoint}
              >Добавить
              </button>
            </div>
          </div>
          {additionalInfoData.map((point, index) => {
            return (
                <div className={'point-wrapper'}>
                  <button
                      className={'delete-point-btn'}
                      onClick={() => deleteAdditionalPoint(index)}
                  >x
                  </button>
                  <div className={'number'}>{index + 1})</div>
                  <div>{point}</div>
                </div>
                )})}
            </div>
            <Link to={'/admin/hub-routes'}>
                <button onClick={submit} className={'create-hub-button'}>Сохранить</button>
            </Link>
        </div>
    )
}