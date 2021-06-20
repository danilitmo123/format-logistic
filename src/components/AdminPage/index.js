import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import MainMenuAdmin from "./MainMenuAdmin";
import AddHubsPage from "./AddHubsPage";

import './AdminPage.scss'


const AdminPage = () => {
  return (
     <Router>
       <Switch>
         <Route path={'/admin'} exact={true}>
           <MainMenuAdmin/>
         </Route>
         <Route path={'/admin/hubs'}>
           <AddHubsPage/>
         </Route>
       </Switch>
     </Router>
  );
};

export default AdminPage;