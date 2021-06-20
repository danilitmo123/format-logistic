import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import OrderPage from "./components/OrderPage";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage";

import './App.css'

const App = () => {
  return (
      <Router>
        <div className={'App'}>
          <Header/>
          <Switch>
            <Route exact={true} path={'/'}>
              <OrderPage/>
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