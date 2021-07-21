import React,{useState} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import OrderPage from "./components/OrderPage";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage";

import './App.css'

const App = () => {

  const [admin, setAdmin] = useState(false)
  const [firstActivePage, setFirstActivePage] = useState(true)

  return (
      <Router>
        <div className={'App'}>
          <Header isAdmin={admin} setAdmin={setAdmin} firstActivePage={firstActivePage} setActive={setFirstActivePage}/>
          <Switch>
            <Route exact={true} path={'/'} >
              <OrderPage firstActivePage={firstActivePage} setActive={setFirstActivePage}/>
            </Route>
            <Route path={'/admin'}>
              <AdminPage/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
};

export default App;