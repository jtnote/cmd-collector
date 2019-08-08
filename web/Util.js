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

    loadPage: (p, token, cbLoadPage) => {
        // var me = this;
        // alert('in App reloadPage:'+p);
        axios.post('/cmdnotes/api/notes_paging', {
            token: token,
            page: p
        }).then(function (resp) {
            var page = Number(resp.data.currentPage);
            var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);
            console.log('[loadPage]');
            console.log(resp);

            //cache
            // globalStates.notes = resp.data.notes;
            // globalStates.currentPage = page;
            // globalStates.total = total;

            //   this.store.dispatch(loadPage(resp.data.notes, page, totoal))
            cbLoadPage(resp.data.notes, page, total)

            //   me.noteList.current.changePage(page, total, resp.data.notes);

            // ReactDOM.render(<App notes={resp.data.notes} currentPage={resp.data.currentPage}/>, document.getElementById('root'));

        }).catch(function (error) {
            console.log(error);
        }).then(function () {
        });
    }
}