import React, {useState, useEffect} from 'react';


import Loader from "../../Common/Loader";
import MapBlock from "../../MapUI/MapBlock";

import './PathContainerPage.scss'
import {IMaskInput} from "react-imask";
import {ORDER_SERVER_URL} from "../../../constants/URL";
import axios from "axios";

const CREATE_ORDER_URL = `${ORDER_SERVER_URL}/feedback`

const PathContainerPage = ({
                             paths,
                             setChosenPath,
                             thirdPageActiveHandler,
                             weight,
                             volume,
                             setThirdPage,
                             containerWeight,
                             bigCount,
                             middleCount,
                             smallCount
                           }) => {

  const [index, setIndex] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('89818498')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (paths.paths !== undefined && index !== '') {
      setChosenPath([paths.paths[index]])
      localStorage.setItem('path', JSON.stringify(paths.paths[index]))
      thirdPageActiveHandler(false)
    }
  }, [index])

  const sendFeedbackForm = () => {
    const options = {
      headers: {'Content-Type': 'application/json'}
    }
    axios.post(CREATE_ORDER_URL, {
      "agent": {
        company_name: company,
        phone:  phone,
        email: email,
        comment: about
      }
    },options)
    window.location.href = '/'
  }

  const Form = () => {
    return (
      <div className={'feedback-form'}>
        <div className={'warning-path'}>
          <div>Данное направление пока что нельзя рассчитать через он-лайн сервис, пожалуйста оставьте нам свои контакты
            для обратной связи, мы сделаем расчет по вашему направлению!
          </div>
        </div>
        <div className={'feedback-form-wrapper'}>
          <div className={'shipper-title'}>Форма обратной связи</div>
          <div className="shipper">
            <div className={'input-example'}>
              <label htmlFor="">Компания</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
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
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={'input-example'}>
              <label>Особые замечания</label>
              <textarea
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>
          </div>
          <button
            className={'send-order-button'}
            onClick={sendFeedbackForm}
          >Оформить заявку</button>
        </div>
      </div>
    )
  }

  return (
    <div className={'path-container-page'}>
      {(paths.paths && !paths.paths.length) &&  <div className={'feedback-form'}>
        <div className={'warning-path'}>
          <div>Данное направление пока что нельзя рассчитать через он-лайн сервис, пожалуйста оставьте нам свои контакты
            для обратной связи, мы сделаем расчет по вашему направлению!
          </div>
        </div>
        <div className={'feedback-form-wrapper'}>
          <div className={'shipper-title'}>Форма обратной связи</div>
          <div className="shipper">
            <div className={'input-example'}>
              <label htmlFor="">Компания</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
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
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={'input-example'}>
              <label>Особые замечания</label>
              <textarea
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>
          </div>
          <button
            className={'send-order-button'}
            onClick={sendFeedbackForm}
          >Оформить заявку</button>
        </div>
      </div> }
      {paths.paths ? <div>{paths.paths.map((item, index) => <MapBlock
        setThirdPage={setThirdPage}
        key={index}
        weight={weight}
        volume={volume}
        containerWeight={containerWeight}
        index={index}
        setIndex={setIndex}
        path={item}
        smallCount={smallCount}
        middleCount={middleCount}
        bigCount={bigCount}
      />)}
      </div> : <Loader/>}
    </div>
  );
};

export default PathContainerPage;
