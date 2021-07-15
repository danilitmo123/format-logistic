import React, {useRef, useReducer} from 'react';


const useRefReducer = (reducer, initArgs={}) => {
    const ref = useRef(initArgs)

    const dispatch = (action) => {
        ref.current = reducer(ref.current, action)
    }

    return [ref, dispatch]
}

const useRefSetter = (initRef) => {
    const ref = useRef(initRef)

    const setRef = (newRef) => {
        ref.current = newRef
    }

    return [ref, setRef]
}


export {useRefReducer, useRefSetter}