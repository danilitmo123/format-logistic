import React, {useState} from 'react';

import './OrderPage.scss'

const OrderPage = () => {

  const [activeContainerButton, setActiveContainerButton] = useState(false)
  const [activeBoxButton, setActiveBoxButton] = useState(true)

  const Circle = ({number}) => {
    return (
        <div className={'order-circle'}>{number}</div>
    )
  }

  const ActiveBoxButtonHandler = () => {
    setActiveBoxButton(!activeBoxButton)
    setActiveContainerButton(false)
  }

  const ActiveContainerButtonHandler = () => {
    setActiveContainerButton(!activeContainerButton)
    setActiveBoxButton(false)
  }

  return (
      <section className={'order-page-wrapper'}>
        <div className={'order-title'}>Рассчитать перевозку</div>
        <div className={'roadmap-order-wrapper'}>
          <ol className={'order-circle-container'}>
            <li><Circle number={'1'}/></li>
            <li><Circle number={'2'}/></li>
            <li><Circle number={'3'}/></li>
          </ol>
        </div>
        <div className={'form-wrapper'}>
          <div className={'cargo-wrapper'}>
            <div className={'cargo-title'}>Груз</div>
            <div className={'cargo-choice'}>
              <div className={activeBoxButton ? 'active-box-button' : 'box'}
                   onClick={ActiveBoxButtonHandler}>Коробки/Паллеты</div>
              <div className={activeContainerButton ? 'active-container-button' : 'container'}
                   onClick={ActiveContainerButtonHandler}>Контейнеры</div>
            </div>
            <div className={'cargo-input-wrapper'}>
              <div className={'typeof-cargo'}>
                <label htmlFor={'typeof-cargo'}>Тип груза</label>
                <select name='Тип Груза' id={'typeof-cargo'}>
                  <option>Коробки</option>
                  <option>Паллеты</option>
                </select>
              </div>
              <div className={'typeof-cargo'}>
                <label htmlFor={'typeof-cargo'}>Количество(шт)</label>
                <input
                    type="number"
                    id={'typeof-cargo'}
                    min={1}
                    step={1}
                    placeholder={'1'}/>
              </div>
              <div className={'sizeof-cargo'}>
                <label htmlFor={'sizeof-cargo'}>Габариты</label>
                <input
                    type="number"
                    id={'sizeof-cargo'}
                    min={1}
                    step={1}
                    placeholder={'Длина'}/>
                <input
                    type="number"
                    id={'sizeof-cargo'}
                    min={1}
                    step={1}
                    placeholder={'Ширина'}/>
                <input
                    type="number"
                    id={'sizeof-cargo'}
                    min={1}
                    step={1}
                    placeholder={'Высота'}/>
              </div>
              <div className={'typeof-cargo'}>
                <label htmlFor={'weight-cargo'}>Вес</label>
                <input
                    type="number"
                    id={'weight-cargo'}
                    min={1}
                    step={1}
                    placeholder={'кг'}/>
              </div>
              <button className={'add-cargo-btn'}>+ Добавить</button>
            </div>
          </div>
        </div>
      </section>
  );
};

export default OrderPage;