export const placeOfCargoOptions = [
  {value: 'Со склада', label: 'Со склада'},
  {value: 'Морской порт', label: 'Морской порт'},
  {value: 'Аэропорт', label: 'Аэропорт'},
]

export const typeOfShipping = [
  {value: 'Автомобильная перевозка', label: 'Автомобильная перевозка'},
  {value: 'Морская перевозка', label: 'Морская перевозка'},
  {value: 'Авиафрахт', label: 'Авиафрахт'},
  {value: 'Железнодородная перевозка', label: 'Железнодородная перевозка'},
]

export const typeOfCargoOptions = [
  {value: 'Коробки', label: 'Коробки'},
  {value: 'Паллеты', label: 'Паллеты'},
]

export const typeOfVolumeUnits = [
  {value: 'СМ', label: 'СМ'},
  {value: 'IN', label: 'IN'},
]

export const typeOfWeightUnits = [
  {value: 'КГ', label: 'КГ'},
  {value: 'LB', label: 'LB'},
]

export const typeOfWidthUnits = [

]

export const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'rgba(53, 210, 210, .2)',
      primary: '#35d2d2'
    }
  }
}

