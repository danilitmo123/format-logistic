import React,{useState} from 'react';

import './AdminOrderItem.scss'

import air from '../../../../img/black-airplane-icon.svg'
import truck from '../../../../img/black-truck-icon.svg'

const AdminOrderItem = ({order}) => {

  console.log(order)

  const [showFullOrder, setShowFullOrder] = useState(false)

  const showFullOrderHandler = () => {
    setShowFullOrder(!showFullOrder)
  }

  return (
    <>
      {
        showFullOrder ?
          <div className={'order-item-wrapper'}>
            <div className={'agent-info-wrapper'}>
              <div className={'agent-title'}>Информация о клиенте</div>
              <div className={'agent-block-wrapper'}>
                <div className={'info-block'}>
                  <div className={'block-title'}>Адрес:</div>
                  <div>{order.agent.address}</div>
                </div>
                <div className={'info-block'}>
                  <div className={'block-title'}>Название компании:</div>
                  <div>{order.agent.company_name}</div>
                </div>
                <div className={'info-block'}>
                  <div className={'block-title'}>Контактное лицо:</div>
                  <div>{order.agent.contact_person}</div>
                </div>
                <div className={'info-block'}>
                  <div className={'block-title'}>Email:</div>
                  <div>{order.agent.email}</div>
                </div>
                <div className={'info-block'}>
                  <div className={'block-title'}>Номер телефона:</div>
                  <div>{order.agent.phone}</div>
                </div>
              </div>
            </div>
            <div>
              <div className={'cargo-title'}>Информация о грузе</div>
              <div className={'cargo-info-wrapper'}>
                {
                  order.good.boxes.map(item => {
                    return (
                      <div className={'cargo-wrapper'} key={item.id}>
                        <div className={'cargo-block'}>
                          <div className={'cargo-title-block'}>Тип:</div>
                          <div>{item.type === 'BOX' ? 'Коробка' : 'Паллета'}</div>
                        </div>
                        <div className={'cargo-block'}>
                          <div className={'cargo-title-block'}>Размер:</div>
                          <div>{item.length} x {item.width} x {item.height}</div>
                        </div>
                        <div className={'cargo-block'}>
                          <div className={'cargo-title-block'}>Количество:</div>
                          <div>{item.amount}</div>
                        </div>
                        <div className={'cargo-block'}>
                          <div className={'cargo-title-block'}>Вес:</div>
                          <div>{item.mass}</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={'all-weight-info'}>Общая информация: {order.good.total_ldm} LDM {order.good.total_mass} КГ {order.good.total_volume / 1000000} м³</div>
            </div>
            <div className={'delivery-cargo-wrapper'}>
              <div className={'delivery-title'}>Информация о маршруте</div>
              <div className={'delivery-block-wrapper'}>
                {
                  order.path.routes.map(item => {
                    return (
                      <div className={'route-wrapper'}>
                        <div className={'source-title'}>{item.source.name}</div>
                        <div className={'cargo-img'}>{item.type === 'AIR' ? <img src={air} alt="air"/> : <img src={truck} alt="truck"/>}</div>
                        <div>{item.destination.name}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={'all-cargo-info'}>Общая информация: {order.path.total_cost} € {(order.path.total_distance / 1000).toFixed(0)} км {order.path.total_duration.min}-{order.path.total_duration.max} дней</div>
            </div>
            <div className={'customs'}>Таможенное офоромление: {order.customs ? 'Да' : 'Нет'}</div>
            <button onClick={showFullOrderHandler} className={'close-button'}>Свернуть</button>
          </div>
          :
          <div onClick={showFullOrderHandler} className={'short-order-info'}>
            <div className={'all-short-info'}>
              <div className={'agent-title'}>Информация о клиенте</div>
              <div className={'short-client-info'}>
                <div className={'company'}><div className={'bold'}>Компания:</div>  {order.agent.company_name}</div>
                <div className={'person'}><div className={'bold'}>Контактное лицо:</div> {order.agent.contact_person}</div>
                <div className={'phone'}><div className={'bold'}>Телефон:</div> {order.agent.phone}</div>
              </div>
            </div>
            <div className={'delivery-short-wrapper'}>
              <div className={'delivery-title'}>Информация о маршруте</div>
              <div className={'delivery-block-wrapper'}>
                {
                  order.path.routes.map(item => {
                    return (
                      <div className={'route-wrapper'}>
                        <div className={'source-title'}>{item.source.name}</div>
                        <div className={'cargo-img'}>{item.type === 'AIR' ? <img src={air} alt="air"/> : <img src={truck} alt="truck"/>}</div>
                        <div>{item.destination.name}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className={'all-cargo-info'}>Общая информация: {order.path.total_cost} € {(order.path.total_distance / 1000).toFixed(0)} км {order.path.total_duration.min}-{order.path.total_duration.max} дней</div>
            </div>
          </div>
      }
    </>
  );
};

export default AdminOrderItem;