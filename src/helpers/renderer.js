import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import Routes from '../client/Routes';

export default (req, store, context) => {

  // context prop and the data passed to it gives us the ability to communicate from our rendered components back here  
  // and we'll using the context to detect not found pages and send 404 status to the browser
  // context is passed as prop to the components and can be accessed as staticContext(staticRouter renames it when passing) and is not present on BrowserRouter
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // using serialize to prevent XSS attacks
  const html = `
  	<html>
  		<head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
      </head>
  		<body>
  			<div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
  			<script src="bundle.js"></script>
  		</body>
  	</html>
  `;

  return html;
}
