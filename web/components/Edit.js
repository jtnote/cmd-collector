import React from 'react'
import ReactDOM from 'react-dom'

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="note-edit">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="e.g. pip" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="e.g. https://pip.pypa.io/en/stable/installing/" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Command</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="e.g. python get-pip.py #https://bootstrap.pypa.io/get-pip.py"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;