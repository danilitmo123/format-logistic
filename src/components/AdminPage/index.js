import React,{useState} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import CreateHubRoutePage from "./hub-route/CreateHubRoutePage";
import AllHubsPage from "./hub-route/AllHubsPage";
import ExtraShouldersPage from "./ExtraShouldersPage";
import SideBar from "../SideBar";

import './AdminPage.scss'
import ZonePage from "./ZonePage";

const AdminPage = () => {

  const [isEditingHub, setIsEditingHub] = useState(false)
  const [allHubsInfo, setAllHubsInfo] = useState([])
  const [hubId, setHubId] = useState('')

  return (
     <Router>
         <SideBar/>
       <Switch>
         <Route path={'/admin/hubs'} exact={true}>
             <AllHubsPage
                 setId={setHubId}
                 setEditing={setIsEditingHub}
                 allHubsInfo={allHubsInfo}
                 setAllHubs={setAllHubsInfo}/>
         </Route>
         <Route path={!isEditingHub ? '/admin/create-hub' : '/admin/edit-hub'}>
           <CreateHubRoutePage isEditing={isEditingHub} hubId={hubId}/>
         </Route>
         <Route path={'/admin/routes'}>
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