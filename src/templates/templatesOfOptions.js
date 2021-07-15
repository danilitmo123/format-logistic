export const placeOfCargoOptions = [
  {value: 'Со склада', label: 'Со склада'},
  {value: 'Морской порт', label: 'Морской порт'},
  {value: 'Аэропорт', label: 'Аэропорт'},
]

export const typeOfShipping = [
  {value: 'Автомобильная перевозка', label: 'Автомобильная перевозка'},
  {value: 'Авиафрахт', label: 'Авиафрахт'},
  {value: 'Железнодородная перевозка', label: 'Железнодородная перевозка'},
]

export const typeOfCargoOptions = [
  {value: 'Коробки', label: 'Коробки'},
  {value: 'Паллеты', label: 'Паллеты'},
]

export const typeOfVolumeUnits = [
  {value: 'M', label: 'M'},
  {value: 'CM', label: 'CM'},
]

export const typeOfWeightUnits = [
  {value: 'КГ', label: 'КГ'},
  {value: 'LB', label: 'LB'},
]

export const typeOfWidthPalletUnits = [
  {value: '100', label: '100'},
  {value: '80', label: '80'},
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

