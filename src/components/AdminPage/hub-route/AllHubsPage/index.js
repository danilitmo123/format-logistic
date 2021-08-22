import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";

import HubsItem from "./HubsItem";

import loader from '../../../../img/loader.svg'

import './AllHubsPage.scss'
import {adminInstance} from "../../../../api/admin";


const AllHubsPage = () => {

    const [loading, setLoading] = useState(true)
    const [routes, setRoutes] = useState([])

    const getHubs = () => {
        adminInstance.get(`${ADMIN_SERVER_URL}admin-routes/?short`)
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
                <table className={'hubs-table'}>
                  <thead className={'hubs-table-header'}>
                    <tr>
                      <th>Плечо</th>
                      <th>Основная информация</th>
                    </tr>
                  </thead>
                  <tbody className={'table-body'}>
                    {
                      routes ?
                          <>
                            {
                              routes.map((item) => <HubsItem
                                  hub={item}
                              />)
                            }
                          </>
                          :
                          ''
                    }
                  </tbody>

                </table>
            }
            <Link to={'/admin/hub-routes/create'}>
                <button className={'create-hubs-button'}>Создать плечо</button>
            </Link>
        </section>
    );
};

export default AllHubsPage;