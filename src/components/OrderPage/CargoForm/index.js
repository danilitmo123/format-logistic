import React, {useState} from 'react';

import {
  typeOfCargoOptions,
  typeOfVolumeUnits,
  customTheme,
  typeOfWeightUnits
} from "../../../templates/templatesOfOptions";

import Select from 'react-select';

import trash from '../../../img/trash-icon.svg'

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

const CargoForm = () => {

  const [activeContainerButton, setActiveContainerButton] = useState(false)
  const [activeBoxButton, setActiveBoxButton] = useState(true)
  const [firstContainerButton, setActiveFirstContainerButton] = useState(true)
  const [secondContainerButton, setActiveSecondContainerButton] = useState(false)
  const [thirdContainerButton, setActiveThirdContainerButton] = useState(false)
  const [volume, setVolume] = useState(0)
  const [weight, setWeight] = useState(0)
  const [data, setData] = useState([objectTemplate])

  const addItem = () => {
    const newData = [...data, {...objectTemplate}]
    setData(newData)
  }

  const deleteItem = (i) => {
    const newData = [...data.slice(0, i), ...data.slice(i + 1)]
    setWeight(weight - data[i].weight)
    if (data[i].cargo === 'Паллеты') {
      setVolume(volume - 120 * data[i].heightPallet * data[i].widthPallet)
    } else {
      setVolume(volume - data[i].length * data[i].width * data[i].height)
    }
    setData(newData)
  }

  const calculateVolume = (newData) => {
    let totalVolumeCM = 0
    let totalVolumeIN = 0
    newData.forEach(item => {
      switch (item.volumeUnits) {
        case 'CM':
          if(item.cargo === 'Паллеты') {
            totalVolumeCM += 120 * item.widthPallet * item.heightPallet
          } else {
            totalVolumeCM += item.width * item.length * item.height
          }
          setVolume(totalVolumeCM + totalVolumeIN)
          break
        case 'IN':
          if(item.cargo === 'Паллеты') {
            totalVolumeIN += (120 * item.widthPallet * item.heightPallet) * 2.54
          } else {
            totalVolumeIN += (item.width * item.length * item.height) * 2.54
          }
          setVolume(totalVolumeCM + totalVolumeIN)
          break
      }
    })
  }

  const calculateWeight = (newData) => {
    let totalWeightKG = 0
    let totalWeightLB = 0
    newData.forEach(item => {
      switch (item.weightUnits) {
        case 'КГ':
          totalWeightKG += +item.weight
          setWeight(totalWeightKG + totalWeightLB)
          break
        case 'LB':
          totalWeightLB += item.weight * 2.2
          setWeight(totalWeightKG + totalWeightLB)
          break
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

  const ActiveContainerButtonHandler = () => {
    setActiveContainerButton(true)
    setActiveBoxButton(false)
  }

  const FirstContainerActiveButtonHandler = () => {
    setActiveFirstContainerButton(!firstContainerButton)
    setActiveSecondContainerButton(false)
    setActiveThirdContainerButton(false)
  }

  const SecondContainerActiveButtonHandler = () => {
    setActiveFirstContainerButton(false)
    setActiveSecondContainerButton(!secondContainerButton)
    setActiveThirdContainerButton(false)
  }

  const ThirdContainerActiveButtonHandler = () => {
    setActiveFirstContainerButton(false)
    setActiveSecondContainerButton(false)
    setActiveThirdContainerButton(!thirdContainerButton)
  }

  return (
      <div className={'cargo-wrapper'}>
        <div className={'title-wrapper'}>
          <div className={'cargo-title'}>Груз</div>
          <div className={'cargo-all-info'}>Грузов: {data.length} Общий вес: {weight} кг Общий объем: {volume} см³</div>
        </div>
        <div className={'cargo-choice'}>
          <div className={activeBoxButton ? 'active-box-button' : 'box'}
               onClick={ActiveBoxButtonHandler}>Коробки/Паллеты
          </div>
          {/*<div className={activeContainerButton ? 'active-container-button' : 'container'}*/}
          {/*     onClick={ActiveContainerButtonHandler}>Контейнеры*/}
          {/*</div>*/}
        </div>
        {data.map((item, index) => {

          const updateItem = (field, newValue) => {
            updateDataItemField(index, field, newValue)
          }

          return (
              <div className={'cargo-input-wrapper'} key={index}>
                {
                  !activeContainerButton ?
                      <div className={'wrapper'}>
                        <div className={'typeof-cargo'}>
                          <label htmlFor={'typeof-cargo'}>Тип груза</label>
                          <Select
                              theme={customTheme}
                              options={typeOfCargoOptions}
                              onChange={(e) => updateItem('cargo', e.value)}
                              noOptionsMessage={() => `Не найдено 🖕`}
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
                              placeholder={'1'}/>
                        </div>
                        <div className={'sizeof-cargo'}>
                          <div className={'sizeof-cargo-input'}>
                            {
                              item.cargo === 'Коробки' ?
                                  <>
                                    <label htmlFor={'sizeof-cargo'}>Габариты</label>
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
                                      <div className={'units-select'}>
                                        <Select
                                            theme={customTheme}
                                            options={typeOfVolumeUnits}
                                            defaultValue={{value: 'CM', label: 'CM'}}
                                            onChange={(e) => updateItem('volumeUnits', e.value)}
                                            noOptionsMessage={() => `Не найдено 🖕`}
                                            placeholder={'СМ'}
                                        />
                                      </div>
                                    </div>
                                  </>
                                  :
                                  <div className={'sizeof-pallet-wrapper'}>
                                    <label htmlFor={'sizeof-pallet'}>Паллет</label>
                                    <div className={'pallet-select-wrapper'}>
                                      <div className={'pallet-length'}>120</div>
                                      <select
                                          name="pallet-width"
                                          id="pallet-width"
                                          value={item.widthPallet}
                                          onChange={e => updateItem('widthPallet', e.target.value)}
                                      >
                                        <option value="100">100</option>
                                        <option value="80">80</option>
                                      </select>
                                      <input
                                          type='number'
                                          placeholder={'Высота'}
                                          value={item.heightPallet || ''}
                                          onChange={e => updateItem('heightPallet', e.target.value)}/>
                                      <Select
                                          theme={customTheme}
                                          options={typeOfVolumeUnits}
                                          defaultValue={{value: 'CM', label: 'CM'}}
                                          onChange={(e) => updateItem('volumeUnits', e.value)}
                                          noOptionsMessage={() => `Не найдено 🖕`}
                                          placeholder={'СМ'}
                                      />
                                    </div>
                                  </div>
                            }
                          </div>
                        </div>
                        <div className={'weight-cargo'}>
                          <label htmlFor={'weight-cargo'}>Вес</label>
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
                            <Select
                                theme={customTheme}
                                options={typeOfWeightUnits}
                                defaultValue={{value: 'КГ', label: 'КГ'}}
                                onChange={(e) => updateItem('weightUnits', e.value)}
                                noOptionsMessage={() => `Не найдено`}
                                placeholder={'КГ'}
                            />
                          </div>
                        </div>
                        <img
                            src={trash}
                            alt={'trash'}
                            className={'trash-icon'}
                            onClick={() => deleteItem(index)}
                        />
                      </div>
                      :
                      <div className={'countof-pallet-wrapper'}>
                        <div className={'countof-pallet'}>
                          <label htmlFor={'countof-pallet'}>Количество(шт)</label>
                          <input
                              type="number"
                              id={'countof-pallet'}
                              min={1}
                              step={1}
                              placeholder={'1'}
                          />
                        </div>
                        <div className={'container-buttons'}>
                          <div className={'container-buttons-title'}>Тип контейнера</div>
                          <div className={'container-buttons-wrapper'}>
                            <div
                                onClick={FirstContainerActiveButtonHandler}
                                className={firstContainerButton ? 'active-first-button' : 'first-button'}>20'
                            </div>
                            <div
                                onClick={SecondContainerActiveButtonHandler}
                                className={secondContainerButton ? 'active-second-button' : 'second-button'}>40'
                            </div>
                            <div
                                onClick={ThirdContainerActiveButtonHandler}
                                className={thirdContainerButton ? 'active-third-button' : 'third-button'}>40'HC
                            </div>
                          </div>
                        </div>
                        <div className={'weight-pallet'}>
                          <label htmlFor={'weight-pallet'}>Вес</label>
                          <div className={'weight-pallet-input'}>
                            <input
                                type="number"
                                id={'weight-cargo'}
                                min={1}
                                step={1}
                                placeholder={item.weightBoxSelect === 'KG' ? 'KG' : 'Фунты'}
                            />
                            <select name="weight-pallet" id="weight-cargo">
                              <option value="KG">KG</option>
                              <option value="LB">LB</option>
                            </select>
                          </div>
                        </div>
                      </div>
                }
              </div>
          )})}
          <button className={'add-cargo-btn'} onClick={addItem}>+ Добавить</button>
      </div>
  );
};

export default CargoForm;