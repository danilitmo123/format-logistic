import React from 'react';

import {withRouter} from "react-router-dom";

import CargoForm from "../CargoForm";
import CountryForm from "../CountryForm";
import CustomsClearanceForm from "../CustomsClearanceForm";

const FirstStepForm = ({setIdFrom, setIdTo, cityWarningTo, setWarningTo, cityWarningFrom, setWarningFrom, setSourceType, setDestinationType, destinationType, sourceType, volume, setVolume, weight, setWeight}) => {

    return (
        <div>
            <CargoForm volume={volume} setVolume={setVolume} weight={weight} setWeight={setWeight}/>
            <CountryForm
                setWarningFrom={setWarningFrom}
                cityWarningFrom={cityWarningFrom}
                setWarningTo={setWarningTo}
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