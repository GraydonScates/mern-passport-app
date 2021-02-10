import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Store } from './store';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
    const {dispatch} = useContext(Store);

    useEffect(() => {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                dispatch(logoutUser());
                window.location.href = "./login";
            }
        }
    }, [dispatch]);
    
    return(
        <Router>
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
