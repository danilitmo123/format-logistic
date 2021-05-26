import React from 'react';

import background from '../../img/third-block-background.png'

import './DeliveryPage.scss'

const DeliveryPage = () => {
  return (
      <section className={'delivery-page-wrapper'}>
        <div className={'background-image'}>
          <img src={background} alt="background" className={'background'}/>
          <div className={'dark-block'}></div>
        </div>
       <div className={'delivery-info-block'}>
         <div className={'delivery-title'}>Быстро доставим ваш груз вне зависимости
           от габаритов и характеристик</div>
         <div className={'delivery-text'}>Грузовые авто и корабли прибывают в Россию еженедельно. <br/>
           Самолеты - ежедневно. <br/>
           Консолидация вашего груза на наших складах в Европе и Азии ускоряет процесс доставки.
         </div>
         <div className={'line'}></div>
         <div className={'delivery-subtitle'}>
           При регулярном сотрудничестве
           мы дадим вам персональную скидку, <br/>
           которая будет расти вместо с весом груза.
         </div>
       </div>
      </section>
  );
};

export default DeliveryPage;