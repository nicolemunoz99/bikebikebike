import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import BikeList from './BikeList.jsx';
import StravaAuth from './StravaAuth.jsx';
import PartList from './PartList.jsx';

import ModalIndex from './modals/Index.jsx'


const App = () => {
  const modal = useSelector(state => state.modal);

  useEffect(() => {
  }, [modal])

return (
  <div>
    <Router>
      <Switch >
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/stravaAuth" component={StravaAuth} />
        <Route exact path="/bikes" component={BikeList} />
        <Route exact path="/bikes/:bikeId" component={PartList} />
      </Switch>
    </Router>

    { modal ?
      <ModalIndex />
      :
      null
    }

  </div>
)
};

export default App;