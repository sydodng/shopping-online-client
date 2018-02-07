import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Header from './components/Header';
import Footer from './components/Footer';

import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import ProductActions from './actions/ProductActions';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<AppContainer />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
registerServiceWorker();
ProductActions.fetchAllProduct();
