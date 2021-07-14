import * as React from "react";

const ServiceContext = React.createContext({
    additionalServices: [],
    rankedServices: [],
    setAdditionalServices: (services) => {},
    setRankedServices: (services) => {}
})

const  useServiceContext = () => {
    const context = React.useContext(ServiceContext)
    if (context === undefined){
        throw new Error('ServiceContext is not provided.')
    }
    return context
}

export {ServiceContext, useServiceContext}