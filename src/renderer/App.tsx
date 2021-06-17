import React from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import routes from './router';

const App: React.FC = () => (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/discovery" />
        {renderRoutes(routes)}
      </Switch>
    </Router>
);

export default App;
