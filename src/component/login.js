import React from 'react';
import { notification } from 'antd';
import { createBrowserHistory, createHashHistory } from 'history';
import { isElectron } from '../utils';
import '../style/login.scss';

const history = isElectron() ? createHashHistory() : createBrowserHistory();
const mode = 'login';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode
        }
    }
    toggleMode() {
        var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode });
    }
    onFinish(e) {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const fullname = e.target[2].value;
        const email = e.target[3].value;
        const createpassword = e.target[4].value;
        const repeatpassword = e.target[5].value;
        if (this.state.mode === 'login') {
            if (username && password) {
                fetch(`${process.env.REACT_APP_API}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password })
                }).then(res => res.json()).then((result) => {
                    if (result.message === 'Log In Success') {
                        notification.info({
                            message: result.message,
                            description: result.description,
                            placement: 'topRight'
                        });
                        localStorage.setItem("user", username);
                        localStorage.setItem("admin", result.admin);
                        history.push("/");
                        let pathUrl = window.location.href;
                        window.location.href = pathUrl;
                    } else {
                        notification.warning({
                            message: result.message,
                            description: result.description,
                            placement: 'topRight'
                        });
                    }
                },
                    (error) => {
                        console.log(error);
                        notification.error({
                            message: 'Log In Error',
                            description: 'Server has got some problems.',
                            placement: 'topRight'
                        });
                    });
            } else {
                notification.warning({
                    message: 'Input Error',
                    description: 'All field are required.',
                    placement: 'topRight'
                });
            }
        } else {
            if (fullname && email && createpassword && createpassword === repeatpassword) {
                fetch(`${process.env.REACT_APP_API}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fullname: fullname,
                        email: email,
                        createpassword: createpassword
                    })
                }).then(res => res.json()).then((result) => {
                    if (result.message === 'Sign Up Success') {
                        notification.info({
                            message: result.message,
                            description: result.description,
                            placement: 'topRight'
                        });
                        const dom = document.getElementsByTagName('input');
                        for (let i = 0; i < dom.length; i++) {
                            dom[i].value = '';
                        }
                    } else {
                        notification.warning({
                            message: result.message,
                            description: result.description,
                            placement: 'topRight'
                        });
                    }
                },
                    (error) => {
                        console.log(error);
                        notification.error({
                            message: 'Sign Up Error',
                            description: 'Server has got some problem.',
                            placement: 'topRight'
                        });
                    });
            } else {
                notification.warning({
                    message: 'Input Error',
                    description: createpassword !== repeatpassword ? 'Please confirm the password.' : 'All fields are required.',
                    placement: 'topRight'
                })
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className={`form-block-wrapper form-block-wrapper--is-${this.state.mode}`} ></div>
                <section className={`form-block form-block--is-${this.state.mode}`}>
                    <header className="form-block__header">
                        <h1>{this.state.mode === 'login' ? 'Welcome !' : 'Sign up'}</h1>
                        <div className="form-block__toggle-block">
                            <span>{this.state.mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={this.toggleMode.bind(this)} />
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm mode={this.state.mode} onSubmit={this.onFinish.bind(this)} />
                </section>
            </React.Fragment>
        )
    }
}

class LoginForm extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        <Input type="text" id="username" label="user name" disabled={this.props.mode === 'signup'} />
                        <Input type="password" id="password" label="password" disabled={this.props.mode === 'signup'} />
                    </div>
                    <div className="form-group form-group--signup">
                        <Input type="text" id="fullname" label="full name" disabled={this.props.mode === 'login'} />
                        <Input type="email" id="email" label="email" disabled={this.props.mode === 'login'} />
                        <Input type="password" id="createpassword" label="password" disabled={this.props.mode === 'login'} />
                        <Input type="password" id="repeatpassword" label="repeat password" disabled={this.props.mode === 'login'} />
                    </div>
                </div>
                <button className="button button--primary full-width" type="submit">{this.props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
            </form>
        )
    }
}

const Input = ({ id, type, label, disabled }) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} />
);

const Login = () => {

    React.useEffect(() => {
        if (localStorage.getItem("user")) {
            history.push("/");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        }
    }, []);

    return (
        <div className="login-container">
            <div className="app" />
            <LoginComponent mode={mode} />
        </div>
    )
};

export default Login;