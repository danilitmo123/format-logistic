import React, {useState} from "react";

import {PlaceDispatcherContext} from "../../common/place/placeContext";
import Select, {createFilter} from "react-select";
import {customTheme} from "../../../../templates/templatesOfOptions";
import {filterConfig} from "../../../../templates/filterSelectTemplate";
import {RatesContext} from "../../common/price/PriceContext";
import {ServiceContext} from "../../common/service/ServiceContext";
import {useRefReducer, useRefSetter} from "../../../../utils/useRef";
import {Link} from 'react-router-dom'

import PriceBlock from "../../common/price/PriceBlock";
import {PlaceSelectBlock} from "../../common/place/PlaceSelectBlock";
import ServiceContainer from "../../common/service/serviceBlock/ServiceContainer";
import {ShippingType} from "../../../../constants/unit";


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

export const ContainerRouteBlock = ({initData, onSubmit}) => {

    const [distance, setDistance] = useState(initData.distance ? initData.distance : 0)
    const [duration, setDuration] = useState(initData.duration ? initData.duration : 0)

    const [activeTimetable, setActiveTimetable] = useState(!!initData.timetable)
    const [timetableDays, setTimetableDays] = useState(initData.timetable ? initData.timetable.weekdays : [0, 0, 0, 0, 0, 0, 0])
    const [prepareDays, setPrepareDays] = useState(initData.timetable ? initData.timetable.preparation_period : 0)

    const [places, dispatchPlaces] = useRefReducer(placeReducer, placeObjectFromInitData(initData))
    const [typeOfShipping, setTypeOfShipping] = useRefSetter(initData.type ? initData.type : typeOfShippingOptions[0].value)
    const [additionalServices, setAdditionalServices] = useState(initData.additional_services ? initData.additional_services : [])
    const [rankedServices, setRankedServices] = useState(initData.ranked_services ? initData.ranked_services : [])

    const [validityOfTariff, setValidity] = useState(initData.rates_valid_to ? initData.rates_valid_to : '')

    const [active, setActive] = useState(initData.active ? initData.active : false)
    const [title, setTitle] = useState(initData.title ? initData.title : '')

    const [additionalInfoData, setAdditionalInfo] = useState(initData.description ? initData.description.split('\n\n') : [])
    const [additionalPoint, setPoint] = useState('')

    const [markup, setMarkup] = useState(initData.markup ? ((initData.markup - 1) * 100).toFixed(2) : 0)

    const [smallPrice, setSmallPrice] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'SMALL')[0].cost ?
            initData.container_rates.filter(rate => rate.container_type === 'SMALL')[0].cost : 0
    )
    const [smallWeight, setSmallWeight] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'SMALL')[0].max_mass ?
        initData.container_rates.filter(rate => rate.container_type === 'SMALL')[0].max_mass : 0
    )
    const [smallOverload, setSmallOverload] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'SMALL')[0].price_per_overload ?
        initData.container_rates.filter(rate => rate.container_type === 'SMALL')[0].price_per_overload : 0
    )

    const [mediumPrice, setMediumPrice] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'MIDDLE')[0].cost ?
            initData.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].cost : 0
    )
    const [mediumWeight, setMediumWeight] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'MIDDLE')[0].max_mass ?
            initData.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].max_mass : 0
    )
    const [mediumOverload, setMediumOverload] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'MIDDLE')[0].price_per_overload ?
            initData.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].price_per_overload : 0
    )

    const [largePrice, setLargePrice] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'BIG')[0].cost ?
            initData.container_rates.filter(rate => rate.container_type === 'BIG')[0].cost : 0
    )
    const [largeWeight, setLargeWeight] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'BIG')[0].max_mass ?
            initData.container_rates.filter(rate => rate.container_type === 'BIG')[0].max_mass : 0
    )
    const [largeOverload, setLargeOverload] = useState(
        initData?.container_rates?.filter(rate => rate.container_type === 'BIG')[0].price_per_overload ?
            initData.container_rates.filter(rate => rate.container_type === 'BIG')[0].price_per_overload : 0
    )

    const [activeButton, setActiveButton] = useState('small')

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
            containerRates: [
                {
                    container_type: 'SMALL',
                    max_mass: smallWeight,
                    cost: smallPrice,
                    price_per_overload: smallOverload
                },
                {
                    container_type: 'MIDDLE',
                    max_mass: mediumWeight,
                    cost: mediumPrice,
                    price_per_overload: mediumOverload
                },
                {
                    container_type: 'BIG',
                    max_mass: largePrice,
                    cost: largePrice,
                    price_per_overload: largeOverload
                }
            ],
            cargo_type: 'CONTAINER',
            ratesValidTo: validityOfTariff ? validityOfTariff : '9999-12-31',
            active: active,
            title: title,
            description: additionalInfoData.join('\n\n'),
            markup: (markup / 100) + 1,
            source_is_storage: false,
            destination_is_storage: false
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
            <div className={'settings-for-price-wrapper'}>
                <div className={'set-price-title'}>Цена</div>
                <div className={'price-block-wrapper'}>
                    <div className={'price-for-type-wrapper'}>
                        <button
                            value={'small'}
                            className={activeButton === 'small' ? 'active-price-button' : 'price-button'}
                            onClick={() => setActiveButton('small')}
                        >20'
                        </button>
                        <button
                            value={'medium'}
                            className={activeButton === 'medium' ? 'active-price-button' : 'price-button'}
                            onClick={() => setActiveButton('medium')}
                        >40'
                        </button>
                        <button
                            value={'large'}
                            className={activeButton === 'large' ? 'active-price-button' : 'price-button'}
                            onClick={() => setActiveButton('large')}
                        >40'HC
                        </button>
                    </div>
                    <div className={'weight-settings-wrapper'}>
                        {
                            activeButton === 'small' &&
                            <div className={'container-price-wrapper'}>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за контейнер</label>
                                    <input
                                        value={smallPrice}
                                        type="number"
                                        onChange={e => setSmallPrice(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Максимальная масса</label>
                                    <input
                                        value={smallWeight}
                                        type="number"
                                        onChange={e => setSmallWeight(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за перегруз</label>
                                    <input
                                        value={smallOverload}
                                        type="number"
                                        onChange={e => setSmallOverload(e.target.value)}
                                    />
                                </div>
                            </div>
                        }
                        {
                            activeButton === 'medium' &&
                            <div className={'container-price-wrapper'}>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за контейнер</label>
                                    <input
                                        value={mediumPrice}
                                        type="number"
                                        onChange={e => setMediumPrice(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Максимальная масса</label>
                                    <input
                                        value={mediumWeight}
                                        type="number"
                                        onChange={e => setMediumWeight(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за перегруз</label>
                                    <input
                                        value={mediumOverload}
                                        type="number"
                                        onChange={e => setMediumOverload(e.target.value)}
                                    />
                                </div>
                            </div>
                        }
                        {
                            activeButton === 'large' &&
                            <div className={'container-price-wrapper'}>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за контейнер</label>
                                    <input
                                        value={largePrice}
                                        type="number"
                                        onChange={e => setLargePrice(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Максимальная масса</label>
                                    <input
                                        value={largeWeight}
                                        type="number"
                                        onChange={e => setLargeWeight(e.target.value)}
                                    />
                                </div>
                                <div className={'container-price-item'}>
                                    <label htmlFor="">Цена за перегруз</label>
                                    <input
                                        value={largeOverload}
                                        type="number"
                                        onChange={e => setLargeOverload(e.target.value)}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={'rate-wrapper'}>
                <label className={'rate-title'}>Срок действия тарифов</label>
                <input type="date" value={validityOfTariff} onChange={e => setValidity(e.target.value)}/>
            </div>
            <div className={'extra-change-wrapper'}>
                <label htmlFor="markup" className={'extra-change-title'}>Наценка</label>
                <div className={'extra-change-input'}>
                    <input id={'markup'} type="number" value={markup} onChange={e => setMarkup(e.target.value)}/>
                    <div className={'percent'}>%</div>
                </div>
            </div>
            <div className={'active-panel'}>
                <label htmlFor={'active'}>Активно</label>
                <input id={'active'} type="checkbox" checked={active} onChange={() => setActive(!active)}/>
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
                    )
                })}
            </div>
            <Link to={'/admin/hub-routes'}>
                <button onClick={submit} className={'create-hub-button'}>Сохранить</button>
            </Link>
        </div>
    )
}