import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import BikeList from './BikeList/Index.jsx';
import StravaAuth from './StravaAuth.jsx';
import NavBar from './NavBar.jsx';
import PartList from './PartList/Index.jsx';
import ProtectedRoute from './wrappers/ProtectedRoute.jsx'
import ModalIndex from './modals/Index.jsx'


const App = () => {
  const { modal } = useSelector(state => state.appControls);

return (
  <div>
    <Router>
      <NavBar />
      <Switch >
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" key={'login'} component={Login} />     
        <Route exact path="/signup" key={'signup'} component={Login} />   
        <ProtectedRoute exact path="/stravaAuth" render={StravaAuth} />
        <ProtectedRoute exact path="/bikes" render={BikeList} />
        <ProtectedRoute exact path="/bikes/:bikeId" key='part' render={PartList} />
        {/* <Route exact path="/bikes/:bikeId" component={PartList} />  */}
        <Route component={Landing} />
      </Switch>
    </Router>

    { modal && <ModalIndex /> }

  </div>
)
};

export default App;