import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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

export default ListPagingBar;