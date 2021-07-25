import React from 'react';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

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
import {checkAuth} from "../../api/admin";
import {AuthStatus} from "../../constants/api";

const PrivateRoute = ({component: Component, ...rest}) => {
    let logged = checkAuth() === AuthStatus.AUTHENTICATED
    return (
        <Route {...rest} render={props => (
            logged ?
                <Component {...props} />
                : <Redirect to="/admin/auth" />
        )} />
    );
};


const AdminPage = () => {

    return (
        <Router>
            <SideBar/>
            <Switch>
                <PrivateRoute path={'/admin/hub-routes'} exact={true} component={AllHubsPage}/>
                <PrivateRoute path={'/admin/hub-routes/create'} component={CreateHubRoutePage} exact/>
                <PrivateRoute path={'/admin/hub-routes/edit/:id'} component={EditHubRoutePage}/>
                <PrivateRoute path={'/admin/zones/rates'} component={ExtraShouldersPage}/>
                <PrivateRoute path={'/admin/zones'} component={ZonePage}/>
                <PrivateRoute path={'/admin/orders'} component={AdminOrderPage}/>
                <PrivateRoute path={'/admin/services'} component={ServicesPage}/>
                <Route path={'/admin/auth'}>
                    <AuthPage/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AdminPage;