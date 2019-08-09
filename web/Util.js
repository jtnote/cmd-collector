import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Login from './components/Login'
import Constants from './Constants'
import { changeView, loadPage } from './actions/Index'


// function toLogin(app) {
//     ReactDOM.render(<Login setAppState={app.setAppState} />, document.getElementById('root'));
// }

export default {
    checkAuth: (resp) => {
        console.log("checkAuth");
        if (resp.data.result == 'ok') {
            return true;
        } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_INVALID) {
            //TODO notification
            cbLoginRedirect();
            return false;
        } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_EXPIRED) {
            //TODO notification
            // this.store.dispatch(changeView(Constants.VIEW_LOGIN))
            cbLoginRedirect();
            return false;
        }
    },

    svcRequest: (url, params, cbLoginRedirect, cbThen, cbFinally) => {
        axios.post(url, params).then(function (resp) {
            console.log(resp);
            if (!checkAuth(resp, cbLoginRedirect)) {
                return;
            }
            cbThen(resp);
        }).catch(function (error) {
            console.log(error);
        }).then(cbFinally);
    },

    /*
    cbLoadPage(notes, total, currentPage, totalPages)
    */
    loadPage: (p, token, cbLoadPage) => {
        axios.post('/cmdnotes/api/notes_paging', {
            token: token,
            page: p
        }).then(function (resp) {
            var total = Number(resp.data.total);
            var currentPage = Number(resp.data.currentPage);
            var totalPages = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);
            // console.log('[loadPage]');
            // console.log(resp);
            cbLoadPage(resp.data.notes, total, currentPage, totalPages);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
        });
    }
}