import PathCard from "./PathCard";
import "./main.css"
const MapContainer = ({paths}) => {


    return (
        <div>
            <div className={'map-container'}>
                {paths.map(path => {
                    return (<PathCard
                        path={path}
                    />)
                })}
            </div>
        </div>
    )
}
export default MapContainer;