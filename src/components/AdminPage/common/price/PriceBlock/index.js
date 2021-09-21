import React, {useState} from 'react';
import PriceSwitcher from "./PriceSwitcher";
import {RateType} from "../../../../../constants/unit";
import PriceContainer from "./PriceContainer";
import {RateTypeOptionContext, useRatesContext} from "../PriceContext";


const defaultOption = RateType.MASS

const findPreviousRateIndex = (index, type, rates) => {
    for (let i = index-1; i >= 0; i--) {
        if (rates[i])
            if (rates[i].type === type)
                return i
    }
    return -1
}

const findNextRateIndex = (index, type, rates) => {
    for (let i = index + 1; i < rates.length; i++) {
        if (rates[i])
            if (rates[i].type === type)
                return i
    }
    return -1
}

const rateTemplate = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0,
    minimal_price: 0,
    type: defaultOption
}

const PriceBlock = () => {

    const [rateOption, setRateOption] = useState(defaultOption)
    const {rates, setRates} = useRatesContext()

    const dispatchRates = (action) => {
        let rate, nextRate, prevRate, prevInd, nextInd, rangeValue;
        switch (action.type) {
            case "add":
                prevInd = findPreviousRateIndex(rates.length+1, action.rateType, rates)
                if (prevInd >= 0)
                    rangeValue = +rates[prevInd].range_to
                else
                    rangeValue = 0
                rate = {...rateTemplate, range_from: rangeValue, range_to: +rangeValue + 1, type: action.rateType}
                setRates([...rates, rate])
                break
            case "change":
                nextInd = findNextRateIndex(action.index, action.rateType, rates)
                rate = action.data
                if (nextInd > 0) {
                    rangeValue = rate.range_to
                    nextRate = rates[nextInd]
                    nextRate.range_from = rangeValue
                    if (nextRate.range_to <= parseInt(rangeValue)) {
                        nextRate.range_to = parseInt(rangeValue)
                        nextRate.range_to++
                    }
                }
                rates[action.index] = rate
                rates[nextInd] = nextRate
                setRates([...rates])
                break
            case "delete":
                nextInd = findNextRateIndex(action.index, action.rateType, rates)
                prevInd = findPreviousRateIndex(action.index, action.rateType, rates)

                if (prevInd > 0) {
                    prevRate = rates[prevInd]
                    rangeValue = prevRate.range_to
                } else {
                    rangeValue = 0
                }
                if (nextInd > 0) {
                    nextRate = rates[nextInd]
                    nextRate.range_from = rangeValue
                    rates[nextInd] = nextRate
                }
                delete rates[action.index]
                setRates([...rates])
        }
    }

    return (
        <div className={'set-price-wrapper'}>
            <div className={'set-price-title'}>Цена</div>
            <div className={'settings-for-price-wrapper'}>
                <RateTypeOptionContext.Provider value={{option: rateOption, setOption: setRateOption}}>
                    <PriceSwitcher/>
                    <PriceContainer rates={rates} dispatchRates={dispatchRates}/>
                </RateTypeOptionContext.Provider>
            </div>
        </div>
    )
}

export default PriceBlock;