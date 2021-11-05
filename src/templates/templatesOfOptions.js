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

export const typeOfContainer = [
    {value: 'SMALL', label: "20'"},
    {value: 'MIDDLE', label: "40'"},
    {value: 'BIG', label: "40'HC"},
]

export const customTheme = (theme) => {
    return {
        ...theme,
        colors: {
            ...theme.colors,
            primary25: 'rgba(48, 165, 201, .3)',
            primary: '#30A5C9'
        }
    }
}

