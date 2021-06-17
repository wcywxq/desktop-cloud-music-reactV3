import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const RouterView: React.FC<RouteConfigComponentProps> = (props) => {
	const { route } = props;

	return (
    <Router>
      <Switch>{renderRoutes(route?.routes)}</Switch>
    </Router>
	);
};

export default RouterView;
