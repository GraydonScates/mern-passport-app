import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../../store';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const {state} = useContext(Store);
    return <Route {...rest} render={props => state.auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to="/login" />)} />;
}

export default PrivateRoute;