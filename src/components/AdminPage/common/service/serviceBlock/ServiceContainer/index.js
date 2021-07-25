import React from 'react'
import {useState, useEffect} from 'react';
import ServiceAdditionalItem from "../ServiceAdditionalItem";
import ServiceRankedItem from "../ServiceRankedItem";

import './ServiceContainer.scss'
import {useServiceContext} from "../../ServiceContext";

const defaultAdditionalServiceData = {name: "", price: 0.0}
const defaultRankedServiceData = {name: "", rank_type: "MASS", price_per_unit: 0.0}

const ServiceContainer = () => {

    const {additionalServices, rankedServices, setAdditionalServices, setRankedServices} = useServiceContext()

    const deleteAdditionalServiceItemWrapper = (index) => {
        function deleteServiceItem() {
            delete additionalServices[index]
            setAdditionalServices([...additionalServices])
        }
        return deleteServiceItem
    }
    const deleteRankedServiceItemWrapper = (index) => {
        function deleteServiceItem() {
            delete rankedServices[index]
            setRankedServices([...rankedServices])
        }
        return deleteServiceItem
    }
    const addAdditionalServiceItem = () => {
        additionalServices.push(defaultAdditionalServiceData) // default for empty item
        setAdditionalServices([...additionalServices])
    }
    const addRankedServiceItem = () => {
        rankedServices.push(defaultRankedServiceData) // default for empty item
        setRankedServices([...rankedServices])
    }
    const setAdditionalServiceDataWrapper = (index) => {
        function setServiceData(ServiceData) {
            additionalServices[index] = ServiceData
            setAdditionalServices([...additionalServices])
        }
        return setServiceData
    }
    const setRankedServiceDataWrapper = (index) => {
        function setServiceData(ServiceData) {
            rankedServices[index] = ServiceData
            setRankedServices([...rankedServices])
        }
        return setServiceData
    }

    return (
        <div>
            <div>
            {additionalServices.map((item, index) => {
                if (item) {
                    return (
                        <ServiceAdditionalItem
                            initData={item}
                            setData={setAdditionalServiceDataWrapper(index)}
                            onDelete={deleteAdditionalServiceItemWrapper(index)}/>
                    )
                }
            })}
            </div>
            <div>
                {rankedServices.map((item, index) => {
                    if (item) {
                        return (
                            <ServiceRankedItem
                                initData={item}
                                setData={setRankedServiceDataWrapper(index)}
                                onDelete={deleteRankedServiceItemWrapper(index)}/>
                        )
                    }
                })}
            </div>
            <button className={'add-service-button'} onClick={addAdditionalServiceItem}>Фиксированная цена</button>
            <button className={'add-service-button'} onClick={addRankedServiceItem}>Зависящая от ед.измер</button>
        </div>
    )
}

export default ServiceContainer