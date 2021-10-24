import React, {FC, useEffect, useState} from 'react';

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

const containerObjectTemplate = {
  containerCount: 1,
  containerWeight: 0,
  containerWeightUnits: 'КГ',
  smallContainer: true,
  mediumContainer: false,
  largeContainer: false
}


const CargoForm = ({
                     cargoWarning,
                     data,
                     setDataRaw,
                     volume,
                     setVolume,
                     weight,
                     setWeight,
                     containerData,
                     setContainerData,
                     setContainerWeight,
                     containerWeight
                   }) => {

  const [boxButtonActive, setBoxButtonActive] = useState(true)
  const [containerButtonActive, setContainerButtonActive] = useState(false)
  const [containerType, setContainerType] = useState(0)

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

  useEffect(() => {
    setContainerData([containerObjectTemplate])
  }, [])

  const addItem = () => {
    const newData = [...data, {...objectTemplate}]
    setData(newData)
  }

  const addContainerItem = () => {
    const newData = [...containerData, {...containerObjectTemplate}]
    setContainerData(newData)
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

  const deleteContainerItem = (i) => {
    const newData = [...containerData.slice(0, i), ...containerData.slice(i + 1)]
    setContainerData(newData)
    switch (containerData[i].containerWeightUnits) {
      case 'LB':
        setContainerWeight((containerWeight - containerData[i].containerWeight * containerData[i].containerCount / 2.2).toFixed(2))
        break
      case 'КГ':
        setContainerWeight((containerWeight - containerData[i].containerWeight * containerData[i].containerCount).toFixed(2))
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

  const calculateContainerWeight = (newData) => {
    let totalWeightKG = 0
    let totalWeightLB = 0
    newData.forEach(item => {
      switch (item.containerWeightUnits) {
        case 'КГ':
          totalWeightKG += +item.containerWeight * +item.containerCount
          setContainerWeight((totalWeightKG + totalWeightLB).toFixed(2))
          break
        case 'LB':
          totalWeightLB += +item.containerWeight * +item.containerCount / 2.2
          setContainerWeight((totalWeightKG + totalWeightLB).toFixed(2))
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

  const updateContainerDataItemField = (index, field, newValue) => {
    let newData = [...containerData]
    let newItem = {...newData[index]}
    newItem[field] = newValue
    newData[index] = newItem
    setContainerData(newData)
    calculateContainerWeight(newData)
  }

  const updateBoxActive = () => {
    setContainerButtonActive(false)
    setBoxButtonActive(true)
  }

  const updateContainerActive = () => {
    setContainerButtonActive(true)
    setBoxButtonActive(false)
  }

  const updateContainerType = (index, value) => {
    setContainerType(value)
    let newCargo = [...containerData]
    let newItem = {...newCargo[index]}
    switch (value) {
      case 1:
        newItem['smallContainer'] = true
        newItem['mediumContainer'] = false
        newItem['largeContainer'] = false
        break
      case 2:
        newItem['smallContainer'] = false
        newItem['mediumContainer'] = true
        newItem['largeContainer'] = false
        break
      case 3:
        newItem['smallContainer'] = false
        newItem['mediumContainer'] = false
        newItem['largeContainer'] = true
        break
    }
    newCargo[index] = newItem
    setContainerData(newCargo)
    console.log(containerData)
  }

  return (
      <div className={'cargo-wrapper'}>
        <div className={'title-wrapper'}>
          <div className={'cargo-title'}>Груз</div>
          {boxButtonActive ?
              <div className={'cargo-all-info'}>Грузов: {data.length} Общий вес: {weight ? weight : 0} кг Общий
                объем: {volume ? volume : 0} м³</div>
              :
              <div className={'cargo-all-info'}>Грузов: {containerData.length} Общий вес: {containerWeight ? containerWeight : 0} кг</div>
          }
        </div>
        <div className={'cargo-choice'}>
          <div className={boxButtonActive ? 'active-button' : 'button'} onClick={updateBoxActive}>Коробки / Паллеты
          </div>
          <div className={containerButtonActive ? 'active-button' : 'button'}
               onClick={updateContainerActive}>Контейнеры
          </div>
        </div>
        {boxButtonActive &&
        <div>
          {data.map((item, index) => {

            const updateItem = (field, newValue) => {
              updateDataItemField(index, field, newValue)
            }

            return (
                <div className={'cargo-input-wrapper'} key={index}>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Тип груза</label>
                    <div className={'choose-cargo-select'}>
                      <Select
                          classNamePrefix={'choose-cargo'}
                          theme={customTheme}
                          options={typeOfCargoOptions}
                          onChange={(e) => updateItem('cargo', e.value)}
                          noOptionsMessage={() => `Не найдено`}
                          placeholder={'Коробки'}
                      />
                    </div>
                  </div>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Количество(шт)</label>
                    <input
                        className={'cargo-input count-input'}
                        type="number"
                        value={item.count || ''}
                        onChange={(e) => updateItem('count', e.target.value)}
                        min={1}
                        max={1000}
                        step={1}
                        placeholder={'1'}
                    />
                  </div>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Габариты</label>
                    {item.cargo === 'Коробки' ?
                        <div className={'dimensions-box-wrapper'}>
                          <div className={'box-units-wrapper'}>
                            <input
                                className={'cargo-input length'}
                                type="number"
                                id={'sizeof-cargo'}
                                value={item.length || ''}
                                onChange={(e) => updateItem('length', e.target.value)}
                                min={1}
                                step={1}
                                placeholder={'Длина'}
                            />
                            <input
                                className={'cargo-input width'}
                                type="number"
                                id={'sizeof-cargo'}
                                value={item.width || ''}
                                onChange={(e) => updateItem('width', e.target.value)}
                                min={1}
                                step={1}
                                placeholder={'Ширина'}
                            />
                            <input
                                className={'cargo-input height'}
                                type="number"
                                id={'sizeof-cargo'}
                                value={item.height || ''}
                                onChange={(e) => updateItem('height', e.target.value)}
                                min={1}
                                step={1}
                                placeholder={'Высота'}
                            />
                          </div>
                          <div className={'dimensions-box-select'}>
                            <Select
                                classNamePrefix="dimensions-box-select"
                                theme={customTheme}
                                options={typeOfVolumeUnits}
                                defaultValue={{value: 'CM', label: 'CM'}}
                                onChange={(e) => updateItem('volumeUnits', e.value)}
                                noOptionsMessage={() => `Не найдено`}
                                placeholder={'СМ'}
                            />
                          </div>
                        </div>
                        :
                        <div className={'dimensions-pallet-wrapper'}>
                          <div className={'pallet-units-wrapper'}>
                            <div className={'pallet-length'}>120</div>
                            <div className={'width-pallet'}>
                              <Select
                                  classNamePrefix="width-pallet"
                                  theme={customTheme}
                                  options={typeOfWidthPalletUnits}
                                  defaultValue={{value: '100', label: '100'}}
                                  onChange={e => updateItem('widthPallet', e.value)}
                                  noOptionsMessage={() => `Не найдено`}
                                  placeholder={'Ширина'}
                              />
                            </div>
                            <input
                                className={'cargo-input'}
                                type='number'
                                placeholder={'Высота'}
                                value={item.heightPallet || ''}
                                onChange={e => updateItem('heightPallet', e.target.value)}/>
                          </div>
                          <div className={'dimensions-pallet-select'}>
                            <Select
                                classNamePrefix="dimensions-pallet-select"
                                theme={customTheme}
                                options={typeOfVolumeUnits}
                                defaultValue={{value: 'CM', label: 'CM'}}
                                onChange={(e) => updateItem('volumeUnits', e.value)}
                                noOptionsMessage={() => `Не найдено`}
                                placeholder={'СМ'}
                            />
                          </div>
                        </div>
                    }
                  </div>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Вес</label>
                    <div className={'weight-cargo-wrapper'}>
                      <input
                          className={'cargo-input'}
                          type="number"
                          value={item.weight || ''}
                          onChange={(e) => updateItem('weight', e.target.value)}
                          min={1}
                          step={1}
                          placeholder={'Вес'}
                      />
                      <div className={'weight-select'}>
                        <Select
                            classNamePrefix="weight-select"
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
                </div>)
          })}
        </div>
        }
        {containerButtonActive &&
        <div>
          {containerData.map((item, index) => {

            const updateItem = (field, newValue) => {
              updateContainerDataItemField(index, field, newValue)
            }

            const updateType = (newValue) => {
              updateContainerType(index, newValue)
            }

            return (
                <div className={'cargo-input-wrapper'}>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Количество(шт)</label>
                    <input
                        className={'cargo-input count-input'}
                        type="number"
                        value={item.containerCount || ''}
                        onChange={(e) => updateItem('containerCount', e.target.value)}
                        min={1}
                        max={1000}
                        step={1}
                        placeholder={'1'}
                    />
                  </div>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Тип контейнера</label>
                    <div className={'container-buttons-wrapper'}>
                      <button
                          className={`container-button ${containerData[index].smallContainer && 'active'}`}
                          value={'small'}
                          onClick={() => updateType(1)}
                      >20'
                      </button>
                      <button
                          className={`container-button ${containerData[index].mediumContainer && containerType === 2 ? 'active' : ''}`}
                          value={'medium'}
                          onClick={() => updateType(2)}
                      >40'
                      </button>
                      <button
                          className={`container-button ${containerData[index].largeContainer && containerType === 3 ? 'active' : ''}`}
                          value={'large'}
                          onClick={() => updateType(3)}
                      >40'HC
                      </button>
                    </div>
                  </div>
                  <div className={'input-cargo-example'}>
                    <label className={'input-cargo-label'}>Вес</label>
                    <div className={'weight-cargo-wrapper'}>
                      <input
                          className={'cargo-input'}
                          type="number"
                          value={item.containerWeight || ''}
                          onChange={(e) => updateItem('containerWeight', e.target.value)}
                          min={1}
                          step={1}
                          placeholder={'Вес'}
                      />
                      <div className={'weight-select'}>
                        <Select
                            classNamePrefix="weight-select"
                            theme={customTheme}
                            options={typeOfWeightUnits}
                            defaultValue={{value: 'КГ', label: 'КГ'}}
                            onChange={(e) => updateItem('containerWeightUnits', e.value)}
                            placeholder={'КГ'}
                        />
                      </div>
                    </div>
                  </div>
                  <img
                      src={trash}
                      alt={'trash'}
                      className={'trash-icon'}
                      onClick={() => deleteContainerItem(index)}
                  />
                </div>
            )
          })}
        </div>
        }
        <button className={'add-cargo-btn'} onClick={boxButtonActive ? addItem : addContainerItem}>+ Добавить</button>
        {cargoWarning ? <div className={'cargo-warning'}>Все поля должны быть заполнены</div> : ''}
      </div>
  );
};

export default CargoForm;