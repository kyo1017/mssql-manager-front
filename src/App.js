import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { notification } from 'antd';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from './utils';
import Home from './component/home';
import Log from './component/log';
import Password from './component/password';
import Login from './component/login';
import Users from './component/users';

function App() {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/create-base-tables`)
        .then(res => res.json()).then((result) => {
            if (result.message === 'success') {
                console.log('Server is OK.');
            }
        }, (error) => {
            console.log(error);
            notification.error({
                message: "Connect Error",
                description: "Server has got some problems.",
                placement: "topRight"
            });
        });
    }, []);

    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/users' exact>
                        <Users />
                    </Route>
                    <Route path='/view-log' exact>
                        <Log />
                    </Route>
                    <Route path='/change-password' exact>
                        <Password />
                    </Route>
                    <Route path='/login' exact>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
