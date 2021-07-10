import trash from "../../../../../../img/trash-icon.svg";
import React from "react";
import RateType from "../../../../../../constants/unit";

const measurementFromRateType = (rateType) => {
    switch (rateType){
        case RateType.MASS:
            return "кг"
        case RateType.LDM:
            return "LDM"
        case RateType.SIZE:
            return "см³"
        default:
            return "HUY"
    }
}

const PriceItem = ({rateData, setRateData, onDelete}) => {

    const updateItem = (key, value) => {
        rateData[key] = value
        setRateData(rateData)
    }

    return (
        <div className={'inputs-wrapper'}>
            <div className={'start-input'}>
                <label>от</label>
                <input
                    onChange={e => updateItem('range_from', e.target.value)}
                    type="number"
                    value={rateData.range_from}/>
            </div>
            <div className={'end-input'}>
                <label>до</label>
                <input
                    onChange={e => updateItem('range_to', e.target.value)}
                    type="number"
                    value={rateData.range_to}/>
            </div>
            <div className={'weight-unit'}>{measurementFromRateType(rateData.type)}</div>
            <div className={'price-input'}>
                <input
                    onChange={e => updateItem('price_per_unit', e.target.value)}
                    type="number"
                    value={rateData.price_per_unit}/>
                <label className={'icon-euro'}>€</label>
            </div>
            <img src={trash} onClick={onDelete} alt="trash"/>
        </div>
    )
}
export default PriceItem;