import * as React from "react";
import RateType from "../../../../constants/unit";

const PriceBlockContext = React.createContext({
    rateOption: RateType.MASS,
    setRateOption: () => {}
});