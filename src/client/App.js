import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

const App = ({ route }) => {
	//route is passed to the app and contains routes as prop
	return( 
		<div>
			<Header />
			{renderRoutes(route.routes)}
		</div>
	);
}

export default {
	component: App,
	loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}

// Note: there's no return in loadData as an arrow function with no curly braces has an implicit return to it