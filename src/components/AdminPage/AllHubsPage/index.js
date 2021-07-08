import React,{useEffect,useState} from 'react';

import HubsItem from "./HubsItem";

import axios from "axios";
import {Link} from "react-router-dom";

import loader from '../../../img/loader.svg'

import './AllHubsPage.scss'
import {ADMIN_SERVER_URL} from "../../../constants/URL";

const AllHubsPage = ({setEditing, allHubsInfo, setAllHubs, setId}) => {

  const [loading, setLoading] = useState(true)

  const getHubs = () => {
    axios.get(`${ADMIN_SERVER_URL}admin-routes/?short`)
        .then(res => {setAllHubs([res.data])})
    setLoading(false)
  }

  const setEditingHandler = () => {
    setEditing(false)
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
                      allHubsInfo[0].map((item) => <HubsItem
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