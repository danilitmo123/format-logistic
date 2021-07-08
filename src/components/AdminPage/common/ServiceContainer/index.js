import {useState, useEffect} from 'react';
import ServiceAdditionalItem from "../ServiceAdditionalItem";
import ServiceRankedItem from "../ServiceRankedItem";

const defaultAdditionalServiceData = {name: "blya", price: 0.0}
const defaultRankedServiceData = {name: "huy", rank_type: "MASS", price_per_unit: 0.0}

const ServiceContainer = ({initData, routId}) => {

    // routeId required to avoid collisions
    const ADDITIONAL_SERVICE_KEY = `additionalServices-${routId}`
    const RANKED_SERVICE_KEY = `rankedServices-${routId}`

    const [data, setData] = useState(initData)

    const uploadAdditionalServiceDataToLocalStorage = (data) => {
        localStorage.setItem(ADDITIONAL_SERVICE_KEY, JSON.stringify(data))
    }

    const loadAdditionalServiceDataFromStorage = () => {
        return JSON.parse(localStorage.getItem(ADDITIONAL_SERVICE_KEY))
    }

    const uploadRankedServiceDataToLocalStorage = (data) => {
        localStorage.setItem(RANKED_SERVICE_KEY, JSON.stringify(data))
    }

    const loadRankedServiceDataFromStorage = () => {
        return JSON.parse(localStorage.getItem(RANKED_SERVICE_KEY))
    }


    useEffect(() => {
        uploadAdditionalServiceDataToLocalStorage(initData.additionalServices)
        uploadRankedServiceDataToLocalStorage(initData.rankedServices)
    }, [])

    const deleteAdditionalServiceItem = (index) => {
        function deleteServiceItem() {
            let services = loadAdditionalServiceDataFromStorage()
            delete services[index]
            console.log("additional", services, index)
            uploadAdditionalServiceDataToLocalStorage(services)
            setData({...data, additionalServices: services})
        }

        return deleteServiceItem
    }

    const deleteRankedServiceItem = (index) => {
        function deleteServiceItem() {
            let services = loadRankedServiceDataFromStorage()
            delete services[index]
            console.log("ranked", services, index)
            uploadRankedServiceDataToLocalStorage(services)
            setData({...data, rankedServices: services})
        }

        return deleteServiceItem
    }

    const addAdditionalServiceItem = () => {
        let services = loadAdditionalServiceDataFromStorage()
        services.push(defaultAdditionalServiceData) // default for empty item
        uploadAdditionalServiceDataToLocalStorage(services)
        setData({...data, additionalServices: services})
    }
    const addRankedServiceItem = () => {
        let services = loadRankedServiceDataFromStorage()
        services.push(defaultRankedServiceData) // default for empty item
        uploadRankedServiceDataToLocalStorage(services)
        setData({...data, rankedServices: services})
    }

    const setAdditionalServiceDataWrapper = (index) => {
        function setServiceData(ServiceData) {
            let services = loadAdditionalServiceDataFromStorage()
            services[index] = ServiceData
            uploadAdditionalServiceDataToLocalStorage(services)
            setData({...data, additionalServices: services})
        }

        return setServiceData
    }

    const setRankedServiceDataWrapper = (index) => {
        function setServiceData(ServiceData) {
            let services = loadRankedServiceDataFromStorage()
            services[index] = ServiceData
            uploadRankedServiceDataToLocalStorage(services)
            setData({...data, rankedServices: services})
        }

        return setServiceData
    }


    return (
        <div>
            <div>
            {data.additionalServices.map((item, index) => {
                if (item !== null) {
                    return (
                        <ServiceAdditionalItem
                            initData={item}
                            setData={setAdditionalServiceDataWrapper(index)}
                            onDelete={deleteAdditionalServiceItem(index)}/>
                    )
                }
            })}
            </div>
            <div>
                {data.rankedServices.map((item, index) => {
                    if (item !== null) {
                        return (
                            <ServiceRankedItem
                                initData={item}
                                setData={setRankedServiceDataWrapper(index)}
                                onDelete={deleteRankedServiceItem(index)}/>
                        )
                    }
                })}
            </div>
            <button onClick={addAdditionalServiceItem}>blya+</button>
            <button onClick={addRankedServiceItem}>hui+</button>
        </div>
    )
}

export default ServiceContainer