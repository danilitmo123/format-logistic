import {useMemo} from "react";

const useFilter = (routes, filter) => {

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
      setFilter({type: '', countryFrom: '', cityFrom: '', countryTo: '', cityTo: '', clear: false})
      return routes
    }
    return sortedRoutes.sortedRoutes
  }, [sortedRoutes, filter.cityTo, filter.cityFrom, filter.countryFrom, filter.countryTo])

  return {
    sortedAndSearchRoutes
  }
}