/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from './header';
import LogContent from './logContent';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';

function Log() {

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
            <LogContent />
        </React.Fragment>
    );
}

export default Log;
