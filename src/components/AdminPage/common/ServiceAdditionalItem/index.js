import trash from "../../../../img/trash-icon.svg";
import React from "react";

const ServiceItem = ({initData, setData, index, deleteItem}) => {

    const setName = (name) => {
        setData ({...initData, name: name})
    }
    const setPrice = (type) => {
        setData ({...initData, type: type})
    }

    return (
        <div>
            <input type="text" onChange={setName}/>
            <input type="number" onChange={setPrice}/>
            <img src={trash} onClick={() => deleteItem()} alt="trash"/>
        </div>
    )
}
export default ServiceItem