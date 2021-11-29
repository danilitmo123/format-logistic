import React from 'react';

import {Link} from "react-router-dom";

import logo from '../../img/logo.png'

import './Header.scss'

const Header = ({setActive}) => {

  const firstActivePageHandler = () => {
    setActive(true)
  }

  return (
      <header className={'header'}>
        <div className={'logo'} onClick={firstActivePageHandler}>
         <Link to={'/'}>
           <img src={logo} alt="logo" className={'logo-img'}/>
         </Link>
          <div className={'logo-text-block'}>
            <div className={'logo-main-text'}>FORMAT LOGISTIC</div>
            <div className={'logo-subtitle'}>Перевозка грузов в Россию</div>
          </div>
        </div>
        <div className={'contacts'}>
          {
            process.env.REACT_APP_ENV !== 'production' ?
            <Link to={'/admin/hub-routes'}>
                <button className={'admin-button'}>Админка</button>
            </Link> : ""
        }
          <div className={'number'}>+7 (495) 109-33-08</div>
          <div className={'number'}>+7 (812) 209-25-70</div>
          <div className={'mail'}>request@formatlogistic.ru</div>
        </div>
      </header>
  );
};

export default Header;
