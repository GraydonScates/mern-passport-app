import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from '../../store';
import { logoutUser } from '../../actions/authActions';

import API from '../../utils/apiHelper';

const Dashboard = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(Store);
    const user = state.auth.user;

    useEffect(() => {
        if(!state.auth.isAuthenticated) history.push("/login");
        API.getUser().then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err));
    }, [state, history]);

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser(history)(dispatch);
    }

    return (
        <div className="container valign-wrapper" style={{ height: "75vh" }}>
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b>Hey there,</b> {user.name.split(" ")[0]}
                        <p className="flow-text grey-text text-darken-1">
                            You are logged into a full-stack{" "} <span style={{ fontFamily: "monospace" }}>MERN</span> app
                        </p>
                    </h4>
                    <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }} onClick={onLogoutClick}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;