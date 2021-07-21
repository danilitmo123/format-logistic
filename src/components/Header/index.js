import React,{useState} from 'react';

import {Link} from "react-router-dom";

import userIcon from '../../img/user-icon.svg'
import logo from '../../img/logo.svg'

import './header.scss'

const Header = ({firstActivePage, setActive}) => {

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
            <div className={'logo-main-text'}><span className={'format'}>Format</span> Logistic</div>
            <div className={'logo-subtitle'}>Перевозка грузов в Россию</div>
          </div>
        </div>
        <div className={'contacts'}>
          <Link to={'/admin/hub-routes'}>
            <button className={'admin-button'}>Админка</button>
          </Link>
          <div className={'number'}>+7 (499) 281-60-81</div>
          <div className={'mail'}>customfreight2020@gmail.com</div>
        </div>
      </header>
  );
};

export default Header;