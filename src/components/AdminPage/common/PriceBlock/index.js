import React, {useState, useEffect, useRef} from 'react';
import PriceSwitcher from "./PriceSwitcher";
import RateType from "../../../../constants/unit";
import PriceContainer from "./PriceContainer";

const defaultOption = RateType.MASS

const PriceBlock = ({initialRates= [], updateRates}) => {

    const [rateOption, setRateOption] = useState(defaultOption)
    const [rates, setRatesRaw] = useState(initialRates)

    const setRates = (rates) => {
        setRatesRaw(rates)
        updateRates(rates)
    }

    return (
        <div className={'set-price-wrapper'}>
            <div className={'set-price-title'}>Цена</div>
            <div className={'settings-for-price-wrapper'}>
                <PriceSwitcher option={rateOption} setOption={setRateOption}/>
                <PriceContainer rates={rates} setRates={setRates} option={rateOption}/>
            </div>
        </div>
    )
}

export default PriceBlock;