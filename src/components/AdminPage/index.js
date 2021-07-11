import React,{useState} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import AddHubsPage from "./AddHubsPage";
import AllHubsPage from "./AllHubsPage";
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
                 hubId={hubId}
                 setId={setHubId}
                 setEditing={setIsEditingHub}
                 allHubsInfo={allHubsInfo}
                 setAllHubs={setAllHubsInfo}/>
         </Route>
         <Route path={!isEditingHub ? '/admin/create-hub' : '/admin/edit-hub'}>
           <AddHubsPage isEditing={isEditingHub} hubId={hubId}/>
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