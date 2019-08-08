import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import Constants from '../Constants'
import Login from './Login'

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordCheck: 'N/A',
            passwordCheckResult: false
        }
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            passwordCheckResult: this.state.passwordCheck == e.target.value
        });
    }

    handlePasswordCheckChange = (e) => {
        this.setState({
            passwordCheck: e.target.value,
            passwordCheckResult: this.state.password == e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        axios.post('/cmdnotes/api/register', {
            username: this.state.username,
            password: this.state.password //TODO: encrypt?
        }).then(function (resp) {
            console.log(resp);

            // axios.get('/cmdnotes/api/notes_paging', {
            //     params: {
            //         page: 1
            //     }
            // }).then(function (resp) {
            //     console.log(resp);
            //     var page = Number(resp.data.currentPage);
            //     var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);
            //     ReactDOM.render(<App notes={resp.data.notes} totalPages={total} currentPage={page} />, document.getElementById('root'));
            // }).catch(function (error) {
            //     console.log(error);
            // }).then(function () {
            // });

        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    render = () => {
        console.log(this.state.passwordCheckResult);

        var warningPswCheck = '';
        if (!this.state.passwordCheckResult) {
            warningPswCheck = 'password not match!'
        }

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
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Repeat password" onChange={this.handlePasswordCheckChange} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <span>{warningPswCheck}</span>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <button className="button is-success">
                            Register
                        </button>
                    </p>
                </div>
            </form>
        )
    }
}

export default Register;