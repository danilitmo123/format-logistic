import {useState} from 'react';
import trash from "../../../../../../img/trash-icon.svg";
import React from "react";

import './ServiceAdditionalItem.scss'

const ServiceAdditionalItem = ({initData, setData, onDelete}) => {
    const [name, setNameRaw] = useState(initData.name)
    const [price, setPriceRaw] = useState(initData.price)

    const setName = (name) => {
        setData({...initData, name: name.target.value})
        setNameRaw(name.target.value)
    }
    const setPrice = (price) => {
        setData({...initData, price: price.target.value})
        setPriceRaw(price.target.value)
    }

    return (
        <div className={'service-additional-item-wrapper'}>
            <input type="text" onChange={setName} placeholder={'Услуга'}/>
            <input type="text" onChange={setPrice} value={price}/>
            <img src={trash} onClick={onDelete} alt="trash"/>
        </div>
    )
}
export default ServiceAdditionalItem;