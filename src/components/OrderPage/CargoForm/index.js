import React, {useEffect, useState} from 'react';

import {
  typeOfCargoOptions,
  typeOfVolumeUnits,
  typeOfWeightUnits,
  typeOfWidthPalletUnits,
  typeOfContainer
} from "../../../templates/templatesOfOptions";

import {Select, Input, Button, Row, Col} from 'antd';

import trash from '../../../img/trash.svg'
import box from '../../../img/box-icon.svg'
import container from '../../../img/container-icon.svg'
import whiteBox from '../../../img/white-box-icon.svg'
import whiteContainer from '../../../img/white-container-icon.svg'

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
  containerType: 'SMALL'
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
                     setContainerDataRaw,
                     setContainerWeight,
                     containerWeight,
                     smallCount,
                     setSmallCount,
                     middleCount,
                     setMiddleCount,
                     bigCount,
                     setBigCount,
                     activeCargo,
                     setActiveCargo
                   }) => {

  const [boxButtonActive, setBoxButtonActive] = useState(true)
  const [containerButtonActive, setContainerButtonActive] = useState(false)

  const setData = (data) => {
    localStorage.setItem('cargo', JSON.stringify(data))
    setDataRaw(data)
  }

  const setContainerData = (containers) => {
    localStorage.setItem('containers', JSON.stringify(containers))
    setContainerDataRaw(containers)
  }

  useEffect(() => {
    if (data.length === 0) {
      let initData = [{
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
      localStorage.setItem('cargo', JSON.stringify(initData))
    } else {
      localStorage.setItem('cargo', JSON.stringify(data))
    }

  }, [data])

  useEffect(() => {
    if (containerData.length === 0) {
      let initData = [{
        containerCount: 1,
        containerWeight: 0,
        containerWeightUnits: 'КГ',
        containerType: 'small'
      }]
      localStorage.setItem('containers', JSON.stringify(initData))
    } else {
      localStorage.setItem('containers', JSON.stringify(containerData))
    }
  }, [])

  useEffect(() => {
    const storageCargo = JSON.parse(localStorage.getItem('cargo'));
    if (storageCargo) {
      setData(storageCargo);
    }
  }, []);

  useEffect(() => {
    const storageCargo = JSON.parse(localStorage.getItem('containers'));
    if (storageCargo) {
      setContainerData(storageCargo);
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
          setVolume((volume - 120 * +data[i].heightPallet * +data[i].widthPallet * data[i].count).toFixed(2))
        } else {
          setVolume((volume - +data[i].length * +data[i].width * +data[i].height * +data[i].count).toFixed(2))
        }
        break
      case 'CM':
        if (data[i].cargo === 'Паллеты') {
          setVolume((volume - (120 * +data[i].heightPallet * +data[i].widthPallet * +data[i].count) / 1000000).toFixed(2))
        } else {
          setVolume((volume - (+data[i].length * +data[i].width * +data[i].height * +data[i].count) / 1000000).toFixed(2))
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

  useEffect(() => {
    let totalWeightKG = 0
    let totalWeightLB = 0
    containerData.forEach(item => {
      switch (item.containerWeightUnits) {
        case 'КГ':
          totalWeightKG += +item.containerWeight * +item.containerCount
          break
        case 'LB':
          totalWeightLB += +item.containerWeight * +item.containerCount / 2.2
          break
        default:
          return ''
      }
    })
    setContainerWeight((totalWeightKG + totalWeightLB).toFixed(2))
    setContainerWeight((totalWeightKG + totalWeightLB).toFixed(2))
  }, [containerData])

  useEffect(() => {
    let totalSmallCount = 0
    let totalMiddleCount = 0
    let totalBigCount = 0
    containerData.forEach(item => {
      switch (item.containerType) {
        case 'SMALL':
          totalSmallCount += +item.containerCount
          break
        case 'MIDDLE':
          totalMiddleCount += +item.containerCount
          break
        case 'BIG':
          totalBigCount += +item.containerCount
          break
      }
    })
    setSmallCount(totalSmallCount)
    setMiddleCount(totalMiddleCount)
    setBigCount(totalBigCount)
  }, [containerData])


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
  }

  const updateBoxActive = () => {
    setContainerButtonActive(false)
    setBoxButtonActive(true)
    setActiveCargo('box')
  }

  const updateContainerActive = () => {
    setContainerButtonActive(true)
    setBoxButtonActive(false)
    setActiveCargo('container')
  }

  useEffect(() => {
    if (boxButtonActive) {
      localStorage.setItem('goodType', 'BOX')
    }
    if (containerButtonActive) {
      localStorage.setItem('goodType', 'CONTAINER')
    }
  }, [boxButtonActive, containerButtonActive])

  return (
    <div className={'cargo-wrapper'}>
      <Row className={'title-wrapper'}>
        <Col span={4} className={'cargo-title'}>Груз</Col>
        {boxButtonActive ?
          <Col span={20} className={'cargo-all-info'}>Грузов: {data.length} Общий вес: {weight ? weight : 0} кг Общий
            объем: {volume ? volume : 0} м³</Col>
          :
          <Col span={20} className={'cargo-all-info'}>Грузов: {smallCount}x20', {middleCount}x40', {bigCount}x40'HC
            Общий
            вес: {containerWeight ? containerWeight : 0} кг</Col>
        }
      </Row>
      <div className={'cargo-choice'}>
        <Button
          style={{borderRadius: '4px 0 0 4px'}}
          type={boxButtonActive ? 'primary' : 'default'}
          onClick={updateBoxActive}
        >
          <div className={'button-wrapper'}>
            {boxButtonActive ?
              <img src={whiteBox} alt="box" className={'button-icon box'}/> :
              <img src={box} alt="box" className={'button-icon box'}/>
            }
            <span>Коробки / Паллеты</span>
          </div>
        </Button>
        <Button
          style={{borderRadius: '0 4px 4px 0'}}
          type={containerButtonActive ? 'primary' : 'default'}
          onClick={updateContainerActive}
        >
          <div className={'button-wrapper'}>
            {containerButtonActive ?
              <img src={whiteContainer} alt="container" className={'button-icon'}/> :
              <img src={container} alt="container" className={'button-icon'}/>
            }
            <span>Контейнеры</span>
          </div>
        </Button>
      </div>
      {boxButtonActive &&
      <div>
        {data.map((item, index) => {

          const updateItem = (field, newValue) => {
            updateDataItemField(index, field, newValue)
          }

          return (
            <Row className={'cargo-input-wrapper'} key={index}>
              <Col span={3} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Тип груза</label>
                <div className={'choose-cargo-select'}>
                  <Select
                    style={{width: '100%'}}
                    onChange={(value) => updateItem('cargo', value)}
                    placeholder={'Коробки'}
                    defaultValue={'Коробки'}
                  >
                    {typeOfCargoOptions.map(cargo => (
                      <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={3} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Количество <span
                  className={'additional-info'}>(шт)</span></label>
                <Input
                  style={{width: '100%'}}
                  type="number"
                  value={item.count || ''}
                  onChange={(e) => updateItem('count', e.target.value)}
                  min={1}
                  max={1000}
                  step={1}
                  placeholder={'1'}
                />
              </Col>
              <Col span={9} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Габариты <span className={'additional-info'}>(L&#215;W&#215;H за единицу)</span></label>
                {item.cargo === 'Коробки' ?
                  <div className={'dimensions-box-wrapper'} style={{width: '100%'}}>
                    <div className={'box-units-wrapper'}>
                      <Input
                        type="number"
                        style={{width: '25%', borderRadius: '4px 0 0 4px'}}
                        id={'sizeof-cargo'}
                        value={item.length || ''}
                        onChange={(e) => updateItem('length', e.target.value)}
                        min={1}
                        step={1}
                        placeholder={'Длина'}
                      />
                      <Input
                        type="number"
                        style={{width: '25%', borderRadius: '0'}}
                        id={'sizeof-cargo'}
                        value={item.width || ''}
                        onChange={(e) => updateItem('width', e.target.value)}
                        min={1}
                        step={1}
                        placeholder={'Ширина'}
                      />
                      <Input
                        type="number"
                        style={{width: '25%', borderRadius: '0'}}
                        id={'sizeof-cargo'}
                        value={item.height || ''}
                        onChange={(e) => updateItem('height', e.target.value)}
                        min={1}
                        step={1}
                        placeholder={'Высота'}
                      />
                      <Select
                        style={{width: '25%', borderRadius: '0 4px 4px 0'}}
                        onChange={(value) => updateItem('volumeUnits', value)}
                        placeholder={'CM'}
                        defaultValue={'CM'}
                      >
                        {typeOfVolumeUnits.map(cargo => (
                          <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  :
                  <div className={'dimensions-pallet-wrapper'} style={{width: '100%'}}>
                    <div className={'pallet-units-wrapper'}>
                      <div className={'pallet-length'} style={{width: '25%', borderRadius: '4px 0 0 4px'}}>120</div>
                      <Select
                        style={{width: '25%', borderRadius: '0'}}
                        onChange={(value) => updateItem('widthPallet', value)}
                        placeholder={'100'}
                        defaultValue={'100'}
                      >
                        {typeOfWidthPalletUnits.map(cargo => (
                          <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                        ))}
                      </Select>
                      <Input
                        style={{width: '25%', borderRadius: '0'}}
                        type='number'
                        placeholder={'Высота'}
                        value={item.heightPallet || ''}
                        onChange={e => updateItem('heightPallet', e.target.value)}/>
                      <Select
                        style={{width: '25%'}}
                        onChange={(value) => updateItem('volumeUnits', value)}
                        placeholder={'CM'}
                        defaultValue={'CM'}
                      >
                        {typeOfVolumeUnits.map(cargo => (
                          <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                }
              </Col>
              <Col span={4} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Вес <span
                  className={'additional-info'}>(За единицу)</span></label>
                <div className={'weight-cargo-wrapper'} style={{width: '100%'}}>
                  <Input
                    type="number"
                    style={{width: '50%', borderRadius: '4px 0 0 4px'}}
                    value={item.weight || ''}
                    onChange={(e) => updateItem('weight', e.target.value)}
                    min={1}
                    step={1}
                    placeholder={'Вес'}
                  />
                  <Select
                    style={{width: '50%', borderRadius: '0 4px 4px 0'}}
                    onChange={(value) => updateItem('weightUnits', value)}
                    placeholder={'КГ'}
                    defaultValue={'КГ'}
                  >
                    {typeOfWeightUnits.map(cargo => (
                      <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={1}>
                <img
                  src={trash}
                  alt={'trash'}
                  className={'trash-icon'}
                  onClick={() => deleteItem(index)}
                />
              </Col>
            </Row>)
        })}
      </div>
      }
      {containerButtonActive &&
      <div>
        {containerData.map((item, index) => {

          const updateItem = (field, newValue) => {
            updateContainerDataItemField(index, field, newValue)
          }

          return (
            <Row className={'cargo-input-wrapper'}>
              <Col span={3} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Тип контейнера</label>
                <Select
                  onChange={(value) => updateItem('containerType', value)}
                  placeholder={'Контейнер'}
                  defaultValue={'SMALL'}
                >
                  {typeOfContainer.map(cargo => (
                    <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={3} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Количество <span
                  className={'additional-info'}>(шт)</span></label>
                <Input
                  type="number"
                  value={item.containerCount || ''}
                  onChange={(e) => updateItem('containerCount', e.target.value)}
                  min={1}
                  max={1000}
                  step={1}
                  placeholder={'1'}
                />
              </Col>
              <Col span={5} className={'input-cargo-example'}>
                <label className={'input-cargo-label'}>Вес <span
                  className={'additional-info'}>(За единицу)</span></label>
                <div className={'weight-cargo-wrapper'}>
                  <Input
                    type="number"
                    value={item.containerWeight || ''}
                    onChange={(e) => updateItem('containerWeight', e.target.value)}
                    min={1}
                    step={1}
                    style={{width: '50%', borderRadius: '4px 0 0 4px'}}
                    placeholder={'Вес'}
                  />
                  <Select
                    onChange={(value) => updateItem('containerWeightUnits', value)}
                    placeholder={'КГ'}
                    defaultValue={'КГ'}
                    style={{width: '50%'}}
                  >
                    {typeOfWeightUnits.map(cargo => (
                      <Select.Option value={cargo.value} key={cargo.value}>{cargo.label}</Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={3}>
                <img
                  src={trash}
                  alt={'trash'}
                  className={'trash-icon'}
                  onClick={() => deleteContainerItem(index)}
                />
              </Col>
            </Row>
          )
        })}
      </div>
      }
      <Button onClick={boxButtonActive ? addItem : addContainerItem} type='default'>+ Добавить</Button>
      {cargoWarning ? <div className={'cargo-warning'}>Все поля должны быть заполнены</div> : ''}
    </div>
  );
};

export default CargoForm;
