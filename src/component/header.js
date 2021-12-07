import React from 'react';
import { Button, Space } from 'antd';
import { LogoutOutlined, UnlockOutlined, HistoryOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';

const Header = () => {

    const history = isElectron() ? createHashHistory() : createBrowserHistory();
    const [browserWidth, setBrowserWidth] = React.useState(window.innerWidth);

    const handleResize = () => {
        setBrowserWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    const goHome = () => {
        history.push('/');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    const userManage = () => {
        history.push('/users');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    const viewLog = () => {
        history.push('/view-log');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    const changePassword = () => {
        history.push('/change-password');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        history.push('/login');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    return (
        <div className="header">
            <a onClick={goHome}>
                <img src="logo.png" alt="logo" width="100" style={{ marginRight: '20px' }} />
            </a>
            <div className="header-content">
                {
                    browserWidth > 961 &&
                    <p className="header-text" >Hello, {localStorage.getItem('user')} !</p>
                }
                <Space wrap style={{ justifyContent: 'center' }}>
                    <Space>
                        <Button
                            type="text"
                            icon={<HomeOutlined />}
                            style={{ color: '#0044aa', fontWeight: 'bold' }}
                            onClick={goHome}
                        >
                            Home
                        </Button>
                        {
                            localStorage.getItem('admin') === 'true' ?
                                <React.Fragment>
                                    <Button
                                        type="text"
                                        icon={<UserOutlined />}
                                        style={{ color: '#0044aa', fontWeight: 'bold' }}
                                        onClick={userManage}
                                    >
                                        User Manage
                                    </Button>
                                    <Button
                                        type="text"
                                        icon={<HistoryOutlined />}
                                        style={{ color: '#0044aa', fontWeight: 'bold' }}
                                        onClick={viewLog}
                                    >
                                        View Log
                                    </Button>
                                </React.Fragment>
                                : null
                        }
                    </Space>
                    <Space>
                        <Button
                            type="text"
                            icon={<UnlockOutlined />}
                            style={{ color: '#0044aa', fontWeight: 'bold' }}
                            onClick={changePassword}
                        >
                            Change password
                        </Button>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            style={{ color: '#0044aa', fontWeight: 'bold' }}
                            onClick={logout}
                        >
                            Log Out
                        </Button>
                    </Space>
                </Space>
            </div>
        </div>
    );

};
 
export default Header;
