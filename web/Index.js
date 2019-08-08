import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import App from './App';
import Constants from './Constants';
import Util from './Util';

import axios from 'axios';

// ReactDOM.render(<Login />, document.getElementById('root'));




// Util.svcRequest('/cmdnotes/api/notes_paging', {
//     page: 1
// }, function (resp) {
//     console.log(resp);
//     var page = Number(resp.data.currentPage);
//     var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

//     ReactDOM.render(<App notes={resp.data.notes} totalPages={total} currentPage={page} />, document.getElementById('root'));
// }, function () {
// });

ReactDOM.render(<App />, document.getElementById('root'));