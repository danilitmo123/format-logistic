import {Link, useParams} from "react-router-dom";
import {HubRouteBlock} from "../HubRouteBlock";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";

const EditHubRoutePage = () => {
    const { id } = useParams();
    const [initData, setInitData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${ADMIN_SERVER_URL}admin-routes/${id}`).then(res => {
            setInitData(res.data)
            setLoading(false)
        })
    }, [])


    return (
        <section className={'hubs-page-wrapper'}>
            <div className={'top-hubs-tile'}>
                <div className={'title'}>
                    <div className={'hubs-title'}>Редактирования плеча</div>
                </div>
                <Link to={'/admin/hub-routes/'}>
                    <button className={'back-to-hubs-button'}>Вернуться</button>
                </Link>
            </div>
            {!loading ?
                <HubRouteBlock initData={initData}/> : ""
            }

        </section>
    );
};

export default EditHubRoutePage;