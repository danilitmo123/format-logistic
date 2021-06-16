import React, {useState, useEffect} from 'react';

import FirstStepForm from "./FirstStepForm";
import PathContainerPage from "./PathContainerPage";

import axios from "axios";

import './OrderPage.scss'
import ConfirmOrderPage from "./ConfirmOrderPage";


const OrderPage = () => {
  const [chosenPath, setChosenPath] = useState([])
  const [selectedCityIdFrom, setSelectedCityIdFrom] = useState('')
  const [selectedCityIdTo, setSelectedCityIdTo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [paths, setPaths] = useState([])
  const [firstActivePage, setFirstActivePage] = useState(true)
  const [secondActivePage, setSecondActivePage] = useState(false)
  const [cityWarningTo, setCityWarningTo] = useState(true)
  const [cityWarningFrom, setCityWarningFrom] = useState(true)

  const getPaths = async () => {
    if( selectedCityIdFrom !== '' && selectedCityIdTo !== '' ) {
      const newPaths = await axios.get(`https://ancient-temple-39835.herokuapp.com/route/paths?city1=${selectedCityIdFrom}&city2=${selectedCityIdTo}`)
      setPaths(newPaths.data)
    }
  }

  const secondPageActiveHandler = () => {
    setSecondActivePage(false)
    setFirstActivePage(true)
  }

  const thirdPageActiveHandler = () => {
    setSecondActivePage(false)
  }

  const returnSecondPagHandler = () => {
    setSecondActivePage(true)
  }

  const Circle = ({number}) => {
    return (
        <div className={'order-circle'}>{number}</div>
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
                <PathContainerPage paths={paths} setChosenPath={setChosenPath}/>
                <div className={'buttons-wrapper'}>
                  <button
                      onClick={secondPageActiveHandler}
                      className={'continue-button'}
                  >Назад</button>
                  <button
                      className={'continue-button'}
                      onClick={thirdPageActiveHandler}
                  >Продолжить</button>
                </div>
              </>
              :
              <>
                <ConfirmOrderPage chosenPath={chosenPath}/>
                <button
                    className={'continue-button'}
                    onClick={returnSecondPagHandler}
                >Назад</button>
              </>
          }
        </div>
      </section>
  );
};

export default OrderPage;