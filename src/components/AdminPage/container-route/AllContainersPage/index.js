import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import loader from '../../../../img/loader.svg'
import './AllContainersPage.scss'
import {adminInstance} from "../../../../api/admin";
import FilterPanel from "../../UI/FilterPanel";
import {useRoutes} from "../../../../utils/useRoutes";
import HubList from "../../hub-route/AllHubsPage/HubList";


const AllContainersPage = () => {

    const [loading, setLoading] = useState(true)
    const [routes, setRoutes] = useState([])
    const [filter, setFilter] = useState({
        type: '',
        countryFrom: '',
        cityFrom: '',
        countryTo: '',
        cityTo: '',
        date: '',
        clear: false
    })

    const filteredHubs = useRoutes(routes, filter)

    const getHubs = () => {
        adminInstance.get(`${ADMIN_SERVER_URL}admin-routes/?short&type=CONTAINER`)
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
            <div className={'hub-title'}>Контейнерные хабовые плечи</div>
            <FilterPanel filter={filter} setFilter={setFilter}/>
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
                        <th>Название плеча</th>
                        <th>Страна отправления</th>
                        <th>Город отправления</th>
                        <th>Страна прибытия</th>
                        <th>Город прибытия</th>
                        <th>Тип перевозки</th>
                        <th>Активно до</th>
                    </tr>
                    </thead>
                    <HubList hubs={filteredHubs.sortedAndSearchRoutes}/>
                </table>
            }
            <Link to={'/admin/container-routes/create'}>
                <button className={'create-hubs-button'}>Создать плечо</button>
            </Link>
        </section>
    );
};

export default AllContainersPage;