import React,{useState, useEffect} from 'react';

import {ADMIN_SERVER_URL} from "../../../constants/URL";

import axios from 'axios'

import AdminOrderItem from "./AdminOrderItem";

import loader from '../../../img/loader.svg'

import './OrdersPage.scss'

const AdminOrderPage = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const getOrders = () => {
    const ORDER_URL = `${ADMIN_SERVER_URL}admin-orders/`
    axios.get(ORDER_URL).then(res => setOrders([res.data]))
    setLoading(true)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <section className={'admin-order-page-wrapper'}>
      <div className={'admin-order-page-title'}>Страница заказов</div>
      {/*<div className={'find-order-wrapper'}>*/}
      {/*  <label htmlFor="">Найти заказ</label>*/}
      {/*  <input type="text" placeholder={'Уникальный номер'}/>*/}
      {/*</div>*/}
      <div className={'all-orders-wrapper'}>
        {
          orders[0] !== undefined ? orders[0].map(order => <AdminOrderItem order={order}/>) : <div className={'loader-wrapper'}><img src={loader} alt=""/><div>Загрузка...</div></div>
        }
      </div>
    </section>
  );
};

export default AdminOrderPage;