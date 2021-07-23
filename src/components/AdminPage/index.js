import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import CreateHubRoutePage from "./hub-route/CreateHubRoutePage";
import AllHubsPage from "./hub-route/AllHubsPage";
import ExtraShouldersPage from "./ExtraShouldersPage";
import SideBar from "../SideBar";
import ZonePage from "./ZonePage";
import EditHubRoutePage from "./hub-route/EditHubRoutePage";
import AdminOrderPage from "./AdminOrdersPage";
import ServicesPage from "./ServicesPage";
import AuthPage from "../AuthPage";

import './AdminPage.scss'

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
                <Route path={'/admin/orders'}>
                    <AdminOrderPage/>
                </Route>
                <Route path={'/admin/services'}>
                    <ServicesPage/>
                </Route>
                <Route path={'/admin/auth'}>
                    <AuthPage/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AdminPage;