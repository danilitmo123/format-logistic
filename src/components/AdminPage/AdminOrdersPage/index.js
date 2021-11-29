import React,{useState, useEffect} from 'react';

import axios from 'axios'
import {ADMIN_SERVER_URL} from "../../../constants/URL";

import AdminOrderItem from "./AdminOrderItem";
import Loader from "../../Common/Loader";

import loader from '../../../img/loader.svg'

import './OrdersPage.scss'
import {adminInstance} from "../../../api/admin";

const AdminOrderPage = () => {

  const [orders, setOrders] = useState([])

  const getOrders = () => {
    const ORDER_URL = `${ADMIN_SERVER_URL}admin-orders/`
    adminInstance.get(ORDER_URL).then(res => setOrders([res.data]))
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
          orders[0] !== undefined ? orders[0].map(order => <AdminOrderItem order={order}/>) : <Loader/>
        }

      </div>
    </section>
  );
};

export default AdminOrderPage;
