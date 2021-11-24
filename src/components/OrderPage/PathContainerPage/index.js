import React, {useState, useEffect} from 'react';


import Loader from "../../Common/Loader";
import MapBlock from "../../MapUI/MapBlock";

import './PathContainerPage.scss'
import {IMaskInput} from "react-imask";
import {ORDER_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import {YANDEX_ACCOUNT} from "../../../constants/metrix";

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
                               sourceType,
                               destinationType,
                               source,
                               destination,
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
        let good
        let goodType = localStorage.getItem('goodType')

        if (goodType === 'BOX') {
            let boxes = []
            let cargos = JSON.parse(localStorage.getItem('cargo'))
            cargos.forEach((cargo) => {
                let box = {}
                let isBox = cargo.cargo === "Коробки"
                let isCM = cargo.volumeUnits === "CM"
                let isKg = cargo.weightUnits === "КГ"
                if (isBox) {
                    box["type"] = "BOX"
                } else {
                    box["type"] = "PALLET"
                }
                box["length"] = (isBox ? cargo.length : cargo.lengthPallet) * (isCM || !isBox ? 1 / 100 : 1)
                box["height"] = (isBox ? cargo.height : cargo.heightPallet) * (isCM ? 1 / 100 : 1)
                box["width"] = (isBox ? cargo.width : cargo.widthPallet) * (isCM || !isBox ? 1 / 100 : 1)
                box["mass"] = cargo.weight * (isKg ? 1 : 1 / 2.2)
                box["amount"] = cargo.count
                boxes.push(box)
            })
            good = {'boxes': boxes, 'containers': []}
        } else if (goodType === 'CONTAINER') {
            let containers = []
            let containersData = JSON.parse(localStorage.getItem('containers'))
            containersData.forEach((containerItem) => {
                let isKg = containerItem.containerWeightUnits === "КГ"
                let mass = containerItem.containerWeight * (isKg ? 1 : 1 / 2.2)
                let container = {
                    'type': containerItem.containerType,
                    'amount': containerItem.containerCount,
                    'mass': mass
                }
                containers.push(container)
            })
            good = {'boxes': [], 'containers': containers}
        }

        const body = {
            "agent": {
                company_name: company,
                phone: phone,
                email: email,
                comment: about
            },
            "good": good,
            "source": {id: source},
            "destination": {id: destination},
            "source_type": sourceType,
            "destination_type": destinationType
        }
        axios.post(CREATE_ORDER_URL, body, options).then(() => {
            if (typeof window.ym != 'undefined') {
                window.ym(YANDEX_ACCOUNT, 'reachGoal', 'calc_send_form');
            }
            setFirstPageActive(true);
            setAlert({active: true, isEmail: false, isFeedback: true})
        }).catch((err) => {
            if (err?.response?.data?.agent) {
                let _errors = {}
                for (let field in err.response.data.agent) {
                    if (err.response.data.agent.hasOwnProperty(field)) {
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
                            {errors?.company_name ? <div className={'error'}>Неверное названии компании</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label htmlFor="">Телефон</label>
                            <IMaskInput
                                mask={'+7(000)000-00-00'}
                                onAccept={(value) => setPhone(value)}
                            />
                            {errors?.phone ? <div className={'error'}>Телефон введен неправилно</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                            {errors?.email ? <div className={'error'}>Email введен неправилно</div> : ''}
                        </div>
                        <div className={'input-example'}>
                            <label>Особые замечания</label>
                            <textarea
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                            />
                            {errors?.comment ? <div className={'error'}>Комментарий введен неправилно</div> : ''}
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
