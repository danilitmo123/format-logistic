import React,{useState, useEffect} from 'react';

import {Link} from 'react-router-dom'
import axios from 'axios'

import './MainMenuAdmin.scss'

const MainMenuAdmin = () => {

  return (
      <section className={'admin-page-wrapper'}>
        <div className={'admin-buttons-wrapper'}>
          <Link to={'/admin/hubs'}>
            <button className={'button-in-admin'}>Хабовые плечи</button>
          </Link>
<<<<<<< HEAD
          <Link to={'/admin/routes'}>
=======
          <Link to={'./admin/routes'}>
>>>>>>> 52c149b22c22d4ff6afbb6a03d1424e1f1be4ed3
            <button className={'button-in-admin'}>Вспомогательные плечи</button>
          </Link>
          <Link to={'/admin/zones'}>
            <button className={'button-in-admin'}>Районы</button>
          </Link>
        </div>
      </section>
  );
};

export default MainMenuAdmin;