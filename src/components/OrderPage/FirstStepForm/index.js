import React, {useEffect} from 'react';

import {withRouter} from "react-router-dom";

import CargoForm from "../CargoForm";
import CountryForm from "../CountryForm";
import CustomsClearanceForm from "../CustomsClearanceForm";


const FirstStepForm = ({setChooseRussiaWarning,chooseRussiaWarning,setCityWarningFrom, setCityWarningTo,cargoWarning, data, setDataRaw, setIdFrom, setIdTo, cityWarningTo, cityWarningFrom, setSourceType, setDestinationType, destinationType, sourceType, volume, setVolume, weight, setWeight, thirdPageActive, containerData, setContainerData}) => {

    useEffect(() => {
      window.scroll(0,0)
    }, [])

    return (
        <div>
            <CargoForm
                cargoWarning={cargoWarning}
                data={data}
                setDataRaw={setDataRaw}
                volume={volume}
                setVolume={setVolume}
                weight={weight}
                setWeight={setWeight}
                containerData={containerData}
                setContainerData={setContainerData}
            />
            <CountryForm
                setChooseRussiaWarning={setChooseRussiaWarning}
                chooseRussiaWarning={chooseRussiaWarning}
                setCityWarningTo={setCityWarningTo}
                setCityWarningFrom={setCityWarningFrom}
                cityWarningFrom={cityWarningFrom}
                cityWarningTo={cityWarningTo}
                setIdTo={setIdTo}
                setSourceType={setSourceType}
                setDestinationType={setDestinationType}
                destinationType={destinationType}
                sourceType={sourceType}
                setIdFrom={setIdFrom}
            />
            <CustomsClearanceForm thirdPageActive={thirdPageActive}/>
        </div>
    );
};

export default withRouter(FirstStepForm);