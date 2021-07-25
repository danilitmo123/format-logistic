import React from 'react';

import {Link} from 'react-router-dom'

import './MainMenuAdmin.scss'

const MainMenuAdmin = () => {

  return (
      <section className={'admin-page-wrapper'}>
        <div className={'admin-buttons-wrapper'}>
          <Link to={'/admin/hubs'}>
            <button className={'button-in-admin'}>Хабовые плечи</button>
          </Link>
          <Link to={'/admin/routes'}>
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