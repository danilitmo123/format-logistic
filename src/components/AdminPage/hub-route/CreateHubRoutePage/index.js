import React, {useState, useEffect, useRef} from 'react';

import Select, {createFilter} from 'react-select';
import AsyncSelect from 'react-select/async';
import {Link} from 'react-router-dom';
import axios from "axios";

import {filterConfig} from "../../../../templates/filterSelectTemplate";
import {customTheme, typeOfShipping} from "../../../../templates/templatesOfOptions";
import {
    getCountries,
    getCitiesFrom,
    getCitiesTo,
    createModifyCountryObj,
    createModifyCitiesFromObj,
    createModifyCitiesToObj
} from "../../../../templates/templateGetCountryAndCity";
import './HubsPage.scss'
import ServiceContainer from "../../common/serviceBlock/ServiceContainer";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import PriceBlock from "../../common/PriceBlock";

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

let serviceInitData = {
    additionalServices: [],
    rankedServices: []
}

const initRates = () => {
    return [defaultRateMass, defaultRateSize, defaultRateLdm]
}


const CreateHubRoutePage = ({isEditing, hubId}) => {

    const [rates, setRates] = useState(() => initRates())
    const [allCountries, setAllCountries] = useState([])
    const [allCitiesFrom, setAllCitiesFrom] = useState([])
    const [allCitiesTo, setAllCitiesTo] = useState([])
    const [destination, setDestination] = useState(0)
    const [duration, setDuration] = useState(0)
    const [prepareDays, setPrepareDays] = useState('')
    const [modifyCountryObj, setModifyCountryObj] = useState([])
    const [optionCountryFromValue, setOptionCountryFromValue] = useState({})
    const [optionCountryToValue, setOptionCountryToValue] = useState({})
    const [optionCityToValue, setOptionCityToValue] = useState({})
    const [optionCityFromValue, setOptionCityFromValue] = useState({})
    const [typeofShippingOption, setTypeofShippingOption] = useState({})
    const [finalTypeofShipping, setFinalTypeofShipping] = useState('')
    const [modifyCitiesFromObj, setModifyCitiesFromObj] = useState([])
    const [modifyCitiesToObj, setModifyCitiesToObj] = useState([])
    const [activeMonday, setActiveMonday] = useState(false)
    const [activeTuesday, setActiveTuesday] = useState(false)
    const [activeWednesday, setActiveWednesday] = useState(false)
    const [activeThursday, setActiveThursday] = useState(false)
    const [activeFriday, setActiveFriday] = useState(false)
    const [activeSaturday, setActiveSaturday] = useState(false)
    const [activeSunday, setActiveSunday] = useState(false)
    const [activeTimetableDays, setActiveTimetableDays] = useState([])
    const [prevHubData, setPrevHubData] = useState([])
    const [activeTimetable, setActiveTimetable] = useState(true)

    const setData = () => {
        if (isEditing && prevHubData[0] !== undefined) {
            let ratesLDM = []
            let ratesMASS = []
            let ratesSIZE = []

            // 6 раз обхожу список вместо одного но мне похуй
            prevHubData[0].rates.filter(rate => rate.type === 'LDM').map(rate => ratesLDM.push(rate))
            prevHubData[0].rates.filter(rate => rate.type === 'MASS').map(rate => ratesMASS.push(rate))
            prevHubData[0].rates.filter(rate => rate.type === 'SIZE').map(rate => ratesSIZE.push(rate))

        }
    }

    useEffect(() => {
        setData()
    }, [prevHubData])

    const daysObj = {
        'Monday': activeMonday ? 1 : 0,
        'Tuesday': activeTuesday ? 1 : 0,
        'Wednesday': activeWednesday ? 1 : 0,
        'Thursday': activeThursday ? 1 : 0,
        'Friday': activeFriday ? 1 : 0,
        'Saturday': activeSaturday ? 1 : 0,
        'Sunday': activeSunday ? 1 : 0
    }

    const valuesDaysObj = Object.values(daysObj)

    const prevCountryFromValue = useRef()
    const prevCountryToValue = useRef()

    const prevCountryFrom = prevCountryFromValue.current;
    const prevCountryTo = prevCountryToValue.current;

    const shippingOptionHandler = (item) => {
        switch (item.value) {
            case 'Авиафрахт':
                setFinalTypeofShipping('AIR')
                break
            case 'Автомобильная перевозка':
                setFinalTypeofShipping('TRUCK')
                break
            case 'Железнодородная перевозка':
                setFinalTypeofShipping('TRAIN')
                break
            default:
                return ''
        }
    }

    const filterCitiesFrom = (inputValue) => {
        return modifyCitiesFromObj.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptionsFrom = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCitiesFrom(inputValue));
        }, 1000);
    };

    const filterCitiesTo = (inputValue) => {
        return modifyCitiesToObj.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptionsTo = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCitiesTo(inputValue));
        }, 1000);
    };

    const destinationHandler = (e) => {
        setDestination(e.target.value)
    }

    const durationHandler = (e) => {
        setDuration(e.target.value)
    }

    const activeMondayButtonHandler = (e) => {
        setActiveMonday(!activeMonday)
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
    }

    const activeTuesdayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveTuesday(!activeTuesday)
    }
    const activeWednesdayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveWednesday(!activeWednesday)
    }

    const activeThursdayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveThursday(!activeThursday)
    }

    const activeFridayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveFriday(!activeFriday)
    }

    const activeSaturdayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveSaturday(!activeSaturday)
    }

    const activeSundayButtonHandler = (e) => {
        setActiveTimetableDays([...activeTimetableDays, e.target.value])
        setActiveSunday(!activeSunday)
    }

    const prepareDaysHandler = (e) => {
        setPrepareDays(e.target.value)
    }

    const shippingSelectHandler = (newValue) => {
        setTypeofShippingOption(newValue)
        shippingOptionHandler(newValue)
    }

    const allInfoHubsObj = {
        'source': {
            'id': optionCityFromValue.id,
            'name': optionCityFromValue.value
        },
        'destination': {
            'id': optionCityToValue.id,
            'name': optionCityToValue.value,
        },
        'type': finalTypeofShipping,
        'distance': destination,
        'duration': duration * 60 * 24,
        'rates': [...rates],
        'timetable': {
            'weekdays': valuesDaysObj,
            'preparation_period': prepareDays
        }
    }

    const sendRequest = () => {
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        let body = {}

        axios.post(`${ADMIN_SERVER_URL}admin-routes/`, allInfoHubsObj, options)
            .then(res => console.log(res))
    }

    const getHubInfo = () => {
        if (isEditing) {
            axios.get(`${ADMIN_SERVER_URL}admin-routes/${hubId}`)
                .then(res => {
                    setPrevHubData([res.data])
                })
        }
    }

    useEffect(() => {
        getHubInfo()
    }, [])

    useEffect(() => {
        prevCountryFromValue.current = optionCountryFromValue.value;
    }, [optionCountryFromValue.value]);

    useEffect(() => {
        prevCountryToValue.current = optionCountryToValue.value;
    }, [optionCountryToValue.value]);

    useEffect(() => {
        createModifyCountryObj(allCountries, setModifyCountryObj)
    }, [allCountries])

    useEffect(() => {
        createModifyCitiesFromObj(allCitiesFrom, setModifyCitiesFromObj)
    }, [allCitiesFrom])

    useEffect(() => {
        createModifyCitiesToObj(allCitiesTo, setModifyCitiesToObj)
    }, [allCitiesTo])

    useEffect(() => {
        getCountries(setAllCountries)
    }, [])

    useEffect(() => {
        getCitiesFrom(prevCountryFrom, optionCountryFromValue, setAllCitiesFrom)
    }, [optionCountryFromValue.value])

    useEffect(() => {
        getCitiesTo(prevCountryTo, optionCountryToValue, setAllCitiesTo)
    }, [optionCountryToValue.value])

    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>{!isEditing ? 'Добавить плечо' : 'Редактировать плечо'}:</div>
                    <div
                        className={'way-title'}>{isEditing && prevHubData[0] !== undefined ? prevHubData[0].source.name : ''} - {isEditing && prevHubData[0] !== undefined ? prevHubData[0].destination.name : ''}</div>
                </div>
                <Link to={'/admin/hubs'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            <div className={'hubs-settings-wrapper'}>
                <div className={'shipping-title'}>Отправление</div>
                <div className={'shipping-selects-wrapper'}>

                    <div className={'to-select-wrapper'}>
                        <div className={'arrival-country-select'}>
                            <label className={'label-arrival-select'}>Страна прибытия</label>
                            <Select
                                theme={customTheme}
                                onChange={setOptionCountryToValue}
                                options={modifyCountryObj}
                                placeholder={'Страна'}
                                noOptionsMessage={() => `Не найдено`}
                                filterOption={createFilter(filterConfig)}
                            />
                        </div>
                        <div className={'arrival-city-select'}>
                            <label className={'label-arrival-select'}>Город прибытия</label>
                            <AsyncSelect
                                theme={customTheme}
                                loadOptions={loadOptionsTo}
                                onChange={setOptionCityToValue}
                                options={modifyCitiesToObj}
                                placeholder={'Город'}
                                noOptionsMessage={() => `Не найдено`}
                                filterOption={createFilter(filterConfig)}
                            />
                        </div>
                    </div>
                    <div className={'type-of-place-select'}>
                        <label className={'label-shipping-select'}>Вид перевозки</label>
                        <Select
                            theme={customTheme}
                            options={typeOfShipping}
                            onChange={shippingSelectHandler}
                            noOptionsMessage={() => `Не найдено`}
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
                                value={destination}
                                onChange={destinationHandler}
                                type="text"
                                placeholder={'Расстояния'}/>
                        </div>
                        <div className={'duration-wrapper'}>
                            <label>Дни</label>
                            <input
                                value={duration}
                                placeholder={'Дни'}
                                type="number"
                                onChange={durationHandler}/>
                        </div>
                    </div>
                </div>
                <PriceBlock initialRates={rates}/>
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
                                        onClick={activeMondayButtonHandler}
                                        className={activeMonday ? 'active-button-day' : 'button-day'}>Понедельник
                                    </button>
                                    <button
                                        value={'Tuesday'}
                                        onClick={activeTuesdayButtonHandler}
                                        className={activeTuesday ? 'active-button-day' : 'button-day'}>Вторник
                                    </button>
                                    <button
                                        value={'Wednesday'}
                                        onClick={activeWednesdayButtonHandler}
                                        className={activeWednesday ? 'active-button-day' : 'button-day'}>Среда
                                    </button>
                                    <button
                                        value={'Thursday'}
                                        onClick={activeThursdayButtonHandler}
                                        className={activeThursday ? 'active-button-day' : 'button-day'}>Четверг
                                    </button>
                                    <button
                                        value={'Friday'}
                                        onClick={activeFridayButtonHandler}
                                        className={activeFriday ? 'active-button-day' : 'button-day'}>Пятница
                                    </button>
                                    <button
                                        value={'Saturday'}
                                        onClick={activeSaturdayButtonHandler}
                                        className={activeSaturday ? 'active-button-day' : 'button-day'}>Суббота
                                    </button>
                                    <button
                                        value={'Sunday'}
                                        onClick={activeSundayButtonHandler}
                                        className={activeSunday ? 'active-button-day' : 'button-day'}>Воскресенье
                                    </button>
                                </div>
                            </div>
                            <div className={'timetable-input'}>
                                <label>Время погрзуки</label>
                                <input type="number" placeholder={'Дни'}
                                       value={isEditing && prevHubData[0] !== undefined ? prevHubData[0].timetable.preparation_period : ''}
                                       onChange={prepareDaysHandler}/>
                            </div>
                        </div> : ''
                    }
                </div>
                <div className={'services-wrapper'}>
                    <div className={'service-title'}>Услуги</div>
                    <ServiceContainer initData={serviceInitData} routId={hubId}/>
                </div>
            </div>
            <button onClick={sendRequest}
                    className={'create-hub-button'}>{!isEditing ? 'Создать' : 'Сохранить изменения'}</button>
        </section>
    );
};

export default CreateHubRoutePage;