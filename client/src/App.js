import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Store } from './store';

import './App.css';

import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

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
                <Footer />
            </div>
        </Router>
    );
}

export default App;
