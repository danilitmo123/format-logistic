import React, {useMemo, useState} from 'react';

import {ORDER_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import {useInput} from "../../../utils/hooks";

import ErrorMessage from "../../Common/ErrorMessage";
import HPlatform, {HMap, HMapPolyLine} from "react-here-map";
import {IMaskInput} from 'react-imask'

import airplane from '../../../img/black-airplane-icon.svg'
import truck from '../../../img/black-truck-icon.svg'
import train from '../../../img/train-icon.svg'

import './ConfirmOrderPage.scss'

const CREATE_ORDER_URL = `${ORDER_SERVER_URL}orders/`

const ConfirmOrderPage = ({setFirstPageActive, chosenPath, volume, weight, setAlert}) => {

  const company = useInput('')
  const comment = useInput('')
  const email = useInput('', {isEmpty: true, isEmail: true})
  const [phone, setPhone] = useState('')
  const [createOrderWarning, setOrderWarning] = useState(false)
  const [sendEmailWarning, setEmailWarning] = useState(false)
  const [incorrectEmail, setIncorrectEmail] = useState(false)
  const [canSend, setCanSend] = useState(true)

  const getPoints = (pathOfItem) => {
    let pointsOfPath = []
    pathOfItem[0].routes.map(item => {
      pointsOfPath.push({lat: item.source.location.latitude, lng: item.source.location.longitude})
      pointsOfPath.push({lat: item.destination.location.latitude, lng: item.destination.location.longitude})
    })
    return pointsOfPath
  }


  const validateFormCreateOrder = () => {
    if (canSend) {
      if (phone !== '' || (email.value && !email.emailError)) {
        createOrder(false)
        setOrderWarning(false)
      } else {
        setOrderWarning(true)
        setEmailWarning(false)
      }
    }
  }

  const validateFormSendEmail = () => {
    if (canSend) {
      if (email.value && !email.emailError) {
        createOrder(true)
        setEmailWarning(false)
      } else {
        setEmailWarning(true)
        setOrderWarning(false)
      }
    }
  }


  const Map = ({points}) => {
    return (<HPlatform
            apikey={"lDfJOpVUkj3EiYJMC1Za_oSkIvvY2pL2i6R5801iSoo"}
            useCITv
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

  const createOrder = (send_mail) => {
    setCanSend(false)
    let good = JSON.parse(localStorage.getItem('good'))
    let path = JSON.parse(localStorage.getItem('path'))
    let customs = JSON.parse(localStorage.getItem('customs'))
    let agent = {
      company_name: company.value,
      phone: phone,
      email: email.value,
      comment: comment.value
    }
    let special = {
      send_mail: send_mail
    }
    let body = {
      good: {boxes: good}, path, customs, agent, special
    }
    const options = {
      headers: {'Content-Type': 'application/json'}
    }

    axios.post(CREATE_ORDER_URL, body, options)
        .then(res => {
              setFirstPageActive(true);
              setAlert({active: true, isEmail: special.send_mail})
            }
        )
        .catch(err => {
              setCanSend(true)
            }
        )
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
          <div>Время в
            пути: {(chosenPath[0].total_duration.min).toFixed(0)} - {(chosenPath[0].total_duration.max).toFixed(0)} дней
          </div>
          <div>Вес: {weight} кг</div>
          <div>Объем: {volume} м³</div>
        </div>
        <div className={'final-form-wrapper'}>
          <div className={'shipper-title'}>Оформление заказа на перевозку</div>
          <div className="shipper">
            <div className={'input-example'}>
              <label htmlFor="">Компания</label>
              <input type="text" value={company.value} onChange={company.onChange}/>
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
              <input
                  type="email"
                  value={email.value}
                  onBlur={email.onBlur}
                  onChange={email.onChange}/>
              {(email.isDirty && email.emailError) && <ErrorMessage text={'Некорректный Email'} />}
            </div>
            <div className={'input-example'}>
              <label>Особые замечания</label>
              <textarea
                  value={comment.value}
                  onChange={comment.onChange}/>
            </div>
          </div>
          {createOrderWarning && <ErrorMessage text={'Телефон или Email обязательны к заполнению'} />}
          {sendEmailWarning  && <ErrorMessage text={'Email обязателен к заполнению'} />}
          <div className={'buttons-order-wrapper'}>
            <button className={'send-order-button'} onClick={validateFormCreateOrder}>Оформить заявку</button>
            <button className={'send-email-button'} onClick={validateFormSendEmail}>Отправить на почту</button>
          </div>
        </div>
      </div>
  );
};

export default ConfirmOrderPage;