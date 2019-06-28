import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handeInputChange = this.handeInputChange.bind(this);

        var note = this.props.note;

        this.state = {
            action: props.action, //actions: 1.'add'; 2.'update' 
            id: note == null? 1: note.id,
            title: note == null ? '' : note.title,
            url: note == null ? '' : note.url,
            cmd: note == null ? '' : note.cmd
        }
    }

    handeInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state);
    }

    submit() {
        var me = this;
        console.log(this.state);
        if (this.props.action == 'add') {
            axios.post('/cmdnotes/api/create_note', {
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if(result=='ok'){
                    //TODO should be add complete
                    me.props.updateComplete();
                }else{
                    //TODO
                    alert('Add error.');
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else if (this.props.action == 'update') {
            axios.post('/cmdnotes/api/update_note', {
                id: this.state.id,
                title: this.state.title,
                url: this.state.url,
                cmd: this.state.cmd
            }).then(function (response) {
                var result = response.data.result;
                if(result=='ok'){
                    me.props.updateComplete();
                }else{
                    //TODO
                    alert('Update error.');
                }

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    cancel(){
        this.props.cancelComplete();
    }

    render() {
        var textSubmit = '';
        if (this.props.action == 'add') {
            textSubmit = 'Add';
        } else if (this.props.action == 'update') {
            textSubmit = 'Save';
        }

        return (
            <div className="note-edit">
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