import React from 'react';
import ReactDOM from 'react-dom';
// import globalStates from '../GlobalStates';
import axios from 'axios'
import Constants from '../Constants'
import Util from '../Util';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target);
        var me = this;

        axios.post('/cmdnotes/api/login', {
            username: this.state.username,
            password: this.state.password
        }).then(function (resp) {
            // console.log(resp);
            if (resp.data.result == 'ok') {
                // globalStates.token = resp.data.token;
                // console.log(me.props.loginSuccess);
                me.props.loginSuccess(resp.data.token);
                // return;

                Util.loadPage(1, resp.data.token, function (notes, page, total) {
                    console.log('[Login]before loadpage, total='+total);
                    me.props.loadPage(notes, page, total);

                    me.props.changeView(Constants.VIEW_LIST);
                })

                

                // axios.post('/cmdnotes/api/notes_paging', {
                //     token: me.props.token,
                //     page: 1
                // }).then(function (resp) {
                //     console.log(resp);
                //     var page = Number(resp.data.currentPage);
                //     var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);

                //     me.props.loadPage(resp.data.notes, page, total);
                //     me.props.changeView(Constants.VIEW_LIST);
                // }).catch(function (error) {
                //     console.log(error);
                // }).then(function () {
                // });
            } else {
                alert('login failed');
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" name="username" onChange={this.handleUsernameChange} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped">
                    <p className="control">
                        <button className="button is-success">
                            Login
                        </button>
                    </p>
                    <p className="control">
                        <a href="">Register</a>
                    </p>
                </div>
            </form>
        )
    }
}

export default Login;