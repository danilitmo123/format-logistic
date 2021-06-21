import React, {useState, useEffect, useRef} from 'react';

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";

import axios from "axios";

import './OrderPage.scss'
import ConfirmOrderPage from "./ConfirmOrderPage";


const OrderPage = () => {
  const [chosenPath, setChosenPath] = useState([])
  const [selectedCityIdFrom, setSelectedCityIdFrom] = useState()
  const [selectedCityIdTo, setSelectedCityIdTo] = useState()
  const [paths, setPaths] = useState([])
  const [firstActivePage, setFirstActivePage] = useState(true)
  const [secondActivePage, setSecondActivePage] = useState(false)
  const [cityWarningTo, setCityWarningTo] = useState(true)
  const [cityWarningFrom, setCityWarningFrom] = useState(true)
  const [pointsOfPath, setPointsOfPath] = useState([])
  const [isIdChanged, setIdChanged] = useState(false)
  const prevIdToCount = useRef()
  const prevIdFromCount = useRef()

  console.log(selectedCityIdFrom)

  useEffect(() => {
    prevIdFromCount.current = selectedCityIdFrom
    prevIdToCount.current = selectedCityIdTo
    if(prevIdFromCount.current !== selectedCityIdFrom || prevIdToCount.current !== selectedCityIdTo) {
      setPaths([])
      setIdChanged(true)
    }
  }, [selectedCityIdTo, selectedCityIdFrom])


  const getPaths = async () => {
    if( selectedCityIdFrom !== '' && selectedCityIdTo !== '') {
      const newPaths = await axios.get(`https://ancient-temple-39835.herokuapp.com/route/paths?city1=${selectedCityIdFrom}&city2=${selectedCityIdTo}`)
      setPaths(newPaths.data)
    }
  }

  const secondPageActiveHandler = () => {
    setSecondActivePage(false)
    setFirstActivePage(true)
  }

  const returnSecondPagHandler = () => {
    setSecondActivePage(true)
  }

  const Circle = ({number}) => {
    return (
        <div className={'order-circle' }>{number}</div>
    )
  }

  const disabledButtonHandler = () => {
    if(selectedCityIdTo) {
      setCityWarningTo(true)
    } else {
      setCityWarningTo(false)
    }
    if(selectedCityIdFrom) {
      setCityWarningFrom(true)
    } else {
      setCityWarningFrom(false)
    }
    if(selectedCityIdFrom && selectedCityIdTo) {
      getPaths()
      setFirstActivePage(false)
      setSecondActivePage(true)
    } else {
      setFirstActivePage(true)
      setSecondActivePage(false)
    }
  }

  return (
      <section className={'order-page-wrapper'}>
        <div className={'order-title'}>Рассчитать перевозку</div>
        <div className={'roadmap-order-wrapper'}>
          <ol className={'order-circle-container'}>
            <li><Circle number={'1'}/></li>
            <li><Circle number={'2'}/></li>
            <li><Circle number={'3'}/></li>
          </ol>
        </div>
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
                     >Продолжить</button>
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
                  >Назад</button>
                </div>
              </>
              :
              <>
                <ConfirmOrderPage chosenPath={chosenPath}/>
                <div className={'buttons-wrapper'}>
                  <button
                      className={'continue-button'}
                      onClick={returnSecondPagHandler}
                  >Назад</button>
                </div>
              </>
          }
        </div>
      </section>
  );
};

export default OrderPage;