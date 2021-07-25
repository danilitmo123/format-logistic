import React, {useEffect, useState} from 'react';

import axios from "axios";
import {ADMIN_SERVER_URL} from "../../../constants/URL";
import {Link} from "react-router-dom";

import HubsItem from "./HubsItem";

import loader from '../../../img/loader.svg'

import './AllHubsPage.scss'
import {adminInstance} from "../../../api/admin";


const AllHubsPage = ({setEditing, setId, hubId}) => {

    const [allHubsInfo, setAllHubs] = useState([])
    const [loading, setLoading] = useState(true)

    const getHubs = () => {
        setLoading(true)
        adminInstance.get(`${ADMIN_SERVER_URL}admin-routes/?short`)
            .then(res => {
                setAllHubs([res.data])
            })
        setLoading(false)
    }

    const setEditingHandler = () => {
        setEditing(false)
    }

    const deleteHubHandler = (i) => {
        adminInstance.delete(`${ADMIN_SERVER_URL}admin-routes/${i}/`)
            .then(res => {
                console.log(res)
                getHubs()
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
                        allHubsInfo[0] ?
                            <div className={'hubs'}>
                                {
                                    allHubsInfo[0].map((item, index) => <HubsItem
                                        deleteHub={deleteHubHandler}
                                        index={index}
                                        key={item.id}
                                        setEditing={setEditing}
                                        hub={item}
                                        setId={setId}/>)
                                }
                            </div>
                            :
                            ''
                    }

                </div>
            }
            <Link to={'/admin/create-hub'}>
                <button className={'create-hubs-button'} onClick={setEditingHandler}>Создать плечо</button>
            </Link>
        </section>
    );
};

export default AllHubsPage;