import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';

ReactDOM.hydrate(<Home />, document.querySelector('#root'));

// For react v17 use ReactDom.hydrate(<Home />, document.querySelector('#root')) and hydration is the term used for the process
// of putting functionality back into the html that is already rendered
