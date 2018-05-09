import React from 'react';

import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
import App from './App';

export default [
	{
		...App,
		routes: [
			{
				path: "/",
				...HomePage,
				exact: true
			},
			{
				path: "/users",
				...UsersListPage
			},
			{
				path: "/admins",
				...AdminsListPage
			},
			{
				...NotFoundPage
			}
		]
	}
];

// dont specify route to handle 404
