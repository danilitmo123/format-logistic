import React from 'react';

import AdvantagesCard from "../AdvantagesCard";

import tick from '../../img/tick.svg'
import airplane from '../../img/airplane.svg'
import documents from '../../img/documents-icon.svg'
import wallet from '../../img/wallet-icon.svg'

import './AdvantagesPage.scss'


const AdvantagesPage = () => {
  return (
      <section className={'advantages-page'}>
        <div className={'advantages-block'}>
          <div className={'advantages-title'}>Нам доверяют более <span className={'hundred'}>100 000</span> клиентов</div>
          <div className={'advantages-group'}>
            <div className={'plus first'}>
              <img src={tick} alt={'tick'}/>
              <div className={'text'}>Быстро</div>
            </div>
            <div className={'plus second'}>
              <img src={tick} alt={'tick'}/>
              <div className={'text'}>Надежно</div>
            </div>
            <div className={'plus third'}>
              <img src={tick} alt={'tick'}/>
              <div className={'text'}>Выгодно</div>
            </div>
          </div>
        </div>
        <div className={'title'}>Почему нужно выбрать именно нас?</div>
        <div className={'advantages-wrapper'}>
          <AdvantagesCard
              number={'01'}
              icon={airplane}
              title={'Используем все виды транспорта'}
              text={'В зависимости от типа вашего груза и желаемых сроков доставки подберем для вас оптимальный вид транспорта.'}
          />
          <AdvantagesCard
              number={'02'}
              icon={documents}
              title={'Собираем пакет документов для таможенного оформления'}
              text={'Наши юристы подготавливают и заверяю все необходимые документы на товар. ' +
              'Благодаря этому мы всегда в сжатые сроки проходим таможню.'}
          />
          <AdvantagesCard
              number={'03'}
              icon={wallet}
              title={'Экономим ваши средства на складской логистике'}
              text={'Разместим ваш груз на нашем складе. Он круглосуточно охраняется. ' +
              'При необходимости вы в любой момент можете приехать и проверить свой товар.'}
          />
        </div>
      </section>
  );
};

export default AdvantagesPage;