import React, {useState, useEffect} from 'react';

import {
  typeOfCargoOptions,
  typeOfVolumeUnits,
  customTheme,
  typeOfWeightUnits,
  typeOfWidthPalletUnits
} from "../../../templates/templatesOfOptions";

import Select from 'react-select';

import trash from '../../../img/trash-icon.svg'

import './CargoForm.scss'

const objectTemplate = {
  cargo: 'Коробки',
  count: 1,
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  volumeUnits: 'CM',
  weightUnits: 'КГ',
  lengthPallet: 120,
  widthPallet: 100,
  heightPallet: 0,
  weightBoxSelect: 'КГ',
}

const CargoForm = ({cargoWarning, data, setDataRaw, volume, setVolume, weight, setWeight}) => {

  const [activeContainerButton, setActiveContainerButton] = useState(false)
  const [activeBoxButton, setActiveBoxButton] = useState(true)

  const setData = (data) => {
    localStorage.setItem('cargo', JSON.stringify(data))
    setDataRaw(data)
  }

  useEffect(() => {
    if (data.length === 0) {
      let init_data = [{
        cargo: "Коробки",
        count: 1,
        height: 0,
        heightPallet: 0,
        length: 0,
        lengthPallet: 120,
        volumeUnits: "CM",
        weight: 0,
        weightBoxSelect: "КГ",
        weightUnits: "КГ",
        width: 0,
        widthPallet: 100
      }]
      localStorage.setItem('cargo', JSON.stringify(init_data))
    } else {
      localStorage.setItem('cargo', JSON.stringify(data))
    }

  }, [data])

  useEffect(() => {
    const storageCargo = JSON.parse(localStorage.getItem('cargo'));
    if (storageCargo) {
      setData(storageCargo);
    }
  }, []);

  const addItem = () => {
    const newData = [...data, {...objectTemplate}]
    setData(newData)
  }

  const deleteItem = (i) => {
    const newData = [...data.slice(0, i), ...data.slice(i + 1)]
    setData(newData)
    switch (data[i].weightUnits) {
      case 'LB':
        setWeight((weight - data[i].weight * data[i].count / 2.2).toFixed(2))
        break
      case 'КГ':
        setWeight((weight - data[i].weight * data[i].count).toFixed(2))
        break
      default:
        return ''
    }
    switch (data[i].volumeUnits) {
      case 'M':
        if (data[i].cargo === 'Паллеты') {
          setVolume((volume - 120 * data[i].heightPallet * data[i].widthPallet * data[i].count).toFixed(2))
        } else {
          setVolume((volume - data[i].length * data[i].width * data[i].height * data[i].count).toFixed(2))
        }
        break
      case 'CM':
        if (data[i].cargo === 'Паллеты') {
          setVolume(((volume - 120 * data[i].heightPallet * data[i].widthPallet * data[i].count) / 1000000).toFixed(2))
        } else {
          setVolume(((volume - data[i].length * data[i].width * data[i].height * data[i].count) / 1000000).toFixed(2))
        }
        break
      default:
        return ''
    }
  }

  const calculateVolume = (newData) => {
    let totalVolumeM = 0
    let totalVolumeCM = 0
    newData.forEach(item => {
      switch (item.volumeUnits) {
        case 'M':
          if (item.cargo === 'Паллеты') {
            totalVolumeM += 120 * item.widthPallet * item.heightPallet * item.count
          } else {
            totalVolumeM += item.width * item.length * item.height * item.count
          }
          setVolume((totalVolumeM + totalVolumeCM).toFixed(2))
          break
        case 'CM':
          if (item.cargo === 'Паллеты') {
            totalVolumeCM += ((120 * item.widthPallet * item.heightPallet) * item.count) / 1000000
          } else {
            totalVolumeCM += ((item.width * item.length * item.height) * item.count) / 1000000
          }
          setVolume((totalVolumeM + totalVolumeCM).toFixed(2))
          break
        default:
          return ''
      }
    })
  }

  const calculateWeight = (newData) => {
    let totalWeightKG = 0
    let totalWeightLB = 0
    newData.forEach(item => {
      switch (item.weightUnits) {
        case 'КГ':
          totalWeightKG += +item.weight * item.count
          setWeight((totalWeightKG + totalWeightLB).toFixed(2))
          break
        case 'LB':
          totalWeightLB += item.weight * item.count / 2.2
          setWeight((totalWeightKG + totalWeightLB).toFixed(2))
          break
        default:
          return ''
      }
    })
  }

  const updateDataItemField = (index, field, newValue) => {
    let newData = [...data]
    let newItem = {...newData[index]}
    newItem[field] = newValue
    newData[index] = newItem
    setData(newData)
    calculateVolume(newData)
    calculateWeight(newData)
  }

  const ActiveBoxButtonHandler = () => {
    setActiveContainerButton(false)
    setActiveBoxButton(true)
  }

  return (
      <div className={'cargo-wrapper'}>
        <div className={'title-wrapper'}>
          <div className={'cargo-title'}>Груз</div>
          <div className={'cargo-all-info'}>Грузов: {data.length} Общий вес: {weight} кг Общий объем: {volume} м³</div>
        </div>
        <div className={'cargo-choice'}>
          <div className={activeBoxButton ? 'active-box-button' : 'box'}
               onClick={ActiveBoxButtonHandler}>Коробки / Паллеты
          </div>
        </div>
        {data.map((item, index) => {

          const updateItem = (field, newValue) => {
            updateDataItemField(index, field, newValue)
          }

          return (
              <div className={'cargo-input-wrapper'} key={index}>
                <div className={'wrapper'}>
                  <div className={'typeof-cargo'}>
                    <label htmlFor={'typeof-cargo'}>Тип груза</label>
                    <Select
                        theme={customTheme}
                        options={typeOfCargoOptions}
                        onChange={(e) => updateItem('cargo', e.value)}
                        noOptionsMessage={() => `Не найдено`}
                        placeholder={'Коробки'}
                    />
                  </div>
                  <div className={'countof-cargo'}>
                    <label htmlFor={'countof-cargo'}>Количество(шт)</label>
                    <input
                        type="number"
                        id={'countof-cargo'}
                        value={item.count || ''}
                        onChange={(e) => updateItem('count', e.target.value)}
                        min={1}
                        max={1000}
                        step={1}
                        placeholder={'1'}
                    />
                  </div>
                  <div className={'sizeof-cargo'}>
                    <div className={'sizeof-cargo-input'}>
                      {item.cargo === 'Коробки' ?
                          <>
                            <label htmlFor={'sizeof-cargo'}>Габариты</label>
                            <div className={'size-wrapper'}>
                              <div className={'sizeof-cargo-wrapper'}>
                                <input
                                    type="number"
                                    id={'sizeof-cargo'}
                                    value={item.length || ''}
                                    onChange={(e) => updateItem('length', e.target.value)}
                                    min={1}
                                    step={1}
                                    placeholder={'Длина'}
                                />
                                <input
                                    type="number"
                                    id={'sizeof-cargo'}
                                    value={item.width || ''}
                                    onChange={(e) => updateItem('width', e.target.value)}
                                    min={1}
                                    step={1}
                                    placeholder={'Ширина'}
                                />
                                <input
                                    type="number"
                                    id={'sizeof-cargo'}
                                    value={item.height || ''}
                                    onChange={(e) => updateItem('height', e.target.value)}
                                    min={1}
                                    step={1}
                                    placeholder={'Высота'}
                                />
                              </div>
                              <div className={'units-select'}>
                                <Select
                                    classNamePrefix="units-select-select"
                                    theme={customTheme}
                                    options={typeOfVolumeUnits}
                                    defaultValue={{value: 'CM', label: 'CM'}}
                                    onChange={(e) => updateItem('volumeUnits', e.value)}
                                    noOptionsMessage={() => `Не найдено`}
                                    placeholder={'СМ'}
                                />
                              </div>
                            </div>
                          </>
                          :
                          <div className={'sizeof-pallet-wrapper'}>
                            <label htmlFor={'sizeof-pallet'}>Паллет</label>
                            <div className={'select-input-wrapper'}>
                              <div className={'pallet-select-wrapper'}>
                                <div className={'pallet-length'}>120</div>
                                <div className={'units-width-pallet'}>
                                  <Select
                                      classNamePrefix="units-select-pallet-select"
                                      theme={customTheme}
                                      options={typeOfWidthPalletUnits}
                                      defaultValue={{value: '100', label: '100'}}
                                      onChange={e => updateItem('widthPallet', e.value)}
                                      noOptionsMessage={() => `Не найдено`}
                                      placeholder={'Ширина'}
                                  />
                                </div>
                              </div>
                              <input
                                  type='number'
                                  placeholder={'Высота'}
                                  value={item.heightPallet || ''}
                                  onChange={e => updateItem('heightPallet', e.target.value)}/>
                              <div className={'units-select-pallet'}>
                                <Select
                                    classNamePrefix="units-select-pallet-select"
                                    theme={customTheme}
                                    options={typeOfVolumeUnits}
                                    defaultValue={{value: 'CM', label: 'CM'}}
                                    onChange={(e) => updateItem('volumeUnits', e.value)}
                                    noOptionsMessage={() => `Не найдено`}
                                    placeholder={'СМ'}
                                />
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                  </div>
                  <div className={'weight-cargo'}>
                    <label htmlFor={'weight-cargo'}>Вес</label>
                    <div className={'weight-cargo-wrapper'}>
                      <div className={'weight-cargo-input'}>
                        <input
                            type="number"
                            id={'weight-cargo'}
                            value={item.weight || ''}
                            onChange={(e) => updateItem('weight', e.target.value)}
                            min={1}
                            step={1}
                            placeholder={item.weightBoxSelect === 'КГ' ? 'КГ' : 'Фунты'}
                        />
                      </div>
                      <div className={'units-select-weight'}>
                        <Select
                            classNamePrefix="units-select-weigh-select"
                            theme={customTheme}
                            options={typeOfWeightUnits}
                            defaultValue={{value: 'КГ', label: 'КГ'}}
                            onChange={(e) => updateItem('weightUnits', e.value)}
                            noOptionsMessage={() => `Не найдено`}
                            placeholder={'КГ'}
                        />
                      </div>
                    </div>
                  </div>
                  <img
                      src={trash}
                      alt={'trash'}
                      className={'trash-icon'}
                      onClick={() => deleteItem(index)}
                  />
                </div>
              </div>
          )
        })}
        <button className={'add-cargo-btn'} onClick={addItem}>+ Добавить</button>
        {cargoWarning ? <div className={'cargo-warning'}>Все поля должны быть заполнены</div> : ''}
      </div>
  );
};

export default CargoForm;