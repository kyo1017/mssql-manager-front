/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from './header';
import UserContent from './userContent';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';

function Users() {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();

    React.useEffect(() => {
        if (!localStorage.getItem('admin')) {
            history.push('/');
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        } 
    }, []);

    return (
        <React.Fragment>
            <Header />
            <UserContent />
        </React.Fragment>
    );
}

export default Users;
