import React,{useState, useEffect} from 'react';

import {ADMIN_SERVER_URL} from "../../../constants/URL";

import axios from 'axios'

import AdminOrderItem from "./AdminOrderItem";

import './OrdersPage.scss'

const AdminOrderPage = () => {

  const [orders, setOrders] = useState([])

  const getOrders = () => {
    const ORDER_URL = `${ADMIN_SERVER_URL}admin-orders/`
    axios.get(ORDER_URL).then(res => setOrders([res.data]))
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <section className={'admin-order-page-wrapper'}>
      <div className={'admin-order-page-title'}>Страница заказов</div>
      <div className={'find-order-wrapper'}>
        <label htmlFor="">Найти заказ</label>
        <input type="text" placeholder={'Уникальный номер'}/>
      </div>
      <div>
        {
          orders[0] !== undefined ? orders[0].map(order => <AdminOrderItem order={order}/>) : ''
        }
      </div>
    </section>
  );
};

export default AdminOrderPage;