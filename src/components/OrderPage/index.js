import React, {useState, useEffect, useRef} from 'react';

import axios from "axios";

import {ROUTES_SERVER_URL} from "../../constants/URL";
import {PlaceType} from "../../constants/unit";

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";
import ConfirmOrderPage from "./ConfirmOrderPage";

import './OrderPage.scss'

const OrderPage = ({firstActivePage, setActive}) => {
  const [chosenPath, setChosenPath] = useState([])
  const [selectedCityIdFrom, setSelectedCityIdFrom] = useState()
  const [selectedCityIdTo, setSelectedCityIdTo] = useState()
  const [paths, setPaths] = useState([])
  const [secondActivePage, setSecondActivePage] = useState(false)
  const [cityWarningTo, setCityWarningTo] = useState(false)
  const [cityWarningFrom, setCityWarningFrom] = useState(false)
  const [pointsOfPath, setPointsOfPath] = useState([])
  const [isIdChanged, setIdChanged] = useState(false)
  const [sourceType, setSourceType] = useState(PlaceType.CITY)
  const [destinationType, setDestinationType] = useState(PlaceType.CITY)
  const [volume, setVolume] = useState(0)
  const [weight, setWeight] = useState(0)
  const [data, setDataRaw] = useState([])
  const [cargoWarning, setCargoWarning] = useState({
    cargoWidth: false,
    cargoLength: false,
    cargoHeight: false,
    weight: false,
    palletHeight: false,
    palletWidth: false
  })
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

  // const cargoWarningHandler = () => {
  //   data.map(item => {
  //     if (item.width === 0) {
  //       console.log(1)
  //       setCargoWarning({...cargoWarning, cargoWidth: true})
  //     } else {
  //       setCargoWarning({...cargoWarning, cargoWidth: false})
  //     }
  //     if (item.height === 0) {
  //       console.log(1)
  //       setCargoWarning({...cargoWarning, cargoHeight: true})
  //     } else {
  //       setCargoWarning({...cargoWarning, cargoHeight: false})
  //     }
  //     if (item.length === 0) {
  //       console.log()
  //       setCargoWarning({...cargoWarning, cargoLength: true})
  //     } else {
  //       setCargoWarning({...cargoWarning, cargoLength: false})
  //     }
  //   })
  // }
  //
  // useEffect(() => {
  //  cargoWarningHandler()
  // }, [data])

  const getPaths = () => {
    if (selectedCityIdFrom !== '' && selectedCityIdTo !== '') {
      let cargos = JSON.parse(localStorage.getItem('cargo'))
      let data_cargos = []
      cargos.forEach((cargo) => {
        let _cargo = {}
        let isBox = cargo.cargo === "Коробки"
        let isCM = cargo.volumeUnits === "CM"
        let isKg = cargo.weightUnits === "КГ"
        if (isBox) {
          _cargo["type"] = "BOX"
        } else {
          _cargo["type"] = "PALLET"
        }
        _cargo["length"] = (isBox ? cargo.length : cargo.lengthPallet) * (isCM || !isBox ?  1/100 : 1)
        _cargo["height"] = (isBox ? cargo.height : cargo.heightPallet) * (isCM ? 1/100 : 1)
        _cargo["width"] = (isBox ? cargo.width : cargo.widthPallet) * (isCM || !isBox ?  1/100 : 1)
        _cargo["mass"] = cargo.weight * (isKg ? 1 : 1 / 2.2)
        _cargo["amount"] = cargo.count
        data_cargos.push(_cargo)
      })
      localStorage.setItem('good', JSON.stringify(data_cargos))
      let data = {
        source:
          {id: selectedCityIdFrom},
        destination:
          {id: selectedCityIdTo},
        good: {
          boxes: data_cargos
        },
        source_type: sourceType,
        destination_type: destinationType
      }
      axios.post(`${ROUTES_SERVER_URL}paths`, data)
        .then((res => {
          setPaths(res.data)
        }))
    }
  }

  const secondPageActiveHandler = () => {
    setSecondActivePage(false)
    setActive(true)
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
      setActive(false)
      setSecondActivePage(true)
    } else {
      setActive(true)
      setSecondActivePage(false)
    }
  }

  return (
    <section className={'order-page-wrapper'}>
      <div className={'order-title'}>Рассчитать перевозку</div>
      <div className={'form-wrapper'}>
        {firstActivePage ?
          <>
            <FirstStepForm
              data={data}
              setDataRaw={setDataRaw}
              cargoWarning={cargoWarning}
              volume={volume}
              setVolume={setVolume}
              weight={weight}
              setWeight={setWeight}
              cityWarningFrom={cityWarningFrom}
              cityWarningTo={cityWarningTo}
              setIdTo={setSelectedCityIdTo}
              setIdFrom={setSelectedCityIdFrom}
              sourceType={sourceType}
              destinationType={destinationType}
              setSourceType={setSourceType}
              setDestinationType={setDestinationType}
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
                isIdChanged={isIdChanged}
                pointsOfPath={pointsOfPath}
                setPointsOfPath={setPointsOfPath}
                paths={paths}
                setChosenPath={setChosenPath}
                thirdPageActiveHandler={setSecondActivePage}/>
              <button
                onClick={secondPageActiveHandler}
                className={'continue-button-first-page'}
              >Назад
              </button>
            </>
            :
            <>
              <ConfirmOrderPage chosenPath={chosenPath} volume={volume} weight={weight}/>
                <button
                  className={'continue-button-first-page'}
                  onClick={returnSecondPagHandler}
                >Назад
                </button>
            </>
        }
      </div>
    </section>
  );
};

export default OrderPage;