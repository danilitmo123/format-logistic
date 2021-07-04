import React, {useState, useEffect, useRef} from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {Link} from 'react-router-dom';
import axios from "axios";

import {customTheme, typeOfShipping} from "../../../templates/templatesOfOptions";
import {
  getCountries,
  getCitiesFrom,
  getCitiesTo,
  createModifyCountryObj,
  createModifyCitiesFromObj,
  createModifyCitiesToObj
} from "../../../templates/templateGetCountryAndCity";

import trash from '../../../img/trash-icon.svg'

import './HubsPage.scss'

const objectWeightTemplate = {
  range_from: 0,
  range_to: 0,
  price_per_unit: 0,
  type: 'MASS'
}

const objectVolumeTemplate = {
  range_from: 0,
  range_to: 0,
  price_per_unit: 0,
  type: 'SIZE'
}

const objectMeterTemplate = {
  range_from: 0,
  range_to: 0,
  price_per_unit: 0,
  type: 'LDM'
}

const AddHubsPage = ({isEditing, hubId}) => {

  const [dataWeight, setDataWeight] = useState([objectWeightTemplate])
  const [dataVolume, setDataVolume] = useState([objectVolumeTemplate])
  const [dataMeter, setDataMeter] = useState([objectMeterTemplate])
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
  const [modifyCitiesFromObj ,setModifyCitiesFromObj] = useState([])
  const [modifyCitiesToObj ,setModifyCitiesToObj] = useState([])
  const [activeButtonForWeight, setActiveButtonForWeight] = useState(true)
  const [activeButtonForVolume, setActiveButtonForVolume] = useState(false)
  const [activeButtonForMeter, setActiveButtonForMeter] = useState(false)
  const [activeMonday, setActiveMonday] = useState(false)
  const [activeTuesday, setActiveTuesday] = useState(false)
  const [activeWednesday, setActiveWednesday] = useState(false)
  const [activeThursday, setActiveThursday] = useState(false)
  const [activeFriday, setActiveFriday] = useState(false)
  const [activeSaturday, setActiveSaturday] = useState(false)
  const [activeSunday, setActiveSunday] = useState(false)
  const [activeTimetableDays, setActiveTimetableDays] = useState([])
  const [prevHubData, setPrevHubData] = useState([])
  const [prevCountry, setPrevCountry] = useState('')

  const setData = () => {
    if(isEditing && prevHubData[0] !== undefined) {
      prevHubData[0].rates.map(item => {
        switch (item.type) {
          case 'LDM':
            const ldmObj = {
              range_from: item.range_from,
              range_to: item.range_to,
              price_per_unit: item.price_per_unit,
              type: 'LDM'
            }
            setDataMeter([ldmObj])
            break
          case 'MASS':
            const massObj = {
              range_from: item.range_from,
              range_to: item.range_to,
              price_per_unit: item.price_per_unit,
              type: 'MASS'
            }
            setDataWeight([massObj])
            break
          case 'SIZE':
            const sizeObj = {
              range_from: item.range_from,
              range_to: item.range_to,
              price_per_unit: item.price_per_unit,
              type: 'SIZE'
            }
            console.log(sizeObj)
            setDataVolume([sizeObj])
            break
        }
      })
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
    'rates': [
        ...dataWeight,
        ...dataMeter,
        ...dataVolume
    ],
    'timetable': {
      'weekdays': valuesDaysObj,
      'preparation_period': prepareDays
    }
  }

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

  const addWeightItem = () => {
    const newData = [...dataWeight, {...objectWeightTemplate}]
    setDataWeight(newData)
  }

  const deleteWeightItem = (i) => {
    const newData = [...dataWeight.slice(0, i), ...dataWeight.slice(i + 1)]
    setDataWeight(newData)
  }

  const addVolumeItem = () => {
    const newData = [...dataVolume, {...objectVolumeTemplate}]
    setDataVolume(newData)
  }

  const deleteVolumeItem = (i) => {
    const newData = [...dataVolume.slice(0, i), ...dataVolume.slice(i + 1)]
    setDataVolume(newData)
  }

  const addMeterItem = () => {
    const newData = [...dataMeter, {...objectMeterTemplate}]
    setDataMeter(newData)
  }

  const deleteMeterItem = (i) => {
    const newData = [...dataMeter.slice(0, i), ...dataMeter.slice(i + 1)]
    setDataMeter(newData)
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

  const volumeButtonActiveHandler = () => {
    setActiveButtonForMeter(false)
    setActiveButtonForWeight(false)
    setActiveButtonForVolume(true)
  }

  const weightButtonActiveHandler = () => {
    setActiveButtonForMeter(false)
    setActiveButtonForWeight(true)
    setActiveButtonForVolume(false)
  }
  const meterButtonActiveHandler = () => {
    setActiveButtonForMeter(true)
    setActiveButtonForWeight(false)
    setActiveButtonForVolume(false)
  }

  const updateDataWeightItemField = (index, field, newValue) => {
    let newData = [...dataWeight]
    let newItem = {...newData[index]}
    newItem[field] = newValue
    newData[index] = newItem
    setDataWeight(newData)
  }

  const updateDataVolumeItemField = (index, field, newValue) => {
    let newData = [...dataVolume]
    let newItem = {...newData[index]}
    newItem[field] = newValue
    newData[index] = newItem
    setDataVolume(newData)
  }

  const updateDataMeterItemField = (index, field, newValue) => {
    let newData = [...dataMeter]
    let newItem = {...newData[index]}
    newItem[field] = newValue
    newData[index] = newItem
    setDataMeter(newData)
  }

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

  const sendRequest = () => {
    const options = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios.post('https://ancient-temple-39835.herokuapp.com/api-admin/admin-routes/', allInfoHubsObj,options)
        .then(res => console.log(res))
  }

  const getHubInfo = () => {
    if(isEditing) {
      axios.get(`https://ancient-temple-39835.herokuapp.com/api-admin/admin-routes/${hubId}`)
          .then(res => {setPrevHubData([res.data])})
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

  const getPrevCountries = () => {
    if(isEditing && prevHubData[0] !== undefined) {
      setPrevCountry(prevHubData[0].source.name)
    }
  }

  useEffect(() => {
    getPrevCountries()
  }, [])

  return (
      <section className={'hubs-page-wrapper'}>
        <div className={'top-hubs-tile'}>
          <div className={'title'}>
              <div className={'hubs-title'}>{!isEditing ? 'Добавить плечо' : 'Редактировать плечо'}:</div>
              <div className={'way-title'}>{isEditing && prevHubData[0] !== undefined ? prevHubData[0].source.name : ''} - {isEditing && prevHubData[0] !== undefined ? prevHubData[0].destination.name : ''}</div>
          </div>
         <Link to={'/admin/hubs'}>
           <button className={'back-to-hubs-button'}>Вернуться</button>
         </Link>
        </div>
        <div className={'hubs-settings-wrapper'}>
          <div className={'shipping-title'}>Отправление</div>
          <div className={'shipping-selects-wrapper'}>
            <div className={'from-select-wrapper'}>
              <div className={'departure-country-select'}>
                <label className={'label-departure-select'}>Страна отправления</label>
                <Select
                    theme={customTheme}
                    onChange={setOptionCountryFromValue}
                    options={modifyCountryObj}
                    placeholder={'Страна'}
                    noOptionsMessage={() => `Не найдено 🖕`}
                />
              </div>
              <div className={'departure-city-select'}>
                <label className={'label-departure-select'}>Город отправления</label>
                <AsyncSelect
                    theme={customTheme}
                    loadOptions={loadOptionsFrom}
                    onChange={setOptionCityFromValue}
                    options={modifyCitiesFromObj}
                    placeholder={'Город'}
                    noOptionsMessage={() => `Не найдено 🖕`}
                />
              </div>
            </div>
            <div className={'to-select-wrapper'}>
              <div className={'arrival-country-select'}>
                <label className={'label-arrival-select'}>Страна прибытия</label>
                <Select
                    theme={customTheme}
                    onChange={setOptionCountryToValue}
                    options={modifyCountryObj}
                    placeholder={'Страна'}
                    noOptionsMessage={() => `Не найдено 🖕`}
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
                    noOptionsMessage={() => `Не найдено 🖕`}
                />
              </div>
            </div>
            <div className={'type-of-place-select'}>
              <label className={'label-shipping-select'}>Вид перевозки</label>
              <Select
                  theme={customTheme}
                  options={typeOfShipping}
                  onChange={shippingSelectHandler}
                  noOptionsMessage={() => `Не найдено 🖕`}
                  placeholder={'Перевозка'}
              />
            </div>
          </div>
          <div className={'upload-dest-and-dur'}>
            <div className={'upload-title'}>Расстояние и время</div>
            <div className={'upload-inputs-wrapper'}>
              <div className={'destination-wrapper'}>
                <label>Расстояние</label>
                <input
                    value={isEditing && prevHubData[0] !== undefined ? prevHubData[0].distance : ''}
                    onChange={destinationHandler}
                    type="text"
                    placeholder={'Расстояния'}/>
              </div>
              <div className={'duration-wrapper'}>
                <label>Дни</label>
                <input
                    value={isEditing && prevHubData[0] !== undefined ? prevHubData[0].duration : ''}
                    placeholder={'Дни'}
                    type="number"
                    onChange={durationHandler}/>
              </div>
            </div>
          </div>
          <div className={'set-price-wrapper'}>
            <div className={'set-price-title'}>Цена</div>
            <div className={'settings-for-price-wrapper'}>
              <div className={'price-for-type-wrapper'}>
                <button
                    onClick={weightButtonActiveHandler}
                    className={activeButtonForWeight ? 'active-price-button': 'price-button'}
                >Цена за вес груза</button>
                <button
                    onClick={volumeButtonActiveHandler}
                    className={activeButtonForVolume ? 'active-price-button': 'price-button'}
                >Цена за объём груза</button>
                <button
                    onClick={meterButtonActiveHandler}
                    className={activeButtonForMeter ? 'active-price-button': 'price-button'}
                >Цена за погрузочный метр</button>
              </div>
              {
                activeButtonForWeight ?
                    <div className={'weight-settings-wrapper'}>
                      {dataWeight.map((item, index) => {

                        const updateItem = (field, newValue) => {
                          updateDataWeightItemField(index, field, newValue)
                        }

                        return (
                            <div className={'inputs-wrapper'}>
                              <div className={'start-input'}>
                                <label>от</label>
                                <input
                                    onChange={e => updateItem('range_from', e.target.value)}
                                    type="number"
                                    value={item.range_from}/>
                              </div>
                              <div className={'end-input'}>
                                <label>до</label>
                                <input
                                    onChange={e => updateItem('range_to', e.target.value)}
                                    type="number"
                                    value={item.range_to}/>
                              </div>
                              <div className={'weight-unit'}>кг</div>
                              <div className={'price-input'}>
                                <input
                                    onChange={e => updateItem('price_per_unit', e.target.value)}
                                    type="number"
                                    value={item.price_per_unit}/>
                                <label className={'icon-euro'}>€</label>
                              </div>
                              <img src={trash} onClick={() => deleteWeightItem(index)} alt="trash"/>
                            </div>
                        )})}
                      <button className={'add-button'} onClick={addWeightItem}>Добавить промежуток</button>
                    </div>
                    : activeButtonForVolume ?
                    <div className={'weight-settings-wrapper'}>
                      {dataVolume.map((item, index) => {

                        const updateItem = (field, newValue) => {
                          updateDataVolumeItemField(index, field, newValue)
                        }

                        return (
                            <div className={'inputs-wrapper'}>
                              <div className={'start-input'}>
                                <label>от</label>
                                <input
                                    onChange={e => updateItem('range_from', e.target.value)}
                                    type="number"
                                    value={item.range_from}/>
                              </div>
                              <div className={'end-input'}>
                                <label>до</label>
                                <input
                                    onChange={e => updateItem('range_to', e.target.value)}
                                    type="number"
                                    value={item.range_to}/>
                              </div>
                              <div className={'weight-unit'}>см³</div>
                              <div className={'price-input'}>
                                <input
                                    onChange={e => updateItem('price_per_unit', e.target.value)}
                                    type="number"
                                    value={item.price_per_unit}/>
                                <label className={'icon-euro'}>€</label>
                              </div>
                              <img src={trash} onClick={() => deleteVolumeItem(index)} alt="trash"/>
                            </div>
                        )})}
                      <button className={'add-button'} onClick={addVolumeItem}>Добавить промежуток</button>
                    </div>
                    :
                    <div className={'weight-settings-wrapper'}>
                      {dataMeter.map((item, index) => {

                        const updateItem = (field, newValue) => {
                          updateDataMeterItemField(index, field, newValue)
                        }

                        return (
                            <div className={'inputs-wrapper'}>
                              <div className={'start-input'}>
                                <label>от</label>
                                <input
                                    onChange={e => updateItem('range_from', e.target.value)}
                                    type="number"
                                    value={item.range_from}/>
                              </div>
                              <div className={'end-input'}>
                                <label>до</label>
                                <input
                                    onChange={e => updateItem('range_to', e.target.value)}
                                    type="number"
                                    value={item.range_to}/>
                              </div>
                              <div className={'weight-unit'}>LDM</div>
                              <div className={'price-input'}>
                                <input
                                    onChange={e => updateItem('price_per_unit', e.target.value)}
                                    type="number"
                                    value={item.price_per_unit}/>
                                <label className={'icon-euro'}>€</label>
                              </div>
                              <img src={trash} onClick={() => deleteMeterItem(index)} alt="trash"/>
                            </div>
                        )})}
                      <button className={'add-button'} onClick={addMeterItem}>Добавить промежуток</button>
                    </div>
              }
            </div>
          </div>
          <div className={'timetable-wrapper'}>
            <div className={'timetable-title'}>Расписание</div>
              <div className={'timetable'}>
                <div className={'days-and-buttons-wrapper'}>
                  <div className={'timetable-days'}>Дни недели</div>
                  <div className={'buttons-wrapper'}>
                    <button
                        value={'Monday'}
                        onClick={activeMondayButtonHandler}
                        className={activeMonday ? 'active-button-day': 'button-day'}>Понедельник</button>
                    <button
                        value={'Tuesday'}
                        onClick={activeTuesdayButtonHandler}
                        className={activeTuesday ? 'active-button-day': 'button-day'}>Вторник</button>
                    <button
                        value={'Wednesday'}
                        onClick={activeWednesdayButtonHandler}
                        className={activeWednesday ? 'active-button-day': 'button-day'}>Среда</button>
                    <button
                        value={'Thursday'}
                        onClick={activeThursdayButtonHandler}
                        className={activeThursday ? 'active-button-day': 'button-day'}>Четверг</button>
                    <button
                        value={'Friday'}
                        onClick={activeFridayButtonHandler}
                        className={activeFriday ? 'active-button-day': 'button-day'}>Пятница</button>
                    <button
                        value={'Saturday'}
                        onClick={activeSaturdayButtonHandler}
                        className={activeSaturday ? 'active-button-day': 'button-day'}>Суббота</button>
                    <button
                        value={'Sunday'}
                        onClick={activeSundayButtonHandler}
                        className={activeSunday ? 'active-button-day': 'button-day'}>Воскресенье</button>
                  </div>
                </div>
                <div className={'timetable-input'}>
                  <label>Время погрзуки</label>
                  <input type="number" placeholder={'Дни'} value={isEditing && prevHubData[0] !== undefined ? prevHubData[0].timetable.preparation_period : ''} onChange={prepareDaysHandler}/>
                </div>
              </div>
            </div>
          <div className={'services-wrapper'}>
            <div className={'service-title'}>Услуги</div>
          </div>
        </div>
          <button onClick={sendRequest} className={'create-hub-button'}>Создать</button>

      </section>
  );
};

export default AddHubsPage;