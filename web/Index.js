import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Edit from './components/Edit';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import Constants from './Constants';
import Util from './Util';
import App from './App';
import Store from './store/Store';

import axios from 'axios';

ReactDOM.render(<Provider store={Store}>
    <App />
</Provider>, document.getElementById('root'));