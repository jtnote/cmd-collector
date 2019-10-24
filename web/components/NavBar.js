import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';

import Constants from '../Constants';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ddActive: false
        }
    }

    toAdd = (e) => {
        this.props.changeView(Constants.VIEW_ADD);
    }

    logout = (e) => {
        this.props.logoutSuccess();
        this.props.changeView(Constants.VIEW_LOGIN);
    }

    toggleDD = (e) => {
        this.setState({
            ddActive: !this.state.ddActive
        });
    }

    windowClick = (e) => {
        // e.preventDefault();

        if (e.target.classList.contains('react-menu-button')) {
            return;
        } else {
            this.setState({
                ddActive: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.windowClick, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.windowClick, false);
    }

    render() {
        var ddClasses = classNames({
            'dropdown': true,
            'is-active': this.state.ddActive
        });

        return (
            <nav className="level react-menu-button">
                <div className="level-left react-menu-button">
                    <a className="button is-primary" onClick={this.toAdd}>New</a>
                </div>

                <div className="level-right react-menu-button">
                    <div className={ddClasses} onClick={this.toggleDD}>
                        <div class="dropdown-trigger">
                            <button className="button react-menu-button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span className="react-menu-button">---</span>
                                <span className="icon is-small react-menu-button">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                <a href="#" className="dropdown-item" onClick={this.logout}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;


{/* <nav class="level">
                <div class="level-left">
                    <a className="button is-primary" onClick={this.toAdd}>New</a>
                </div>

                <div class="level-right">
                    <div class="dropdown is-active">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span>Dropdown button</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a href="#" class="dropdown-item">
                                    Dropdown item
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav> */}