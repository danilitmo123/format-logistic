import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import InfoPage from "./components/InfoPage";
import OrderPage from "./components/OrderPage";
import Header from "./components/Header";
import Footer from './components/Footer'

import './App.css'

const App = () => {
  return (
      <Router>
        <div className={'App'}>
          <Header/>
          <Switch>
            <Route exact={true} path={'/'}>
              <InfoPage/>
            </Route>
            <Route path={'/order'}>
              <OrderPage/>
            </Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
};

export default App;