import React from 'react';

import {Link} from "react-router-dom";

import backgroundVideo from '../../img/background-video.mp4'

import './MainPage.scss'

const MainPage = () => {
  return (
      <section className={'main-page-wrapper'}>
        <div className={'group-background'}>
          <div className={'black'}></div>
          <video className={'background-video'}
                 src={backgroundVideo}
                 preload="auto"
                 autoPlay="true"
                 loop="true"
                 muted="muted"/>
        </div>
        <div className={'main-info-block'}>
          <div className={"main-title"}>МЫ CДЕЛАЕМ ВАШУ ГРУЗОПЕРЕВОЗКУ <span className={'simply'}>ПРОЩЕ</span></div>
          <div className={'main-subtitle'}>Помогаем за пару кликов заказать грузуперевозку из Европы, США или Дальнего Востока по лучшим тарифам</div>
          <Link to={'/order'}>
            <button className={'calculate-button'}>РАССЧИТАТЬ ПЕРЕВОЗКУ</button>
          </Link>
        </div>
        <form className={'registration-form'}>
          <div className={'form-title'}>Создайте аккаунт</div>
          <div className={'form-subtitle'}>Создайте учетную запись, чтобы пользоваться всеми услугами</div>
          <input placeholder={'Email'} type="email" className={'form-input'}/>
          <input placeholder={'Пароль'} type="password" className={'form-input'}/>
          <button type={"submit"} className={'create-account-btn'}>Создать аккаунт</button>
          <div className={'extra-text'}>Уже есть аккаунт? Войти</div>
        </form>
      </section>
  );
};

export default MainPage;