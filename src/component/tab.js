import React from 'react';
import { notification } from 'antd';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';

const Tab = (props) => {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();
    const [tabList, setTabList] = React.useState(null);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/get-table-list`)
            .then(res => res.json()).then((result) => {
                let arr = result.data.map((item)=>item.TABLE_NAME)
                setTabList(arr);
                props.handleTab(arr[0]);
            },
            (error) => {
                console.log(error);
                notification.error({
                    message: "Connect Error",
                    description: "Server has got some problems.",
                    placement: "topRight"
                });
                localStorage.removeItem('user');
                localStorage.removeItem('admin');
                history.push('/login');
                let pathUrl = window.location.href;
                window.location.href = pathUrl;
            }
        );
    },[]);

    return (
        <div className="tabs">
            {
                tabList?.map((tab, index) => {
                    return <div
                        key={index}
                        className={tab === props.nowTab ? 'tab activeTab' : 'tab'}
                        onClick={() => props.handleTab(tab)}
                    >
                        {tab}
                    </div>;
                })
            }
        </div>
    );

};

export default Tab;