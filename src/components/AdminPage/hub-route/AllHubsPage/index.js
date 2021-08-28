import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import {ADMIN_SERVER_URL} from "../../../../constants/URL";
import loader from '../../../../img/loader.svg'
import './AllHubsPage.scss'
import {adminInstance} from "../../../../api/admin";
import FilterPanel from "../../UI/FilterPanel";
import HubList from "./HubList";
import {useRoutes} from "../../../../utils/useRoutes";



const AllHubsPage = () => {

    const [loading, setLoading] = useState(true)
    const [routes, setRoutes] = useState([])
    const [filter, setFilter] = useState({type: '', countryFrom: '', cityFrom: '', countryTo: '', cityTo: '', clear: false})
    const filteredHubs = useRoutes(routes, filter, setFilter)

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
                  <HubList hubs={filteredHubs.sortedAndSearchRoutes} />
                </table>
            }
            <Link to={'/admin/hub-routes/create'}>
                <button className={'create-hubs-button'}>Создать плечо</button>
            </Link>
        </section>
    );
};

export default AllHubsPage;