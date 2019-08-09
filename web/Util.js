import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Login from './components/Login';
import Constants from './Constants';
import { changeView as _changeView, loadPage as _loadPage } from './actions/Index';
import Store from './store/Store';

function checkAuth(resp) {
    console.log("checkAuth");
    if (resp.data.result == 'ok') {
        return true;
    } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_INVALID) {
        //TODO notification
        // cbLoginRedirect();
        return false;
    } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_EXPIRED) {
        //TODO notification
        // this.store.dispatch(changeView(Constants.VIEW_LOGIN))
        // cbLoginRedirect();
        return false;
    }
}

// function svcRequest(url, params, cbLoginRedirect, cbThen, cbFinally) {
//     axios.post(url, params).then(function (resp) {
//         console.log(resp);
//         if (!checkAuth(resp, cbLoginRedirect)) {
//             return;
//         }
//         cbThen(resp);
//     }).catch(function (error) {
//         console.log(error);
//     }).then(cbFinally);
// }

/*
cbLoadPage(notes, total, currentPage, totalPages)
*/
function loadPage(p, token, cbLoadPage) {
    console.log('[Util][loadPage]');
    console.log(Store);
    axios.post('/cmdnotes/api/notes_paging', {
        token: token,
        page: p
    }).then(function (resp) {
        if (!checkAuth(resp)) {
            Store.dispatch(_changeView(Constants.VIEW_LOGIN));
            return;
        }

        var total = Number(resp.data.total);
        var currentPage = Number(resp.data.currentPage);
        var totalPages = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

        Store.dispatch(_loadPage(resp.data.notes, total, currentPage, totalPages));

        cbLoadPage(resp.data.notes, total, currentPage, totalPages);
    }).catch(function (error) {
        console.log(error);
    }).then(function () {
    });
}

export default { checkAuth, loadPage };