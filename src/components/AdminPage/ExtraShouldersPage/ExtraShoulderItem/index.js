import React, {useState} from 'react';

import './ExtraShoulderItem.scss'
import trash from "../../../../img/trash-icon.svg";

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

const ExtraShoulderItem = ({item}) => {

    const [dataWeight, setDataWeight] = useState([objectWeightTemplate])
    const [dataVolume, setDataVolume] = useState([objectVolumeTemplate])
    const [dataMeter, setDataMeter] = useState([objectMeterTemplate])
    const [activeButtonForWeight, setActiveButtonForWeight] = useState(true)
    const [activeButtonForVolume, setActiveButtonForVolume] = useState(false)
    const [activeButtonForMeter, setActiveButtonForMeter] = useState(false)

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

    return (
        <div className={'extra-shoulder-item-wrapper'}>
            <div className={'zone-title'}>{item ? item.name : ''}</div>
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
    );
};

export default ExtraShoulderItem;