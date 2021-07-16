import React, {useState, useEffect, useRef} from 'react';

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";

import axios from "axios";

import './OrderPage.scss'
import ConfirmOrderPage from "./ConfirmOrderPage";
import {ROUTES_SERVER_URL} from "../../constants/URL";


const OrderPage = () => {
    const [chosenPath, setChosenPath] = useState([])
    const [selectedCityIdFrom, setSelectedCityIdFrom] = useState()
    const [selectedCityIdTo, setSelectedCityIdTo] = useState()
    const [paths, setPaths] = useState([])
    const [firstActivePage, setFirstActivePage] = useState(true)
    const [secondActivePage, setSecondActivePage] = useState(false)
    const [cityWarningTo, setCityWarningTo] = useState(false)
    const [cityWarningFrom, setCityWarningFrom] = useState(false)
    const [pointsOfPath, setPointsOfPath] = useState([])
    const [isIdChanged, setIdChanged] = useState(false)
    const prevIdToCount = useRef()
    const prevIdFromCount = useRef()

    useEffect(() => {
        prevIdFromCount.current = selectedCityIdFrom
        prevIdToCount.current = selectedCityIdTo
        if (prevIdFromCount.current !== selectedCityIdFrom || prevIdToCount.current !== selectedCityIdTo) {
            setPaths([])
            setIdChanged(true)
        }
    }, [selectedCityIdTo, selectedCityIdFrom])


    const getPaths = () => {
        if (selectedCityIdFrom !== '' && selectedCityIdTo !== '') {
            let cargos = JSON.parse(localStorage.getItem('cargo'))
            let data_cargos = []
            cargos.forEach((cargo) => {
                let _cargo = {}
                let isBox = cargo.cargo === "Коробки"
                let isCm = cargo.volumeUnits === "CM"
                let isKg = cargo.weightUnits === "КГ"
                if (isBox) {
                    _cargo["type"] = "BOX"
                } else {
                    _cargo["type"] = "PALLET"
                }
                _cargo["length"] = (isBox ? cargo.length : cargo.lengthPallet) * (isCm || !isBox ? 1 : 2.54)
                _cargo["height"] = (isBox ? cargo.height : cargo.heightPallet) * (isCm ? 1 : 2.54)
                _cargo["width"] = (isBox ? cargo.width : cargo.widthPallet) * (isCm || !isBox ? 1 : 2.54)
                _cargo["mass"] = cargo.weight * (isKg ? 1 : 2.2)
                _cargo["amount"] = cargo.count
                data_cargos.push(_cargo)
            })
            let data = {
                source:
                    {id: selectedCityIdFrom},
                destination:
                    {id: selectedCityIdTo},
                good: {
                    boxes: data_cargos
                }
            }
            axios.post(`${ROUTES_SERVER_URL}paths`, data)
                .then((res => {
                    setPaths(res.data)
                }))
        }
    }

    const secondPageActiveHandler = () => {
        setSecondActivePage(false)
        setFirstActivePage(true)
    }

    const returnSecondPagHandler = () => {
        setSecondActivePage(true)
    }

    const disabledButtonHandler = () => {
        if (selectedCityIdTo) {
            setCityWarningTo(false)
        } else {
            setCityWarningTo(true)
        }
        if (selectedCityIdFrom) {
            setCityWarningFrom(false)
        } else {
            setCityWarningFrom(true)
        }
        if (selectedCityIdFrom && selectedCityIdTo) {
            getPaths()
            setFirstActivePage(false)
            setSecondActivePage(true)
        } else {
            setFirstActivePage(true)
            setSecondActivePage(false)
        }
    }

    console.log(selectedCityIdFrom, selectedCityIdTo)

    return (
        <section className={'order-page-wrapper'}>
            <div className={'order-title'}>Рассчитать перевозку</div>
            <div className={'form-wrapper'}>
                {firstActivePage ?
                    <>
                        <FirstStepForm
                            setWarningFrom={setCityWarningFrom}
                            cityWarningFrom={cityWarningFrom}
                            setWarningTo={setCityWarningTo}
                            cityWarningTo={cityWarningTo}
                            setIdTo={setSelectedCityIdTo}
                            setIdFrom={setSelectedCityIdFrom}
                        />
                        <button
                            className={'continue-button-first-page'}
                            onClick={disabledButtonHandler}
                        >Продолжить
                        </button>
                    </>
                    : secondActivePage ?
                        <>
                            <PathContainerPage
                                isIdChanged={isIdChanged}
                                pointsOfPath={pointsOfPath}
                                setPointsOfPath={setPointsOfPath}
                                paths={paths}
                                setChosenPath={setChosenPath}
                                thirdPageActiveHandler={setSecondActivePage}/>
                            <div className={'buttons-wrapper'}>
                                <button
                                    onClick={secondPageActiveHandler}
                                    className={'continue-button'}
                                >Назад
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <ConfirmOrderPage chosenPath={chosenPath}/>
                            <div className={'buttons-wrapper'}>
                                <button
                                    className={'continue-button'}
                                    onClick={returnSecondPagHandler}
                                >Назад
                                </button>
                            </div>
                        </>
                }
            </div>
        </section>
    );
};

export default OrderPage;