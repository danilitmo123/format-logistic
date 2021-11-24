import React, {useState, useEffect} from 'react';


import Loader from "../../Common/Loader";
import MapBlock from "../../MapUI/MapBlock";

import './PathContainerPage.scss'
import {IMaskInput} from "react-imask";
import {ORDER_SERVER_URL} from "../../../constants/URL";
import axios from "axios";

const CREATE_ORDER_URL = `${ORDER_SERVER_URL}feedback/`

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
                               smallCount,
                               setFirstPageActive,
                               setAlert
                           }) => {

    const [index, setIndex] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('89818498')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')
    const [errors, setErrors] = useState({})

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
        const body = {
            "agent": {
                company_name: company,
                phone: phone,
                email: email,
                comment: about
            }
        }
        axios.post(CREATE_ORDER_URL, body, options).then(() => {
            if (typeof window.ym != 'undefined') {
                window.ym(86376600, 'reachGoal', 'calc_send_form');
            }
            setFirstPageActive(true);
            setAlert({active: true, isEmail: false, isFeedback: true})
        }).catch( (err) => {
            if (err?.response?.data?.agent) {
                let _errors = {}
                for (let field in err.response.data.agent){
                    if (err.response.data.agent.hasOwnProperty(field)){
                        _errors[field] = true
                    }
                }
                setErrors(_errors)
            }
        })
    }

    return (
        <div className={'path-container-page'}>
            {(paths.paths && !paths.paths.length) && <div className={'feedback-form'}>
                <div className={'warning-path'}>
                    <div>Данное направление пока что нельзя рассчитать через он-лайн сервис, пожалуйста оставьте нам
                        свои контакты
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
                            {errors?.company_name  ? <div className={'error'}>Неверное названии компании</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label htmlFor="">Телефон</label>
                            <IMaskInput
                                mask={'+7(000)000-00-00'}
                                onAccept={(value) => setPhone(value)}
                            />
                            {errors?.phone  ? <div className={'error'}>Телефон введен неправилно</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                            {errors?.email  ? <div className={'error'}>Email введен неправилно</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label>Особые замечания</label>
                            <textarea
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                            />
                            {errors?.comment  ? <div className={'error'}>Комментарий введен неправилно</div> : ''}
                        </div>
                    </div>
                    <button
                        className={'send-order-button'}
                        onClick={sendFeedbackForm}
                    >Оформить заявку
                    </button>
                </div>
            </div>}
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
