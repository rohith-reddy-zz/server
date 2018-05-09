import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

app.use(
	'/api',
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts){
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	})
);

app.use(express.static('public'));

app.get('*', (req, res) => {

  const store = createStore(req);

  // Returns an array of objects(components) that match with req.path.
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
  	return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    if(promise){
      // 'if' to avoid null values as all components matched need not necessarily contain loadData.
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve); // always going to resolve outer promise.
      });
    }
  });
  // used a second map instead of wrapping route.loadData(store) in a promise to avoid uglier syntax and better understanding
  // Pass a funtion when creating a promise which is called with two functions(resolve and reject) after a new promise created.
  // by wrapping each promise in a seperate individual promise, we fix the issue of promise.all .catch
  // where the outer promise is resolved even if the inner resolve is resolved or rejected.


  // Promis.all - If all the promises are successfully resolved,
  // .then is called as callback and .catch is called as callback if there's any error with resolving all promises.
  // .catch - it is called instantly when an error occurs (rejected promise etc)
  //  even if there are promises left to resolve or going to resolve successfully.
  Promise.all(promises).then(() => {
    const context = {}; // creating context here and passing it to renderer to track its changes for res object.
    const content = renderer(req, store, context);

		if(context.url) {
			return res.redirect(301, context.url);
		}
    if(context.notFound === true) {
			res.status(404);
		}

  	res.send(content);
  });

});

app.listen(3000, (req, res) => {
  console.log('Listening on port 3000');
});
