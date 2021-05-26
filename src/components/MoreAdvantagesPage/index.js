import React from 'react';

import rectangle from '../../img/rectangle.svg'

import './MoreAdvantages.scss'

const MoreAdvantages = () => {
  return (
      <section className={'more-advantages-wrapper'}>
        <div className={'more-advantages-text'}>
          <div className={'more-advantages-overtitle'}>Больше плюсов</div>
          <div className={'more-advantages-title'}>Экономим ваше время, пока вы занимаетесь другими делами</div>
        </div>
        <div className={'more-advantages-group'}>
         <div className={'first-advantage'}>
           <div className="square">
             <div className={'square-text'}>
               Доставка из Европы занимает от 5 дней.
               Из Азии и США - от 10 дней.
               Подберем маршрут и транспорт, чтобы вы получили груз ещё быстрее.
             </div>
           </div>
           <div className={'second-square'}>
             <img src={rectangle} alt="" className={'border-square'}/>
             <div className={'description'}>Быстро</div>
           </div>
         </div>
          <div className={'second-advantage'}>
            <div className={'second-square'}>
              <img src={rectangle} alt="" className={'border-square'}/>
              <div className={'description'}>Выгодно</div>
            </div>
            <div className="square">
              <div className={'square-text'}>
                Мы доставим любой груз от 30 кг,
                в том числе хрупкий и опасный по цене, на 20% дешевле рынка.
              </div>
            </div>
          </div>
          <div className={'third-advantage'}>
            <div className="square">
              <div className={'square-text'}>
                Страхуем все грузы в СК "Спасские ворота".
                Для каждого груза подбирается свой контейнер и опечатывается.
              </div>
            </div>
            <div className={'second-square'}>
              <img src={rectangle} alt="" className={'border-square'}/>
              <div className={'description'}>Надежно</div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default MoreAdvantages;