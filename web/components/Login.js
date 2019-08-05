import React from 'react';
import ReactDOM from 'react-dom';
import globalStates from '../GlobalStates';
import axios from 'axios'
import Constants from '../Constants'
import App from '../App'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        axios.post('/cmdnotes/api/login').then(function (resp) {
            console.log(resp);

            axios.get('/cmdnotes/api/notes_paging', {
                params: {
                    page: 1
                }
            }).then(function (resp) {
                console.log(resp);
                var page = Number(resp.data.currentPage);
                var total = Math.ceil(Number(resp.data.total) / Constants.PAGE_SIZE);
                ReactDOM.render(<App notes={resp.data.notes} totalPages={total} currentPage={page} />, document.getElementById('root'));
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
            });

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
                        <input className="input" type="email" placeholder="Email" name="username" />
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
                        <input className="input" type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <button className="button is-success">
                            Login
                        </button>
                    </p>
                </div>
            </form>
        )
    }
}

export default Login;