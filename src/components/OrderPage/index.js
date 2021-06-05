import React, {useState} from 'react';

import CountryForm from "./CountryForm";
import CustomsClearanceForm from "./CustomsClearanceForm";
import InsuranceForm from './InsuranceForm'
import CheckPathPage from "./CheckPathPage";

import {Link, Route} from "react-router-dom";


import trash from '../../img/trash-icon.svg'

import './OrderPage.scss'
import axios from "axios";


const objectTemplate = {
    cargo: 'Коробки',
    count: 1,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    size: 'СМ',
    sizePallet: '120 X 80см (Евро-1)',
    weightBoxSelect: 'KG',
}


const OrderPage = () => {

        const [activeContainerButton, setActiveContainerButton] = useState(false)
        const [activeBoxButton, setActiveBoxButton] = useState(true)
        const [firstContainerButton, setActiveFirstContainerButton] = useState(true)
        const [secondContainerButton, setActiveSecondContainerButton] = useState(false)
        const [thirdContainerButton, setActiveThirdContainerButton] = useState(false)
        const [volume, setVolume] = useState(0)
        const [weight, setWeight] = useState(0)
        const [data, setData] = useState([objectTemplate])
        const [continueButton, setContinueButton] = useState(false)


        const [pathLoaded, setPathLoaded] = useState(false)
        const [paths, setPaths] = useState([])

        const addItem = () => {
            const newData = [...data, {...objectTemplate}]
            setData(newData)
        }

        const deleteItem = (i) => {
            const newData = [...data.slice(0, i), ...data.slice(i + 1)]
            setData(newData)
        }

        const calculateVolume = (newData) => {
            let totalVolume = 0
            newData.forEach(item => {
                totalVolume += item.count * (item.height * item.width * item.length)
                setVolume(totalVolume)
            })
        }

        const calculateWeight = (newData) => {
            let totalWeight = 0
            newData.forEach(item => {

                totalWeight += item.count * (+item.weight)
                setWeight(totalWeight)
            })
            console.log(weight)
        }

        const Circle = ({number}) => {
            return (
                <div className={'order-circle'}>{number}</div>
            )
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
            setActiveBoxButton(!activeBoxButton)
            setActiveContainerButton(false)
        }

        const ActiveContainerButtonHandler = () => {
            setActiveContainerButton(!activeContainerButton)
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

        const loadPath = (city1, city2) => {
            axios.get("http://127.0.0.1:8000/route/paths?city1=" + city1 + "&city2=" + city2).then(res => {
                    setPaths(res.data.paths)
                    setPathLoaded(true)
                }
            )
        }

        const ContinueButtonHandler = () => {
            setContinueButton(true)
            loadPath(98261, 34616)
            console.log(1)
        }

        return (
            <section className={'order-page-wrapper'}>
                <div className={'order-title'}>Рассчитать перевозку</div>
                <div className={'roadmap-order-wrapper'}>
                    <ol className={'order-circle-container'}>
                        <li><Circle number={'1'}/></li>
                        <li><Circle number={'2'}/></li>
                        <li><Circle number={'3'}/></li>
                    </ol>
                </div>
                {!continueButton ?
                    <div className={'form-wrapper'}>
                        <div className={'cargo-wrapper'}>
                            <div className={'title-wrapper'}>
                                <div className={'cargo-title'}>Груз</div>
                                <div className={'cargo-all-info'}>Элементов: {data.length} Общий вес: {weight} кг Общий
                                    объем: {volume} м³
                                </div>
                            </div>
                            <div className={'cargo-choice'}>
                                <div className={activeBoxButton ? 'active-box-button' : 'box'}
                                     onClick={ActiveBoxButtonHandler}>Коробки/Паллеты
                                </div>
                                <div className={activeContainerButton ? 'active-container-button' : 'container'}
                                     onClick={ActiveContainerButtonHandler}>Контейнеры
                                </div>
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
                                                        <select name='Тип Груза' id={'typeof-cargo'} value={item.cargo}
                                                                onChange={(e) => updateItem('cargo', e.target.value)}>
                                                            <option>Коробки</option>
                                                            <option>Паллеты</option>
                                                        </select>
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
                                                                                placeholder={'Длина'}/>
                                                                            <input
                                                                                type="number"
                                                                                id={'sizeof-cargo'}
                                                                                value={item.width || ''}
                                                                                onChange={(e) => updateItem('width', e.target.value)}
                                                                                min={1}
                                                                                step={1}
                                                                                placeholder={'Ширина'}/>
                                                                            <input
                                                                                type="number"
                                                                                id={'sizeof-cargo'}
                                                                                value={item.height || ''}
                                                                                onChange={(e) => updateItem('height', e.target.value)}
                                                                                min={1}
                                                                                step={1}
                                                                                placeholder={'Высота'}/>
                                                                            <select name="CM" id="sizeof-cargo"
                                                                                    value={item.size}
                                                                                    onChange={(e) => updateItem('size', e.target.value)}>
                                                                                <option value={'M'}>M</option>
                                                                                <option value={'CM'}>CM</option>
                                                                                <option value={'IN'}>IN</option>
                                                                                <option value={'FT'}>FT</option>
                                                                            </select>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className={'sizeof-pallet-wrapper'}>
                                                                        <label htmlFor={'sizeof-pallet'}>Паллет</label>
                                                                        <select name={'sizeof-pallet'} id={'sizeof-pallet'}
                                                                                value={item.sizePallet}
                                                                                onChange={(e) => updateItem('sizePallet', e.target.value)}>
                                                                            <option>120 X 80 (Евро-1)</option>
                                                                            <option>120 X 100 (Евро-2)</option>
                                                                        </select>
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
                                                                placeholder={item.weightBoxSelect === 'KG' ? 'KG' : 'Фунты'}/>
                                                            <select name="weight-cargo" value={item.weight}
                                                                    onChange={(e) => updateItem('weight', e.target.value)}
                                                                    id="weight-cargo">
                                                                <option value="KG">KG</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <img src={trash} alt={'trash'} className={'trash-icon'}
                                                         onClick={() => deleteItem(index)}/>
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
                                                            placeholder={'1'}/>
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
                                                                placeholder={item.weightBoxSelect === 'KG' ? 'KG' : 'Фунты'}/>
                                                            <select name="weight-pallet" id="weight-cargo">
                                                                <option value="KG">KG</option>
                                                                <option value="LB">LB</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                        }
                                    </div>
                                )
                            })}
                            <button className={'add-cargo-btn'} onClick={addItem}>+ Добавить</button>
                        </div>
                        <CountryForm/>
                        <CustomsClearanceForm/>
                        <InsuranceForm/>
                        <Link to={'order/second-step'}>
                            <button className={'continue-button'} onClick={ContinueButtonHandler}>Продолжить</button>
                        </Link>
                    </div>
                    :
                    // <Route to={'order/second-step'}>
                        <div>{pathLoaded ? <CheckPathPage paths={paths}/> : <Circle/>}</div>
                    // </Route>
                }
            </section>
        );
    }
;

export default OrderPage;