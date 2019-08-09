import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Util from '../../Util';

class ListPagingBar extends React.Component {
    constructor(props) {
        super(props);

        // console.log('ListPagingBar: currentPage=' + props.currentPage);

        //type conversion
        // var total = Number(this.props.total);
        // var current = Number(this.props.currentPage);

        // this.state = {
        // total: total,
        // current: current,
        // affix: 3 //TODO: constant
        // }
    }


    // after clicking button of page x
    //(size, current)?
    // call top parent
    reloadByPgButton = (e) => {
        // e.preventDefault();
        // e.persist();

        var page = e.target.getAttribute('page');
        var me = this;

        Util.loadPage(page, this.props.token, function (notes, total, currentPage, totalPages) {
            me.props.loadPage(notes, total, currentPage, totalPages);
        });
    }

    reloadPrev = (e) => {
        var me = this;
        Util.loadPage(this.props.currentPage == 1 ? 1 : this.props.currentPage - 1, this.props.token, function (notes, total, currentPage, totalPages) {
            me.props.loadPage(notes, total, currentPage, totalPages);
        });
    }

    reloadNext = (e) => {
        var me = this;
        Util.loadPage(this.props.currentPage == this.props.totalPages ? this.props.totalPages : this.props.currentPage + 1, this.props.token, function (notes, total, currentPage, totalPages) {
            me.props.loadPage(notes, total, currentPage, totalPages);
        });
    }

    render() {
        //TODO: if total<=3
        var total = this.props.totalPages;
        var current = this.props.currentPage;
        var affix = this.props.pagingAffix;

        var elOuter = [];
        var elEllipsis = (<li><span class="pagination-ellipsis">&hellip;</span></li>);

        if (total <= affix) {
            for (var i = 0; i < total; i++) {
                var elItem;
                if (i + 1 == current) {
                    elItem = (<li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{i + 1}</a></li>);
                } else {
                    elItem = (<li><a class="pagination-link" aria-label="Page 46" aria-current="page" page={i + 1} onClick={this.reloadByPgButton}>{i + 1}</a></li>)
                }
                elOuter.push(elItem);
            }
        }
        else {

            // if (current < 3 || current > total - 2) {
            if (current < affix || current > total - affix + 1) {
                var elAffix = [];
                // if (current < 3) {
                if (current < affix) {
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
                    // } else if (current > total - 2) {
                } else if (current > total - affix + 1) {

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
        }



        return (
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous" onClick={this.reloadPrev}>Previous</a>
                <a class="pagination-next" onClick={this.reloadNext}>Next page</a>
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