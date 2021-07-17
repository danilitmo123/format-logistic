import React from 'react';

import {withRouter} from "react-router-dom";

import CargoForm from "../CargoForm";
import CountryForm from "../CountryForm";
import CustomsClearanceForm from "../CustomsClearanceForm";
import InsuranceForm from "../InsuranceForm";

const FirstStepForm = ({
                           setIdFrom,
                           setIdTo,
                           cityWarningTo,
                           setWarningTo,
                           cityWarningFrom,
                           setWarningFrom,
                           setSourceType,
                           setDestinationType,
                           destinationType,
                           sourceType
                       }) => {

    return (
        <div>
            <CargoForm/>
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
            <InsuranceForm/>
        </div>
    );
};

export default withRouter(FirstStepForm);