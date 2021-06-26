import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import MainMenuAdmin from "./MainMenuAdmin";
import AddHubsPage from "./AddHubsPage";
import AllHubsPage from "./AllHubsPage";

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
         <Route path={'/admin/hubs/create'}>
           <AddHubsPage/>
         </Route>
       </Switch>
     </Router>
  );
};

export default AdminPage;