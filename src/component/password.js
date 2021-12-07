/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from './header';
import PasswordForm from './passwordForm';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';

function Log() {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();

    React.useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/login');
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        } 
    }, []);

    return (
        <React.Fragment>
            <Header />
            <PasswordForm />
        </React.Fragment>
    );
}

export default Log;
