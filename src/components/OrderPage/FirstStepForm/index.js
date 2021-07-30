import React from 'react';

import {withRouter} from "react-router-dom";

import CargoForm from "../CargoForm";
import CountryForm from "../CountryForm";
import CustomsClearanceForm from "../CustomsClearanceForm";

const FirstStepForm = ({cargoWarning, data, setDataRaw, setIdFrom, setIdTo, cityWarningTo, cityWarningFrom, setSourceType, setDestinationType, destinationType, sourceType, volume, setVolume, weight, setWeight}) => {

    return (
        <div>
            <CargoForm
                cargoWarning={cargoWarning}
                data={data}
                setDataRaw={setDataRaw}
                volume={volume}
                setVolume={setVolume}
                weight={weight}
                setWeight={setWeight}/>
            <CountryForm
                cityWarningFrom={cityWarningFrom}
                cityWarningTo={cityWarningTo}
                setIdTo={setIdTo}
                setSourceType={setSourceType}
                setDestinationType={setDestinationType}
                destinationType={destinationType}
                sourceType={sourceType}
                setIdFrom={setIdFrom}
            />
            <CustomsClearanceForm/>
        </div>
    );
};

export default withRouter(FirstStepForm);