import React, {useState} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import OrderPage from "./components/OrderPage";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage";

import './App.css'
import Footer from "./components/Footer";

const App = () => {

  const [firstActivePage, setFirstActivePage] = useState(true)

  return (
      <Router>
        <div className={'App'}>
          <Header setActive={setFirstActivePage}/>
          <Switch>
            <Route exact={true} path={'/'}>
              <OrderPage setFirstPageActive={setFirstActivePage} firstActivePage={firstActivePage}/>
            </Route>
            <Route path={'/admin'}>
              <AdminPage/>
            </Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
};

export default App;