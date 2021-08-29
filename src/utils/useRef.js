import {useRef} from 'react';

export const useRefReducer = (reducer, initArgs={}) => {
  const ref = useRef(initArgs)

  const dispatch = (action) => {
    ref.current = reducer(ref.current, action)
  }

  return [ref, dispatch]
}

export const useRefSetter = (initRef) => {
  const ref = useRef(initRef)

  const setRef = (newRef) => {
    ref.current = newRef
  }

  return [ref, setRef]
}




