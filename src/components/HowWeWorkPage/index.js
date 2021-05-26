import React from 'react';

import {Link} from "react-router-dom";

import boy from '../../img/how-we-work-boy.png'

import './HowWeWorkPage.scss'

const Circle = ({number}) => {
  return (
      <div className={'circle'}>{number}</div>
  )
}

const HowWeWorkPage = () => {
  return (
      <section className={'how-we-work-wrapper'}>
       <div className={'description-block'}>
         <div className={'overtitle'}>Схема работы</div>
         <div className={'how-we-work-title'}>Работаем быстро, четко и на результат</div>
         <img src={boy} alt={'boy'} className={'how-we-work-image'}/>
       </div>
       <div className={'roadmap-wrapper'}>
         <ol className={'circle-container'}>
           <li><Circle number={'1'}/> <span>Внесите параметры груза и маршрут</span></li>
           <li><Circle number={'2'}/> <span>Мы рассчитаем и выдадим наилучшие варианты перевозки</span></li>
           <li><Circle number={'3'}/> <span>Изучите и выберите путь перевозки</span></li>
           <li><Circle number={'4'}/> <span>Подтвердите заказ</span></li>
           <li><Circle number={'5'}/> <span>Отслеживайте свой груз в личном кабинете</span></li>
         </ol>
         <Link to={'/order'}>
           <button className={'how-we-work-button'}>РАССЧИТАТЬ ПЕРЕВОЗКУ</button>
         </Link>
       </div>
      </section>
  );
};

export default HowWeWorkPage;