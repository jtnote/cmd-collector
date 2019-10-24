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
import { refreshToken as _refreshToken, changeView as _changeView, loadPage as _loadPage } from './actions/Index';

import axios from 'axios';

import './resources/css/bulmaCustomized.scss';

// Check for token and update application state if required
var token = localStorage.getItem('token');
var currentPage = localStorage.getItem('currentPage');
if (token) {
    // store.dispatch({ type: AUTHENTICATE_THE_USER });
    axios.post('/cmdnotes/api/notes_paging', {
        token: token,
        page: currentPage
    }).then(function (resp) {
        //TODO refactor api to avoid conversion
        var total = Number(resp.data.total);
        var currentPage = Number(resp.data.currentPage);
        var totalPages = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

        Store.dispatch(_loadPage(resp.data.notes, total, currentPage, totalPages));
        Store.dispatch(_refreshToken(token));
        Store.dispatch(_changeView(Constants.VIEW_LIST));
    });
}


ReactDOM.render(<Provider store={Store}>
    <App />
</Provider>, document.getElementById('root'));