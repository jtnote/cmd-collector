import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

import Constants from '../Constants'
import Util from '../Util'

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.view == Constants.VIEW_ADD ? 0 : props.noteEdit.id,
            title: props.view == Constants.VIEW_ADD ? '' : props.noteEdit.title,
            url: props.view == Constants.VIEW_ADD ? '' : props.noteEdit.url,
            cmd: props.view == Constants.VIEW_ADD ? '' : props.noteEdit.cmd
        }
    }

    handeInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state);
    }

    submit = () => {
        var me = this;
        console.log(this.state);
        if (this.props.view == Constants.VIEW_ADD) {
            axios.post('/cmdnotes/api/create_note', {
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if (result == 'ok') {
                    var currentPage;
                    if (me.props.total > 0 && me.props.total % me.props.pageSize == 0) {
                        //totalPages will increase
                        //TODO: to last page or stay current
                        currentPage = me.props.totalPages + 1;
                    } else {
                        currentPage = me.props.totalPages;
                    }

                    Util.loadPage(currentPage, me.props.token, function (notes, total, currentPage, totalPages) {
                        me.props.loadPage(notes, total, currentPage, totalPages);
                        me.props.changeView(Constants.VIEW_LIST);
                    });
                } else {
                    //TODO
                    alert('Add error.');
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else if (this.props.view == Constants.VIEW_EDIT) {
            axios.post('/cmdnotes/api/update_note', {
                id: this.state.id,
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if (result == 'ok') {
                    Util.loadPage(me.props.currentPage, me.props.token, function (notes, total, currentPage, totalPages) {
                        me.props.loadPage(notes, total, currentPage, totalPages);
                        me.props.changeView(Constants.VIEW_LIST);
                    });
                } else {
                    //TODO
                    alert('Update error.');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    cancel = () => {
        this.props.changeView(Constants.VIEW_LIST);
    }

    render() {
        var textSubmit = '';
        var note;
        if (this.props.view == Constants.VIEW_ADD) {
            textSubmit = 'Add';
            note = {
                title: '',
                url: '',
                cmd: ''
            }
        } else if (this.props.view == Constants.VIEW_EDIT) {
            textSubmit = 'Save';
            note = this.props.noteEdit;
        }

        if (note)

            return (
                <div className="container">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type="text" name="title" onChange={this.handeInputChange} placeholder="e.g. pip" value={this.state.title} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Url</label>
                        <div className="control">
                            <input className="input" type="text" name="url" onChange={this.handeInputChange} placeholder="e.g. https://pip.pypa.io/en/stable/installing/" value={this.state.url} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Command</label>
                        <div className="control">
                            <textarea className="textarea" name="cmd" onChange={this.handeInputChange} placeholder="e.g. python get-pip.py #https://bootstrap.pypa.io/get-pip.py" value={this.state.cmd}></textarea>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={this.submit}>{textSubmit}</button>
                        </div>
                        <div className="control">
                            <button className="button is-text" onClick={this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Edit;