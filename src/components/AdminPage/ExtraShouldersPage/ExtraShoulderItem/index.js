import React, {useState} from 'react';

import {ADMIN_SERVER_URL} from "../../../../constants/URL";

import trash from "../../../../img/trash-icon.svg";

import './ExtraShoulderItem.scss'
import {adminInstance} from "../../../../api/admin";

const defaultMassRate = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    minimal_price: 0,
    type: 'MASS'
}

const defaultSizeRate = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    minimal_price: 0,
    type: 'SIZE'
}

const defaultLdmRate = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    minimal_price: 0,
    type: 'LDM'
}

const defaultService = {
    name: '',
    price: 0
}

const massRatesFromItem = (item) => {
    let rates = item.rates.filter(rete => {
        return rete.type === 'MASS'
    })
    if (rates.length === 0)
        return [defaultMassRate]
    else
        return rates;
}

const sizeRatesFromItem = (item) => {
    let rates = item.rates.filter(rete => {
        return rete.type === 'SIZE'
    })
    if (rates.length === 0)
        return [defaultSizeRate]
    else
        return rates;
}

const ldmRatesFromItem = (item) => {
    let rates = item.rates.filter(rete => {
        return rete.type === 'LDM'
    })
    if (rates.length === 0)
        return [defaultLdmRate]
    else
        return rates;
}

const UPDATE_RATES_URL = `${ADMIN_SERVER_URL}admin-zones`


const ServiceItem = ({name, price, setValue}) => {

    return (
        <div className={'service-item-wrapper'}>
            <div className={'item'}>
                <label htmlFor="">Название</label>
                <input type="text" value={name}
                       onChange={e => setValue('name', e.target.value)}/>
            </div>
            <div className={'item'}>
                <label htmlFor="">Цена</label>
                <input type="number" value={price}
                       onChange={e => setValue('price', e.target.value)}
                />
            </div>
        </div>
    )
}

const ExtraShoulderItem = ({item}) => {
    const [dataWeight, setDataWeight] = useState(() => massRatesFromItem(item))
    const [dataVolume, setDataVolume] = useState(() => sizeRatesFromItem(item))
    const [dataMeter, setDataMeter] = useState(() => ldmRatesFromItem(item))
    const [activeButtonForWeight, setActiveButtonForWeight] = useState(true)
    const [activeButtonForVolume, setActiveButtonForVolume] = useState(false)
    const [activeButtonForMeter, setActiveButtonForMeter] = useState(false)
    const [markup, setMarkup] = useState(((item.markup - 1) * 100).toFixed(2))
    const [containerMarkup, setContainerMarkup] = useState(((item.container_markup - 1) * 100).toFixed(2))

    const [smallPrice, setSmallPrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'SMALL')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'SMALL')[0].cost : 0
    )
    const [smallWeight, setSmallWeight] = useState(
        item.container_rates.filter(rate => rate.container_type === 'SMALL')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'SMALL')[0].max_mass : 0
    )
    const [smallOverload, setSmallOverload] = useState(
        item.container_rates.filter(rate => rate.container_type === 'SMALL')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'SMALL')[0].price_per_overload : 0
    )

    const [mediumPrice, setMediumPrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].cost : 0
    )
    const [mediumWeight, setMediumWeight] = useState(
        item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].max_mass : 0
    )
    const [mediumOverload, setMediumOverload] = useState(
        item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].price_per_overload : 0
    )

    const [largePrice, setLargePrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'BIG')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'BIG')[0].cost : 0
    )
    const [largeWeight, setLargeWeight] = useState(
        item.container_rates.filter(rate => rate.container_type === 'BIG')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'BIG')[0].max_mass : 0
    )
    const [largeOverload, setLargeOverload] = useState(
        item.container_rates.filter(rate => rate.container_type === 'BIG')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'BIG')[0].price_per_overload : 0
    )
    const [largeMinimalPrice, setLargeMinimalPrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'BIG')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'BIG')[0].minimal_price : 0
    )
    const [mediumMinimalPrice, setMediumMinimalPrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].minimal_price : 0
    )
    const [smallMinimalPrice, setSmallMinimalPrice] = useState(
        item.container_rates.filter(rate => rate.container_type === 'SMALL')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'SMALL')[0].minimal_price : 0
    )

    const [smallServices, setSmallServices] = useState(
        item.container_rates.filter(rate => rate.container_type === 'SMALL')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'SMALL')[0].services : []
    )

    const [mediumServices, setMediumServices] = useState(
        item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'MIDDLE')[0].services : []
    )

    const [largeServices, setLargeServices] = useState(
        item.container_rates.filter(rate => rate.container_type === 'BIG')[0] ?
            item.container_rates.filter(rate => rate.container_type === 'BIG')[0].services : []
    )
    console.log(smallServices)
    const [activeButton, setActiveButton] = useState('small')

    const addWeightItem = () => {
        const newData = [...dataWeight, {...defaultMassRate}]
        setDataWeight(newData)
    }

    const deleteWeightItem = (i) => {
        const newData = [...dataWeight.slice(0, i), ...dataWeight.slice(i + 1)]
        setDataWeight(newData)
    }

    const addVolumeItem = () => {
        const newData = [...dataVolume, {...defaultSizeRate}]
        setDataVolume(newData)
    }

    const deleteVolumeItem = (i) => {
        const newData = [...dataVolume.slice(0, i), ...dataVolume.slice(i + 1)]
        setDataVolume(newData)
    }

    const addMeterItem = () => {
        const newData = [...dataMeter, {...defaultLdmRate}]
        setDataMeter(newData)
    }

    const deleteMeterItem = (i) => {
        const newData = [...dataMeter.slice(0, i), ...dataMeter.slice(i + 1)]
        setDataMeter(newData)
    }

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

    const flatRates = () => {
        let rates = []
        dataWeight.map(rate => {
            rates.push(rate)
        })
        dataVolume.map(rate => {
            rates.push(rate)
        })
        dataMeter.map(rate => {
            rates.push(rate)
        })
        return rates
    }

    const sendRatesData = () => {
        let body = {
            rates: flatRates(),
            markup: (markup / 100) + 1,
            container_markup: (containerMarkup / 100) + 1,
            container_rates: [
                {
                    container_type: 'SMALL',
                    max_mass: smallWeight,
                    cost: smallPrice,
                    price_per_overload: smallOverload,
                    minimal_price: smallMinimalPrice,
                    services: smallServices
                },
                {
                    container_type: 'MIDDLE',
                    max_mass: mediumWeight,
                    cost: mediumPrice,
                    price_per_overload: mediumOverload,
                    minimal_price: mediumMinimalPrice,
                    services: mediumServices
                },
                {
                    container_type: 'BIG',
                    max_mass: largeWeight,
                    cost: largePrice,
                    price_per_overload: largeOverload,
                    minimal_price: largeMinimalPrice,
                    services: largeServices
                }
            ],
        }
        adminInstance.patch(`${UPDATE_RATES_URL}/${item.id}/`, body).then()
    }

    const addSmallService = () => {
        const newData = [...smallServices, defaultService]
        setSmallServices(newData)
    }

    const addMediumService = () => {
        const newData = [...mediumServices, defaultService]
        setMediumServices(newData)
    }
    const addLargeService = () => {
        const newData = [...largeServices, defaultService]
        setLargeServices(newData)
    }

    const deleteSmallService = (i) => {
        console.log(i)
        const newData = [...smallServices.slice(0, i), ...smallServices.slice(i + 1)]
        setSmallServices(newData)
    }

    const deleteMediumService = (i) => {
        const newData = [...mediumServices.slice(0, i), ...mediumServices.slice(i + 1)]
        setMediumServices(newData)
    }

    const deleteLargeService = (i) => {
        const newData = [...largeServices.slice(0, i), ...largeServices.slice(i + 1)]
        setLargeServices(newData)
    }

    const updateDataItemField = (index, field, newValue) => {
        let newData = [...smallServices]
        let newItem = {...newData[index]}
        newItem[field] = newValue
        newData[index] = newItem
        setSmallServices(newData)
    }

    const updateDataMediumItemField = (index, field, newValue) => {
        let newData = [...mediumServices]
        let newItem = {...newData[index]}
        newItem[field] = newValue
        newData[index] = newItem
        setMediumServices(newData)
    }

    const updateDataLargeItemField = (index, field, newValue) => {
        let newData = [...largeServices]
        let newItem = {...newData[index]}
        newItem[field] = newValue
        newData[index] = newItem
        setLargeServices(newData)
    }

    return (
        <div className={'extra-shoulder-item-wrapper'}>
            <div className={'zone-title'}>{item ? item.name : ''}</div>
            <div className={'set-price-title'}>Цена</div>
            <div className={'settings-for-price-wrapper'}>
                <div className={'price-for-type-wrapper'}>
                    <button
                        onClick={weightButtonActiveHandler}
                        className={activeButtonForWeight ? 'active-price-button' : 'price-button'}
                    >Цена за вес груза
                    </button>
                    <button
                        onClick={volumeButtonActiveHandler}
                        className={activeButtonForVolume ? 'active-price-button' : 'price-button'}
                    >Цена за объём груза
                    </button>
                    <button
                        onClick={meterButtonActiveHandler}
                        className={activeButtonForMeter ? 'active-price-button' : 'price-button'}
                    >Цена за погрузочный метр
                    </button>
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
                                        <div className={'price-input'}>
                                            min price:
                                            <input
                                                onChange={e => updateItem('minimal_price', e.target.value)}
                                                type="number"
                                                value={item.minimal_price}/>
                                            <label className={'icon-euro'}>€</label>
                                        </div>
                                        <img src={trash} onClick={() => deleteWeightItem(index)} alt="trash"/>
                                    </div>
                                )
                            })}
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
                                        <div className={'price-input'}>
                                            min price:
                                            <input
                                                onChange={e => updateItem('minimal_price', e.target.value)}
                                                type="number"
                                                value={item.minimal_price}/>
                                            <label className={'icon-euro'}>€</label>
                                        </div>
                                        <img src={trash} onClick={() => deleteVolumeItem(index)} alt="trash"/>
                                    </div>
                                )
                            })}
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
                                        <div className={'price-input'}>
                                            min price:
                                            <input
                                                onChange={e => updateItem('minimal_price', e.target.value)}
                                                type="number"
                                                value={item.minimal_price}/>
                                            <label className={'icon-euro'}>€</label>
                                        </div>
                                        <img src={trash} onClick={() => deleteMeterItem(index)} alt="trash"/>
                                    </div>
                                )
                            })}
                            <button className={'add-button'} onClick={addMeterItem}>Добавить промежуток</button>
                        </div>
                }
            </div>
            <div className={'percent-block'}>
                <label htmlFor="markup">Наценка</label>
                <div className={'input-wrapper'}>
                    <input id={'markup'} type="number" value={markup} onChange={e => setMarkup(e.target.value)}/>
                    <div>%</div>
                </div>
            </div>
            <div className={'settings-for-price-wrapper'}>
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
                            <div>
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
                                    <div className={'container-price-item'}>
                                        <label htmlFor="smallMinimalPrice">Минимальная цена</label>
                                        <input
                                            id={'smallMinimalPrice'}
                                            type="number"
                                            value={smallMinimalPrice}
                                            onChange={e => setSmallMinimalPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={'services-price-wrapper'}>
                                    {smallServices.map((service, index) => {

                                        const updateItem = (field, newValue) => {
                                            updateDataItemField(index, field, newValue)
                                        }

                                        return (
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <ServiceItem
                                                name={service.name}
                                                price={service.price}
                                                setValue={updateItem}
                                              />
                                              <div>
                                                  <img
                                                    src={trash}
                                                    onClick={() => deleteSmallService(index)}
                                                    alt=""
                                                    style={{ marginLeft: 15, width: 20, height: 20 }}
                                                  />
                                              </div>
                                          </div>
                                        )
                                    })}
                                    <button onClick={addSmallService} className={'add-button'}>Добавить сервис</button>
                                </div>
                            </div>
                        }
                        {
                            activeButton === 'medium' &&
                            <div>
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
                                    <div className={'container-price-item'}>
                                        <label htmlFor="mediumMinimalPrice">Минимальная цена</label>
                                        <input
                                            id={'mediumMinimalPrice'}
                                            type="number"
                                            value={mediumMinimalPrice}
                                            onChange={e => setMediumMinimalPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={'services-price-wrapper'}>
                                    {mediumServices.map((service, index) => {

                                        const updateItem = (field, newValue) => {
                                            updateDataMediumItemField(index, field, newValue)
                                        }

                                        return (
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <ServiceItem
                                                name={service.name}
                                                price={service.price}
                                                setValue={updateItem}
                                              />
                                              <div>
                                                  <img
                                                    src={trash}
                                                    onClick={() => deleteMediumService(index)}
                                                    alt=""
                                                    style={{ marginLeft: 15, width: 20, height: 20 }}
                                                  />
                                              </div>
                                          </div>
                                        )
                                    })}
                                    <button onClick={addMediumService} className={'add-button'}>Добавить сервис</button>
                                </div>
                            </div>
                        }
                        {
                            activeButton === 'large' &&
                            <div>
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
                                    <div className={'container-price-item'}>
                                        <label htmlFor="largeMinimalPrice">Минимальная цена</label>
                                        <input
                                            id={'largeMinimalPrice'}
                                            type="number"
                                            value={largeMinimalPrice}
                                            onChange={e => setLargeMinimalPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={'services-price-wrapper'}>
                                    {largeServices.map((service, index) => {

                                        const updateItem = (field, newValue) => {
                                            updateDataLargeItemField(index, field, newValue)
                                        }

                                        return (
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <ServiceItem
                                                name={service.name}
                                                price={service.price}
                                                setValue={updateItem}
                                              />
                                              <div>
                                                  <img
                                                    src={trash}
                                                    onClick={() => deleteLargeService(index)}
                                                    alt=""
                                                    style={{ marginLeft: 15, width: 20, height: 20 }}
                                                  />
                                              </div>
                                          </div>
                                        )
                                    })}
                                    <button onClick={addLargeService} className={'add-button'}>Добавить сервис</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={'percent-block'}>
                <label htmlFor="markup">Наценка</label>
                <div className={'input-wrapper'}>
                    <input id={'markup'} type="number" value={containerMarkup}
                           onChange={e => setContainerMarkup(e.target.value)}/>
                    <div>%</div>
                </div>
            </div>
            <button onClick={sendRatesData} className={'save-button'}>Сохранить</button>
        </div>
    );
};

export default ExtraShoulderItem;
