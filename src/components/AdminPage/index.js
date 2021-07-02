import React,{useState} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import MainMenuAdmin from "./MainMenuAdmin";
import AddHubsPage from "./AddHubsPage";
import AllHubsPage from "./AllHubsPage";

import './AdminPage.scss'

const AdminPage = () => {

  const [isEditingHub, setIsEditingHub] = useState(false)
  const [allHubsInfo, setAllHubsInfo] = useState([])
  const [hubId, setHubId] = useState('')

  return (
     <Router>
       <Switch>
         <Route path={'/admin'} exact={true}>
           <MainMenuAdmin/>
         </Route>
         <Route path={'/admin/hubs'}>
           <AllHubsPage
               setId={setHubId}
               setEditing={setIsEditingHub}
               allHubsInfo={allHubsInfo}
               setAllHubs={setAllHubsInfo}/>
         </Route>
         <Route path={!isEditingHub ? '/admin/create-hub' : '/admin/edit-hub'}>
           <AddHubsPage isEditing={isEditingHub} hubId={hubId}/>
         </Route>
       </Switch>
     </Router>
  );
};

export default AdminPage;