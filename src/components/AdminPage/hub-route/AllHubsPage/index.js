import React, {useEffect, useState} from 'react';

import axios from "axios";
import {Link} from "react-router-dom";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";

import HubsItem from "./HubsItem";

import loader from '../../../../img/loader.svg'

import './AllHubsPage.scss'

const AllHubsPage = () => {

    const [loading, setLoading] = useState(true)
    const [routes, setRoutes] = useState([])

    const getHubs = () => {
        axios.get(`${ADMIN_SERVER_URL}admin-routes/?short`)
            .then(res => {
                setRoutes(res.data)
                setLoading(false)
            })

    }

    useEffect(() => {
        getHubs()
    }, [])


    return (
        <section className={'all-hubs-page-wrapper'}>
            <div className={'hub-title'}>Хабовые плечи</div>
            {loading ?
                <div className={'loading-wrapper'}>
                    <img src={loader} alt="loader"/>
                    <div className={'loader-text'}>Загрузка...</div>
                </div>
                :
                <div className={'all-hubs-wrapper'}>
                    {
                        routes ?
                            <div className={'hubs'}>
                                {
                                    routes.map((item) => <HubsItem
                                        hub={item} setManageHub
                                    />)
                                }
                            </div>
                            :
                            ''
                    }

                </div>
            }
            <Link to={'/admin/hub-routes/create'}>
                <button className={'create-hubs-button'}>Создать плечо</button>
            </Link>
        </section>
    );
};

export default AllHubsPage;