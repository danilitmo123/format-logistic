import React, {useState, useEffect, useRef} from 'react';
import PriceItem from "./PriceItem";

const defaultRate = {
    range_from: 0,
    range_to: 0,
    price_per_unit: 0
}

const PriceContainer = ({rates, setRates, option}) => {

    // TODO... To avoid such bullshit use useReducer, useContext, useSelector, useRef and wrap components where needed
    const [render, setRender] = useState(0)

    const addRate = () => {
        let rate = {...defaultRate, type: option}
        rates.push(rate)
        setRates(rates)
        setRender(render + 1)
    }
    const updateRateWrapper = (index) => {
        function updateRate(rate) {
            rates[index] = rate
            setRates(rates)
            setRender(render +2)
        }

        return updateRate;
    }
    const deleteRateWrapper = (index) => {
        function deleteRate() {
            delete rates[index]
            setRates(rates)
            setRender(render*2)
        }

        return deleteRate;
    }

    return (
        <div className={'weight-settings-wrapper'}>
            {rates.map((rate, index) => {
                if (rate !== null) {
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