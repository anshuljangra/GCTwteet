import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import NavigationBar from './components/nav';
import MapContainer from "./components/map";
// import App from './app';



ReactDOM.render(<MapContainer/>, document.getElementById('root'));
ReactDOM.render(<BrowserRouter><NavigationBar /></BrowserRouter>, document.getElementById('root'));

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
