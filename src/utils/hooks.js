import React, {useRef, useState, useEffect, useMemo} from 'react';
import {scryRenderedDOMComponentsWithClass} from "react-dom/test-utils";

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

  const onChange = e => setValue(e.target.value)

  const onBlur = () => setDirty(true)

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

export const useFilter = (routes, filter) => {

  const sortedRoutes = useMemo(() => {
    if(filter) {
      return [...routes].filter((route)=>{
        return route.type.toLowerCase().indexOf(filter.type.toLowerCase()) >= 0;
      })
    }
    return routes
  }, [routes, filter.type])

  return {
    sortedRoutes
  }
}

export const useRoutes = (routes, filter, setFilter) => {
  const sortedRoutes = useFilter(routes, filter)
  console.log(filter)
  const sortedAndSearchRoutes = useMemo(() => {
    if(filter.countryFrom) {
      return sortedRoutes.sortedRoutes.filter(route => route.source.state.country.name.toLowerCase().includes(filter.countryFrom.toLowerCase()))
    }
    if (filter.cityFrom) {
      return sortedRoutes.sortedRoutes.filter(route => route.source.name.toLowerCase().includes(filter.cityFrom.toLowerCase()))
    }
    if (filter.countryTo) {
      return sortedRoutes.sortedRoutes.filter(route => route.destination.state.country.name.toLowerCase().includes(filter.countryTo.toLowerCase()))
    }
    if (filter.cityTo) {
      return sortedRoutes.sortedRoutes.filter(route => route.destination.name.toLowerCase().includes(filter.cityTo.toLowerCase()))
    }
    if(filter.clear) {
      console.log(1)
      setFilter({type: '', countryFrom: '', cityFrom: '', countryTo: '', cityTo: '', clear: false})
      return routes
    }
    return sortedRoutes.sortedRoutes
  }, [sortedRoutes, filter.cityTo, filter.cityFrom, filter.countryFrom, filter.countryTo])

  return {
    sortedAndSearchRoutes
  }
}

