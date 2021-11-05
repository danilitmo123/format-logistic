import React, {FC, useState} from 'react';

import axios from "axios";

import {ROUTES_SERVER_URL} from "../../constants/URL";
import {PlaceType} from "../../constants/unit";

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";
import ConfirmOrderPage from "./ConfirmOrderPage";
import Alert from "../Common/Alert";

import './OrderPage.scss'

const OrderPage = ({setFirstPageActive, firstActivePage}) => {

    const [chosenPath, setChosenPath] = useState([])
    const [selectedCityIdFrom, setSelectedCityIdFrom] = useState(null)
    const [selectedCityIdTo, setSelectedCityIdTo] = useState(null)
    const [paths, setPaths] = useState([])
    const [secondActivePage, setSecondActivePage] = useState(false)
    const [cityWarningTo, setCityWarningTo] = useState(false)
    const [cityWarningFrom, setCityWarningFrom] = useState(false)
    const [sourceType, setSourceType] = useState(PlaceType.CITY)
    const [destinationType, setDestinationType] = useState(PlaceType.CITY)
    const [volume, setVolume] = useState('')
    const [weight, setWeight] = useState('')
    const [containerWeight, setContainerWeight] = useState('')
    const [data, setDataRaw] = useState([])
    const [containerData, setContainerData] = useState([])
    const [cargoWarning, setCargoWarning] = useState(false)
    const [chooseRussiaWarning, setChooseRussiaWarning] = useState(false)
    const [showAlert, setShowAlert] = useState({active: false, isEmail: false})
    const [thirdPageActive, setThirdPageActive] = useState(false)


    const disabledButtonHandler = () => {
        let warning = false
        if (hasCargoError()) {
            setCargoWarning(true)
            warning = true
        } else {
            setCargoWarning(false)
        }
        if (selectedCityIdTo) {
            setCityWarningTo(false)
        } else {
            setCityWarningTo(true)
            warning = true
        }
        if (selectedCityIdFrom) {
            setCityWarningFrom(false)
        } else {
            setCityWarningFrom(true)
            warning = true
        }
        if (!warning) {
            getPaths()
            setFirstPageActive(false)
            setSecondActivePage(true)
        } else {
            setFirstPageActive(true)
            setSecondActivePage(false)
            window.scroll(0, 0)
        }
    }

    const hasBoxError = (item) => {
        return item.width === 0 || item.height === 0 || item.length === 0 || item.weight === 0
    }

    const hasPalletError = (item) => {
        return item.heightPallet === 0 || item.widthPallet === 0 || item.lengthPallet === 0 || item.weight === 0
    }

    const hasCargoError = () => {
        for (let i in data) {
            let item = data[i]
            if (hasBoxError(item) && hasPalletError(item)) {
                return true
            }
        }
        return false
    }

    const getPaths = () => {
        if (selectedCityIdFrom !== '' && selectedCityIdTo !== '') {
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

            localStorage.setItem('good', JSON.stringify(good))
            let data = {
                source:
                    {id: selectedCityIdFrom},
                destination:
                    {id: selectedCityIdTo},
                good: good,
                source_type: sourceType === PlaceType.CITY ? sourceType : sourceType + '_SRC',
                destination_type: destinationType === PlaceType.CITY ? destinationType : destinationType + '_DST'
            }
            axios.post(`${ROUTES_SERVER_URL}paths`, data)
                .then((res => {
                    setPaths(res.data)
                })).catch(err => console.log({err}))
        }
    }

    const secondPageActiveHandler = () => {
        setPaths([])
        setSelectedCityIdTo(null)
        setSelectedCityIdFrom(null)
        setSecondActivePage(false)
        setFirstPageActive(true)
    }

    const returnSecondPagHandler = () => {
        setSecondActivePage(true)
        setThirdPageActive(false)
    }

    return (
        <section className={'order-page-wrapper'}>
            <div
                className={'order-title'}>{secondActivePage || firstActivePage ? 'Рассчитать перевозку' : 'Офоромление заявки на перевозку'}</div>
            <div className={'form-wrapper'}>
                {firstActivePage ?
                    <>
                        <FirstStepForm
                            setCityWarningTo={setCityWarningTo}
                            setCityWarningFrom={setCityWarningFrom}
                            firstActivePage={firstActivePage}
                            showAlert={showAlert}
                            setAlert={setShowAlert}
                            data={data}
                            setDataRaw={setDataRaw}
                            containerData={containerData}
                            setContainerData={setContainerData}
                            cargoWarning={cargoWarning}
                            volume={volume}
                            setVolume={setVolume}
                            weight={weight}
                            setWeight={setWeight}
                            containerWeight={containerWeight}
                            setContainerWeight={setContainerWeight}
                            cityWarningFrom={cityWarningFrom}
                            cityWarningTo={cityWarningTo}
                            setIdTo={setSelectedCityIdTo}
                            setIdFrom={setSelectedCityIdFrom}
                            sourceType={sourceType}
                            destinationType={destinationType}
                            setSourceType={setSourceType}
                            setDestinationType={setDestinationType}
                            chooseRussiaWarning={chooseRussiaWarning}
                            setChooseRussiaWarning={setChooseRussiaWarning}
                            thirdPageActive={thirdPageActive}
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
                                volume={volume}
                                weight={weight}
                                containerWeight={containerWeight}
                                paths={paths}
                                setChosenPath={setChosenPath}
                                thirdPageActiveHandler={setSecondActivePage}
                                setThirdPage={setThirdPageActive}
                            />
                            <button
                                onClick={secondPageActiveHandler}
                                className={'continue-button-first-page'}
                            >Назад
                            </button>
                        </>
                        :
                        <>
                            <ConfirmOrderPage
                                setFirstPageActive={setFirstPageActive}
                                setAlert={setShowAlert}
                                chosenPath={chosenPath}
                                volume={volume}
                                weight={weight}
                                isThirdPageActive={thirdPageActive}
                            />
                            <button
                                className={'continue-button-first-page'}
                                onClick={returnSecondPagHandler}
                            >Назад§
                            </button>
                        </>
                }
            </div>
            {showAlert.active ? <Alert showAlert={showAlert} setAlert={setShowAlert}/> : ''}
        </section>
    );
};

export default OrderPage;