import React, {FC, useState} from 'react';

import axios from "axios";

import {ROUTES_SERVER_URL} from "../../constants/URL";
import {PlaceType} from "../../constants/unit";

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";
import ConfirmOrderPage from "./ConfirmOrderPage";
import Alert from "../Common/Alert";

import './OrderPage.scss'
import {YANDEX_ACCOUNT} from "../../constants/metrix";

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
  const [volume, setVolume] = useState(0)
  const [weight, setWeight] = useState(0)
  const [containerWeight, setContainerWeight] = useState('')
  const [data, setDataRaw] = useState([])
  const [containerData, setContainerData] = useState([])
  const [cargoWarning, setCargoWarning] = useState(false)
  const [chooseRussiaWarning, setChooseRussiaWarning] = useState(false)
  const [showAlert, setShowAlert] = useState({active: false, isEmail: false, isFeedback: false})
  const [thirdPageActive, setThirdPageActive] = useState(false)
  const [smallCount, setSmallCount] = useState(1)
  const [middleCount, setMiddleCount] = useState(0)
  const [bigCount, setBigCount] = useState(0)
  const [activeCargo, setActiveCargo] = useState('box')
  const [calcType, setCalcType] = useState('total')
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)

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
      if (typeof window.ym != 'undefined') {
        window.ym(YANDEX_ACCOUNT, 'reachGoal', 'calc_next')
      }
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

  const hasContainerError = (item) => {
    return item.containerCount === 0 || item.containerWeight === 0 || item.containerWeight === '' || item.containerWeight === null
  }

  const hasCargoError = () => {
    let goodType = localStorage.getItem('goodType')
    if (calcType === 'total') {
      console.log(weight,totalCount,volume)
      return !(+weight > 0 && +volume > 0 && +totalCount > 0);
    }
    if (calcType === 'detail' && goodType === 'BOX') {
      for (let i in data) {
        let item = data[i]
        if (hasBoxError(item) && hasPalletError(item)) {
          return true
        }
      }
      return false
    } else if (calcType === 'detail' && goodType === 'CONTAINER') {
      for (let i in containerData) {
        let item = containerData[i]
        if (hasContainerError(item)) {
          return true
        }
      }
      return false
    }
    return true
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
          let isBox = cargo.cargo === "??????????????"
          let isCM = cargo.volumeUnits === "CM"
          let isKg = cargo.weightUnits === "????"
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
          let isKg = containerItem.containerWeightUnits === "????"
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
        good: calcType === 'total' ? {
          total_mass: weight,
          total_volume: volume,
          loading_places: totalCount
        } : good,
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

  return (
    <section className={'order-page-wrapper'}>
      <div
        className={'order-title'}>{secondActivePage || firstActivePage ? '???????????????????? ??????????????????' : '?????????????????????? ???????????? ???? ??????????????????'}</div>
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
              smallCount={smallCount}
              setSmallCount={setSmallCount}
              middleCount={middleCount}
              setMiddleCount={setMiddleCount}
              bigCount={bigCount}
              setBigCount={setBigCount}
              activeCargo={activeCargo}
              setActiveCargo={setActiveCargo}
              calcType={calcType}
              setCalcType={setCalcType}
              totalWeight={totalWeight}
              setTotalWeight={setTotalWeight}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
              totalVolume={totalVolume}
              setTotalVolume={setTotalVolume}
            />
            <button
              className={'continue-button-first-page'}
              onClick={disabledButtonHandler}
            >?????????????????? ????????????????
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
                smallCount={smallCount}
                middleCount={middleCount}
                bigCount={bigCount}
                setFirstPageActive={setFirstPageActive}
                setAlert={setShowAlert}
                sourceType={sourceType}
                destinationType={destinationType}
                source={selectedCityIdTo}
                destination={selectedCityIdFrom}
              />
              <button
                onClick={secondPageActiveHandler}
                className={'continue-button-first-page'}
              >??????????
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
                smallCount={smallCount}
                middleCount={middleCount}
                bigCount={bigCount}
                isThirdPageActive={thirdPageActive}
              />
              {/*<button*/}
              {/*    className={'continue-button-first-page'}*/}
              {/*    onClick={returnSecondPagHandler}*/}
              {/*>????????????*/}
              {/*</button>*/}
            </>
        }
      </div>
      {showAlert.active ? <Alert showAlert={showAlert} setAlert={setShowAlert}/> : ''}
    </section>
  );
};

export default OrderPage;
