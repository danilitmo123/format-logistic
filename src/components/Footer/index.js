import React from 'react';
import logo from '../../img/logo.svg'

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
            <div className={'logo-main-text'}><span className={'format'}>Format</span> Logistic</div>
            <div className={'logo-subtitle'}>Перевозка грузов в Россию</div>
          </div>
        </div>
        <div className={'contacts'}>
          <div className={'number'}>+7 (499) 281-60-81</div>
          <div className={'mail'}>request@formatlogistic.ru</div>
        </div>
      </footer>
  );
};

export default Footer;