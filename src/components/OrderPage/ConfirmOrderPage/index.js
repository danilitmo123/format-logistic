import React, {useMemo, useState} from 'react';

import HPlatform, {HMap, HMapPolyLine} from "react-here-map";
import {ORDER_SERVER_URL} from "../../../constants/URL";
import axios from "axios";

import {IMaskInput} from 'react-imask'

import airplane from '../../../img/black-airplane-icon.svg'
import truck from '../../../img/black-truck-icon.svg'
import train from '../../../img/train-icon.svg'

import './ConfirmOrderPage.scss'

const CREATE_ORDER_URL = `${ORDER_SERVER_URL}orders/`

const ConfirmOrderPage = ({setFirstPageActive ,chosenPath, volume, weight, setAlert}) => {

    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [contactName, setContactName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [formWarning, setFormWarning] = useState(false)

    const getPoints = (pathOfItem) => {
        let pointsOfPath = []
        pathOfItem[0].routes.map(item => {
            pointsOfPath.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
            pointsOfPath.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
        })
        return pointsOfPath
    }

    const validateFormHandler = () => {
        if(company !== '' && phone !== '' && email !== '') {
            createOrder()
            setFormWarning(false)
        } else {
            setFormWarning(true)
        }
    }


    const Map = ({points}) => {
        return (<HPlatform
                apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
                useCIT
                useHTTPS
                includeUI
                includePlaces
            >
                <HMap
                    mapOptions={{zoom: 1}}
                >
                    <HMapPolyLine points={points}/>
                </HMap>
            </HPlatform>
        )
    }

    const memoizedMap = useMemo(() => <Map points={getPoints(chosenPath)}/>, [chosenPath.routes])

    const handleInputChange = (setInput, e) => {
        setInput(e.target.value)
    }

    const createOrder = () => {
        setAlert(true)
        let good = JSON.parse(localStorage.getItem('good'))
        let path = JSON.parse(localStorage.getItem('path'))
        let customs = JSON.parse(localStorage.getItem('customs'))
        let agent = {
            company_name: company,
            address: address,
            contact_person: contactName,
            phone: phone,
            email: email
        }
        let body = {
            good: {boxes: good}, path, customs, agent
        }
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        axios.post(CREATE_ORDER_URL, body, options)
            .then(res => setFirstPageActive(true))
            .catch(err=> console.log({err}))
    }

    return (
        <div className={'final-order-page-wrapper'}>
            <div className={'final-map-wrapper'}>
                <div className={'route'}>
                    {chosenPath[0].routes ? chosenPath[0].routes.map((item, index) => ((
                            <div className={'type-of-route-wrapper'}>
                                <div className={'step-circle'}>{index + 1}</div>
                                <div className={'step-wrapper'}>
                                    <div className={'source'}>{item.source.name}</div>
                                    <div className={'route-info'}>
                                        <div className={'type'}>{item.type === 'TRUCK' ?
                                            <img className={'truck'} src={truck} alt="truck"/> : item.type === 'AIR' ?
                                            <img className={'airplane'} src={airplane} alt="airplane"/> :
                                                <img src={train} alt=""/>
                                        }</div>
                                        <div className={'route-distance'}>{(item.distance).toFixed(0)}км</div>
                                    </div>
                                    <div className={'destination'}>{item.destination.name}</div>
                                </div>
                            </div>)))
                        :
                        ''
                    }
                </div>
                {memoizedMap}
            </div>
            <div className={'all-info-route'}>
                <div className={'title'}>Итого:</div>
                <div>Расстояние: {(chosenPath[0].total_distance).toFixed(0)} км</div>
                <div>Цена: {(chosenPath[0].total_cost)}€/{(chosenPath[0].total_cost * 1.18).toFixed(2)}$</div>
                <div>Время в пути: {(chosenPath[0].total_duration.min).toFixed(0)} - {(chosenPath[0].total_duration.max).toFixed(0)} дней</div>
                <div>Вес: {weight} кг</div>
                <div>Объем: {volume} м³</div>
            </div>
            <div className={'final-form-wrapper'}>
                <div className={'shipper-title'}>Оформление заказа на перевозку</div>
                <div className="shipper">
                    <div className={'input-example'}>
                        <label htmlFor="">Компания</label>
                        <input type="text" value={company} onChange={e => handleInputChange(setCompany, e)}/>
                    </div>
                    <div className={'input-example'}>
                        <label htmlFor="">Адрес</label>
                        <input type="text" value={address} onChange={e => handleInputChange(setAddress, e)}/>
                    </div>
                    <div className={'input-example'}>
                        <label htmlFor="">Контактное лицо</label>
                        <input type="text" value={contactName} onChange={e => handleInputChange(setContactName, e)}/>
                    </div>
                    <div className={'input-example'}>
                        <label htmlFor="">Телефон</label>
                        <IMaskInput
                            mask={'+7(000)000-00-00'}
                            onAccept={(value) => setPhone(value)}
                        />
                    </div>
                    <div className={'input-example'}>
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={e => handleInputChange(setEmail, e)} />
                    </div>
                </div>
                <button className={'send-order-button'} onClick={validateFormHandler} disabled={formWarning}>Отправить</button>
                {formWarning ? <div className={'form-warning'}>Все поля обязательны к заполнению</div> : ''}
            </div>
        </div>
    );
};

export default ConfirmOrderPage;