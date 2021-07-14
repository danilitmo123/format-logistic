import React, {useState} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import CreateHubRoutePage from "./hub-route/CreateHubRoutePage";
import AllHubsPage from "./hub-route/AllHubsPage";
import ExtraShouldersPage from "./ExtraShouldersPage";
import SideBar from "../SideBar";

import './AdminPage.scss'
import ZonePage from "./ZonePage";
import EditHubRoutePage from "./hub-route/EditHubRoutePage";

const AdminPage = () => {

    return (
        <Router>
            <SideBar/>
            <Switch>
                <Route path={'/admin/hub-routes'} exact={true}>
                    <AllHubsPage/>
                </Route>
                <Route path={'/admin/hub-routes/create'}>
                    <CreateHubRoutePage/>
                </Route>
                <Route path={'/admin/hub-routes/edit/:id'}>
                    <EditHubRoutePage/>
                </Route>
                <Route path={'/admin/zones/rates'}>
                    <ExtraShouldersPage/>
                </Route>
                <Route path={'/admin/zones'}>
                    <ZonePage/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AdminPage;