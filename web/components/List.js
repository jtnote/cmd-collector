import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import axios from 'axios'
import Edit from './Edit'
import Constants from '../Constants';

class ListItemEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onEditClick(this.props.idEdit);
    }

    render() {
        var text;
        return (
            <button className="button is-link" onClick={this.handleClick}>Edit</button>
        )
    }
}

class ListItemDelete extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onDeleteClick(this.props.idDelete);
    }

    render() {
        var text;
        return (
            <button className="button is-danger" onClick={this.handleClick}>Delete</button>
        )
    }
}

class ListPagingBar extends React.Component {
    constructor(props) {
        super(props);

        console.log('ListPagingBar: currentPage=' + props.currentPage);

        //type conversion
        var total = Number(this.props.total);
        var current = Number(this.props.currentPage);

        this.state = {
            total: total,
            current: current,
            affix: 3 //TODO: constant
        }
    }


    // after clicking button of page x
    //(size, current)?
    // call top parent
    reloadByPgButton = (e) => {
        // e.preventDefault();
        // e.persist();

        var page = e.target.getAttribute('page');
        // this.props.changePage(Number(page));

        this.props.reloadPage(Number(page));

        // axios.get('/cmdnotes/api/notes_paging', {
        //     params: {
        //         page: page
        //     }
        // }).then(function (response) {
        //     alert('paging return');
        // }).catch(function (error) {
        //     console.log(error);
        // }).then(function () {
        // });
    }

    //called by parent
    changePage = (total, p) => {
        this.setState({
            total: total,
            current: p
        });
    }

    render() {
        console.log('in ListPagingBar');
        console.log(this.state);
        //TODO: if total<=3
        var total = this.state.total;
        var current = this.state.current;
        var affix = this.state.affix;

        var elOuter = [];
        var elEllipsis = (<li><span class="pagination-ellipsis">&hellip;</span></li>);

        if (current < 3 || current > total - 2) {
            var elAffix = [];
            if (current < 3) {
                for (var i = 0; i < affix; i++) {
                    var elAffixItem;
                    if (i + 1 == current) {
                        elAffixItem = (<li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{i + 1}</a></li>);
                    } else {
                        elAffixItem = (<li><a class="pagination-link" aria-label="Goto page 1" page={i + 1} onClick={this.reloadByPgButton}>{i + 1}</a></li>);
                    }
                    elAffix.push(elAffixItem);
                }

                elOuter.push(elAffix);
                elOuter.push(elEllipsis);
                elOuter.push((<li><a class="pagination-link" aria-label="Goto page 1" page={total} onClick={this.reloadByPgButton}>{total}</a></li>));
            } else if (current > total - 2) {
                for (var i = total - affix; i < total; i++) {
                    var elAffixItem;
                    if (i + 1 == current) {
                        elAffixItem = (<li><a class="pagination-link is-current" aria-label="Page 22" aria-current="page">{i + 1}</a></li>);
                    } else {
                        elAffixItem = (<li><a class="pagination-link" aria-label="Goto page 1" page={i + 1} onClick={this.reloadByPgButton}>{i + 1}</a></li>);
                    }
                    elAffix.push(elAffixItem);
                }

                elOuter.push((<li><a class="pagination-link" aria-label="Goto page 1" page={1} onClick={this.reloadByPgButton}>1</a></li>));
                elOuter.push(elEllipsis);
                elOuter.push(elAffix);
            }
        } else { //3<=current<=total-2
            var elMain = [];

            var elMainItem;
            elMainItem = (<li><a class="pagination-link" aria-label="Goto page 1" page={current - 1} onClick={this.reloadByPgButton}>{current - 1}</a></li>);
            elMain.push(elMainItem);
            elMainItem = (<li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{current}</a></li>);
            elMain.push(elMainItem);
            elMainItem = (<li><a class="pagination-link" aria-label="Goto page 1" page={current + 1} onClick={this.reloadByPgButton}>{current + 1}</a></li>);
            elMain.push(elMainItem);

            var elHead = (<li><a class="pagination-link" aria-label="Goto page 1" page={1} onClick={this.reloadByPgButton}>1</a></li>);
            var elTail = (<li><a class="pagination-link" aria-label="Goto page 1" page={total} onClick={this.reloadByPgButton}>{total}</a></li>);

            elOuter.push(elHead);
            elOuter.push(elEllipsis);
            elOuter.push(elMain);
            elOuter.push(elEllipsis);
            elOuter.push(elTail);
        }



        return (
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    {elOuter}
                </ul>
            </nav>
        )
    }
}

//for automatic typechecking (ref: https://reactjs.org/docs/typechecking-with-proptypes.html)
ListPagingBar.propTypes = {
    total: PropTypes.number,
    current: PropTypes.number
};

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //do not affect paging bar directly
            currentPage: this.props.currentPage,
            totalPages: this.props.totalPages,
            notes: this.props.notes
        }

        this.pagingBar = React.createRef();
    }

    handleEdit = (id) => {
        console.log('id=' + id + ", updateComplete=");
        console.log(this.props.updateComplete);
        var me = this;
        axios.get('/cmdnotes/api/note', {
            params: {
                id: id
            }
        }).then(function (response) {
            // console.log(response);
            var note = response.data.note;
            ReactDOM.render(<Edit action="update" note={note} updateComplete={me.props.updateComplete} cancelComplete={me.props.cancelComplete} />, document.getElementById('root'));
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    handleDelete = (id) => {
        console.log('handleDelete id=' + id);
        var me = this;
        axios.post('/cmdnotes/api/delete_note', {
            id: id
        }).then(function (response) {
            // console.log(response);
            var result = response.data.result;
            if (result == 'ok') {
                console.log('in handleDelete');
                me.props.deleteComplete();
            }
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

    //called by parent
    //actually doing reloading
    changePage = (p, totalPages, notes) => {
        // console.log('in List: changepage, total='+totalPages);
        //placed before rendering of list content?
        this.pagingBar.current.changePage(totalPages, p);

        this.setState({
            currentPage: p,
            notes: notes
        });

    }

    render() {
        const lStyle = {
            textDecoration: 'underline'
        };

        var timestamp = new Date().getTime();

        return (
            <div>
                <table className="table cc-mainlist-table">
                    <thead>
                        <tr>
                            <th><abbr title="id">#</abbr></th>
                            <th>Title</th>
                            <th><abbr title="url">Url</abbr></th>
                            <th><abbr title="cmd">Command</abbr></th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        this.state.notes.map((note, i) => (
                            <tr>
                                <td>{note.id}</td>
                                <td><div className="cc-mainlist-table-title">{note.title}</div></td>
                                <td><a href={note.url} style={lStyle} target="_blank">Link</a></td>
                                <td><div className="cc-mainlist-table-cmd">{note.cmd}</div></td>
                                <td>
                                    <div class="buttons">
                                        <ListItemEdit onEditClick={this.handleEdit} idEdit={note.id} />
                                        <ListItemDelete onDeleteClick={this.handleDelete} idDelete={note.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </table>
                <ListPagingBar ref={this.pagingBar} total={this.state.totalPages} currentPage={this.state.currentPage} reloadPage={this.props.reloadPage} />
            </div>
        )
    }
}

// key={"ListPagingBar"+timestamp}

export default List;