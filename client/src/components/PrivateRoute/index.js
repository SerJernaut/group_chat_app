import React               from 'react';
import PropTypes           from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({ to, user, ...rest }) => {

    return (
        user
            ? <Route {...rest}/>
            : <Redirect to={to}/>
    );
};

const mapStateToProps = state => state.auth;

PrivateRoute.propTypes = {
    to: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.object,
    ] ).isRequired,
};

export default connect(mapStateToProps)( PrivateRoute );