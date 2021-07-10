import React from "react";
import RateType from "../../../../../constants/unit";

const PriceSwitcher = ({option, setOption}) => {

    return (
        <div className={'price-for-type-wrapper'}>
            <button
                onClick={() => setOption(RateType.MASS)}
                className={option === RateType.MASS ? 'active-price-button': 'price-button'}
            >Цена за вес груза</button>
            <button
                onClick={() => setOption(RateType.SIZE)}
                className={option === RateType.SIZE ? 'active-price-button': 'price-button'}
            >Цена за объём груза</button>
            <button
                onClick={() => setOption(RateType.LDM)}
                className={option === RateType.LDM ? 'active-price-button': 'price-button'}
            >Цена за погрузочный метр</button>
        </div>
    )
}

export default PriceSwitcher