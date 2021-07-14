import * as React from "react";

// override dispatch. It must handle action.type: setCity and setCountry
const PlaceDispatcherContext = React.createContext({dispatch: (action) => {}});
const usePlaceDispatcherContext = () => {
    const context = React.useContext(PlaceDispatcherContext)

    if (context === undefined){
        throw new Error('PlaceDispatcherContext is not provided.')
    }
    return context
}

export {PlaceDispatcherContext, usePlaceDispatcherContext}