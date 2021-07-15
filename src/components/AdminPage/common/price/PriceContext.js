import * as React from "react";
import {RateType} from "../../../../constants/unit";

const RateTypeOptionContext = React.createContext({
    rateOption: RateType.MASS,
    setOption: () => {}
});

const RatesContext = React.createContext({
    rates: [],
    setRates: (rates) => {}
})

const useRatesContext = () => {
    const context = React.useContext(RatesContext)

    if (context === undefined){
        throw new Error('RatesContext is not provided.')
    }
    return context
}

const useRateTypeOptionContext = () => {
    const context = React.useContext(RateTypeOptionContext)

    if (context === undefined){
        throw new Error('RateTypeOptionContext is not provided.')
    }
    return context
}

export {RateTypeOptionContext, RatesContext, useRatesContext, useRateTypeOptionContext}