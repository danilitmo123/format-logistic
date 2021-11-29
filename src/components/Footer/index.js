import React from 'react';
import logo from '../../img/logo.png'

import './Footer.scss'
import {Link} from "react-router-dom";

const Footer = () => {
  return (
      <footer className={'footer'}>
        <div className={'logo'}>
          <Link to={'/'}>
            <img src={logo} alt="logo" className={'logo-img'}/>
          </Link>
          <div className={'logo-text-block'}>
            <div className={'logo-main-text'}>FORMAT LOGISTIC</div>
            <div className={'logo-subtitle'}>Перевозка грузов в Россию</div>
          </div>
        </div>
        <div className={'contacts'}>
          <div className={'number'}>+7 (495) 109-33-08</div>
          <div className={'number'}>+7 (812) 209-25-70</div>
          <div className={'mail'}>request@formatlogistic.ru</div>
        </div>
      </footer>
  );
};

export default Footer;
