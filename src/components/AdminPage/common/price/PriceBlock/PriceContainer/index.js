import React, {useState, useEffect, useRef} from 'react';
import PriceItem from "./PriceItem";
import {useRatesContext, useRateTypeOptionContext} from "../../PriceContext";

const PriceContainer = ({rates, dispatchRates}) => {

    const {option} = useRateTypeOptionContext()

    const addRate = () => {
        dispatchRates({type: "add", rateType: option})
    }
    const updateRateWrapper = (index) => {
        function updateRate(rate) {
            dispatchRates({type: "change", data: rate, index: index, rateType: option})
        }
        return updateRate;
    }
    const deleteRateWrapper = (index) => {
        function deleteRate() {
            dispatchRates({type: "delete", index: index, rateType: option})
        }
        return deleteRate;
    }

    return (
        <div className={'weight-settings-wrapper'}>
            {rates.map((rate, index) => {
                if (rate) {
                    if (rate.type === option) {
                        return <PriceItem
                            rateData={rate}
                            setRateData={updateRateWrapper(index)}
                            onDelete={deleteRateWrapper(index)}/>
                    }
                }
            })}
            <button className={'add-button'} onClick={addRate}>Добавить промежуток</button>
        </div>
    )
}

export default PriceContainer