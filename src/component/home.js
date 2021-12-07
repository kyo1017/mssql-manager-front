/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';
import Tab from './tab';
import Content from './content';
import Header from './header';
import '../style/home.css';

function Home() {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();
    const [nowTab, setNowTab] = React.useState(null);

    const handleTab = (tab) => {
        setNowTab(tab);
    }

    React.useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/login');
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        }
    }, []);

    return (
        <div>
            <Header />
            <Tab handleTab={handleTab} nowTab={nowTab} />
            <Content nowTab={nowTab} />
        </div>
    );
}

export default Home;
