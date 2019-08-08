import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Login from './components/Login'
import Constants from './Constants'

function checkAuth(app, resp) {
    console.log("checkAuth");
    if (resp.data.result == 'ok') {
        return true;
    } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_INVALID) {
        //TODO notification
        toLogin();
        return false;
    } else if (resp.data.result == 'error' && resp.data.reason == Constants.ERROR_AUTH_EXPIRED) {
        //TODO notification
        toLogin(app);
        return false;
    }
}

function toLogin(app) {
    ReactDOM.render(<Login setAppState={app.setAppState} />, document.getElementById('root'));
}

export default {
    svcRequest: function (app, url, params, cbThen, cbFinally) {
        axios.post(url, params).then(function (resp) {
            console.log(resp);
            if (!checkAuth(app, resp)) {
                return;
            }

            cbThen(resp);
        }).catch(function (error) {
            console.log(error);
        }).then(cbFinally);
    }
}