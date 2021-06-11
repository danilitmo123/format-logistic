import React, {useState, useEffect} from 'react';

import CountryForm from "./CountryForm";
import CustomsClearanceForm from "./CustomsClearanceForm";
import InsuranceForm from './InsuranceForm'
import CargoForm from "./CargoForm";
import PathContainerPage from "./PathContainerPage";

import axios from "axios";

import './OrderPage.scss'


const OrderPage = () => {

  const [selectedCityIdFrom, setSelectedCityIdFrom] = useState('')
  const [selectedCityIdTo, setSelectedCityIdTo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [paths, setPaths] = useState([])

  const getPaths = async () => {
    if( selectedCityIdFrom !== '' && selectedCityIdTo !== '' ) {
      const newPaths = await axios.get(`https://ancient-temple-39835.herokuapp.com/route/paths?city1=${selectedCityIdFrom}&city2=${selectedCityIdTo}`)
      setPaths(newPaths.data)
    }
  }

  useEffect(() => {
    getPaths()
  }, [selectedCityIdTo && selectedCityIdFrom])

  const Circle = ({number}) => {
    return (
        <div className={'order-circle'}>{number}</div>
    )
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
          <CargoForm/>
          <CountryForm
              setIdTo={setSelectedCityIdTo}
              setIdFrom={setSelectedCityIdFrom}/>
          <CustomsClearanceForm/>
          <InsuranceForm/>
          <PathContainerPage paths={paths}/>
        </div>
      </section>
  );
};

export default OrderPage;