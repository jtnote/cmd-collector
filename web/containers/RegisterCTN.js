import { connect } from 'react-redux'

import Register from '../components/Register'
// import {  } from '../actions/index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    // token: state.token
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // loginSuccess: (token) => dispatch(loginSuccess(token)),
    // changeView: (view) => dispatch(changeView(view))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(Register);
// mapStateToProps,    mapDispatchToProps