import React,{useState} from 'react';
import trash from "../../../../img/trash-icon.svg";


import './ServiceRankedItem.scss'

const ServiceRankedItem = ({initData, setData, onDelete}) => {

    const [name, setNameRaw] = useState(initData.name)
    const [rank_type, setTypeRaw] = useState(initData.rank_type)
    const [ppu, setPpuRaw] = useState(initData.price_per_unit)

    const setName = (name) => {
        setNameRaw(name.target.value)
        setData({...initData, name: name.target.value})
    }
    const setPpu = (ppu) => {
        setPpuRaw(ppu.target.value)
        setData({...initData, price_per_unit: ppu.target.value})
    }
    const setType = (type) => {
        setTypeRaw(type.target.value)
        setData({...initData, rank_type: type.target.value})
    }

    return (
        <div className={'service-ranked-wrapper'}>
            <input type="text" onChange={setName} placeholder={'Услуга'}/>
            <input type="text" onChange={setPpu} value={ppu}/>
            <select name="rank_type" id="rank_type" onChange={setType} value={rank_type}>
                <option value="MASS">за кг</option>
                <option value="SIZE">за м³</option>
                <option value="LDM">за ldm</option>
            </select>
            <img src={trash} onClick={onDelete} alt="trash"/>
        </div>
    )

}
export default ServiceRankedItem