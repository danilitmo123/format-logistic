import React,{useEffect,useState} from 'react';

import HubsItem from "./HubsItem";

import axios from "axios";
import {Link} from "react-router-dom";

import loader from '../../../img/loader.svg'

import './AllHubsPage.scss'

const AllHubsPage = () => {

  const [allHubsInfo, setAllHubsInfo] = useState([])
  const [loading, setLoading] = useState(true)

  const getHubs = () => {
    axios.get('https://ancient-temple-39835.herokuapp.com/api-admin/admin-routes/?short')
        .then(res => {setAllHubsInfo([res.data])})
    setLoading(false)
  }

  console.log(allHubsInfo[0])

  useEffect(() => {
    getHubs()
  }, [])

 return (
    <section className={'all-hubs-page-wrapper'}>
      {loading ?
          <div className={'loading-wrapper'}>
            <img src={loader} alt="loader"/>
            <div className={'loader-text'}>Загрузка...</div>
          </div>
          :
          <div>
            {
              allHubsInfo[0] ?
                  <div className={'card-wrapper'}>
                    {
                      allHubsInfo[0].map((item) => <HubsItem hub={item}/>)
                    }
                  </div>
                  :
                  ''
            }

          </div>
      }
      <Link to={'/admin/hubs/create'}>
        <button>Добавить плечо</button>
      </Link>
    </section>
 );
};

export default AllHubsPage;