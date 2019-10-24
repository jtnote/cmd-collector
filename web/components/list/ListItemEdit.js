import React from 'react';
import ReactDOM from 'react-dom';

class ListItemEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.props.onEditClick(this.props.idEdit);
    }

    render() {
        var text;
        return (
            <button className="button is-link is-outlined is-small" onClick={this.handleClick}>Edit</button>
        )
    }
}

export default ListItemEdit;