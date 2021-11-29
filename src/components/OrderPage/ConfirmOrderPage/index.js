import React, {useMemo, useState} from 'react';

import {ORDER_SERVER_URL, REPORT_SERVER_URL} from "../../../constants/URL";
import axios from "axios";
import {useInput} from "../../../utils/useInput";

import ErrorMessage from "../../Common/ErrorMessage";
import MapBlock from "../../MapUI/MapBlock";
import {IMaskInput} from 'react-imask'

import './ConfirmOrderPage.scss'
import {YANDEX_ACCOUNT} from "../../../constants/metrix";
import {Button, Input} from "antd";

const CREATE_ORDER_URL = `${ORDER_SERVER_URL}orders/`

const ConfirmOrderPage = ({
                              setFirstPageActive,
                              chosenPath,
                              volume,
                              weight,
                              setAlert,
                              smallCount,
                              middleCount,
                              bigCount
                          }) => {

        const company = useInput('')
        const comment = useInput('')
        const email = useInput('', {isEmpty: true, isEmail: true})
        const [phone, setPhone] = useState('')
        const [createOrderWarning, setOrderWarning] = useState(false)
        const [sendEmailWarning, setEmailWarning] = useState(false)
        const [canSend, setCanSend] = useState(true)
        const isCustoms = JSON.parse(localStorage.getItem('customs'))

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

        const memoizedMap = useMemo(() => <MapBlock volume={volume} weight={weight} smallCount={smallCount}
                                                    middleCount={middleCount} bigCount={bigCount}
                                                    chosenPath={chosenPath}/>, [chosenPath.routes])

        const createOrder = (send_mail) => {
            if (typeof window.ym != 'undefined') {
                window.ym(YANDEX_ACCOUNT, 'reachGoal', 'calc_send_form')
            }
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
                good: good, path, customs, agent, special
            }
            const options = {
                headers: {'Content-Type': 'application/json'}
            }
            axios.post(CREATE_ORDER_URL, body, options)
                .then(() => {
                        setFirstPageActive(true);
                        setAlert({active: true, isEmail: special.send_mail, isFeedback: false})
                    }
                )
                .catch(() => {
                        setCanSend(true)
                    }
                )
        }

        const createBlank = () => {
            let good = JSON.parse(localStorage.getItem('good'))
            let pathes = JSON.parse(localStorage.getItem('path'))
            let customs = JSON.parse(localStorage.getItem('customs'))

            const path = pathes.routes.map(route => {
                delete route.destination.name
                delete route.destination.slug
                delete route.destination.state
                delete route.destination.location
                delete route.source.name
                delete route.source.slug
                delete route.source.state
                delete route.source.location
                return route
            })

            let body = {
                good: good,
                path: {
                    routes: path,
                    total_cost: pathes.total_cost,
                    cheapest: pathes.cheapest,
                    fastest: pathes.fastest,
                    total_distance: pathes.total_distance,
                    total_duration: pathes.total_duration
                },
                customs
            }

            const options = {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            }
            axios.post(`${REPORT_SERVER_URL}report`, body, options)
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'KPFormat.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => console.log(error));
        }

        return (
            <div className={'final-order-page-wrapper'}>
                {memoizedMap}
                <div className={'additional-info'}>
                    <div className={'additional-info-title'}>Дополнительная информация</div>
                    <div className={'additional-blocks'}>
                        {chosenPath[0].routes.map((path) => {
                            if (path.is_hub && path.description.length) {
                                return (
                                    <div className={'info-wrapper'}>
                                        <div>{path.description.split('\n\n').map((point) => {
                                            return <div className={'info-point'}>-{point}</div>
                                        })}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                {isCustoms &&
                <div className={'customs-clearance-wrapper'}>
                    <div className={'description-wrapper'}>
                        <div className={'title-wrapper'}>
                            <div className={'title'}>Таможенное оформление</div>
                        </div>
                        <div className={'description'}>
                            <div>Услуги по таможенному оформлению и предоставление электронно-цифровой подписи (ЭЦП)
                                Таможенного
                                представителя:
                            </div>
                            <br/>
                            <div>- в порту прибытия – 18 000 руб, вкл. НДС;</div>
                            <div>- в аэропорту – 25 000 руб, вкл. НДC;</div>
                            <div>- в зоне таможенного контроля ж/д контейнерной станции – 26 000 руб, вкл. НДС;
                            </div>
                            <div>- на СВХ по маршрутуследования – 30 000 руб, вкл. НДС;</div>
                            <br/>
                            <div>До 4 товарных позиций (без учета таможенных платежей и сборов), каждый
                                дополнительный лист к ДТ –
                                1250 руб, вкл. НДС.
                            </div>
                        </div>

                    </div>
                </div>
                }
                <div className={'final-form-wrapper'}>
                    <div className={'shipper-title'}>Оформление заказа на перевозку</div>
                    <div className="shipper">
                        <div className={'input-example'}>
                            <label htmlFor="">Компания</label>
                            <Input type="text" value={company.value} onChange={company.onChange}/>
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
                            <Input
                                type="email"
                                value={email.value}
                                onBlur={email.onBlur}
                                onChange={email.onChange}/>
                            {(email.isDirty && email.emailError) && <ErrorMessage text={'Некорректный Email'}/>}
                        </div>
                        <div className={'input-example'}>
                            <label>Особые замечания</label>
                            <textarea
                                value={comment.value}
                                onChange={comment.onChange}/>
                        </div>
                    </div>
                    {createOrderWarning && <ErrorMessage text={'Телефон или Email обязательны к заполнению'}/>}
                    {sendEmailWarning && <ErrorMessage text={'Email обязателен к заполнению'}/>}
                    <div className={'buttons-order-wrapper'}>
                        <Button type={'primary'} style={{ marginRight: 40, borderRadius: 4 }} onClick={validateFormCreateOrder}>Оформить заявку</Button>
                        <Button onClick={validateFormSendEmail} style={{ borderRadius: 4 }}>Отправить на почту</Button>
                        <Button onClick={createBlank} style={{ borderRadius: 4 }}>Скачать предложение</Button>
                    </div>
                </div>
            </div>
        );
    }
;

export default ConfirmOrderPage;
