import React from 'react';
import ReactDOM from 'react-dom';

import Edit from './components/Edit';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import App from './App';

import axios from 'axios';
import Constants from './Constants';


ReactDOM.render(<Register />, document.getElementById('root'));

// function initIndex() {
//   axios.get('/cmdnotes/api/notes_paging', {
//     params: {
//       page: 1
//     }
//   }).then(function (resp) {
//     console.log(resp);
//     var page = Number(resp.data.currentPage);
//     var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

//     // console.log(response);
//     // ReactDOM.render(<App notes={resp.data.notes} totalPages={total} currentPage={page} />, document.getElementById('root'));
    
//   }).catch(function (error) {
//     console.log(error);
//   }).then(function () {
//     // always executed
//   });
// }

// initIndex();