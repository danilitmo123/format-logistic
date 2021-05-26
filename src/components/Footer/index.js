import React from 'react';

import logo from '../../img/logo.svg'
import link from '../../img/link-icon.svg'
import mail from '../../img/mail-icon.svg'

import './Footer.scss'

const Footer = () => {
  return (
      <footer className={'footer'}>
        <div className={'footer-line'}></div>
        <div className={'footer-info-block'}>
          <div className={'logo'}>
            <img src={logo} alt=""/>
           <div className={'description'}>
             <div className={'logo-subtitle'}><span className={'format'}>Format</span> Logistic</div>
             <div className={'subtitle'}>Перевозка грузов в Россию</div>
           </div>
          </div>
          <div className={'link-block'}>
            <img src={link} alt=""/>
            <div className={'link-block-text'}>fastcustoms.ru</div>
          </div>
          <div className={'mail-block'}>
            <img src={mail} alt=""/>
            <div className={'mail-block-text'}>customfreight2020@gmail.com</div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;