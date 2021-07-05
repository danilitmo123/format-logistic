const ServiceRankedItem = ({initData, setData, onDelete}) => {

    const setName = (name) => {
        setData({...initData, name: name})
    }
    const setPPE = (ppe) => {
        setData({...initData, price_per_unit: ppe})
    }
    const setType = (type) => {
        setData({...initData, rank_type: type})
    }

    return (
        <div>

        </div>
    )

}