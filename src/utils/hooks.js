import React, {useRef, useState, useEffect} from 'react';


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

export const useInput = (initialState, validations) => {
  const [value, setValue] = useState(initialState)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

export const useValidation = (value, validations) => {
  const [isEmpty, setEmptyError] = useState(true)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmptyError(false) : setEmptyError(true)
          break
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re) ? setEmailError(false) : setEmailError(true)
          break
      }
    }

  }, [value])

  return {
    isEmpty,
    emailError,
  }

}

