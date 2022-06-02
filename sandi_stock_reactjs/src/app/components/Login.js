import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class Login extends Component {
    handleLogin() {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // };
        // return fetch(process.env.REACT_APP_API_URL + 'login', requestOptions)
        //     .then(data => data.json())

        const body = {
            email: 'abc',
            password: 'abc'
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        try {
            fetch(process.env.REACT_APP_API_URL + 'login', requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
        } catch (error) {
            console.error(error);
        }
        // localStorage.setItem('token', 'abc');
        // this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src={require("../../assets/images/logo.svg")} alt="logo" />
                                </div>
                                <h4>Chào mừng bạn đến với phần mềm quản trị doanh nghiệp</h4>
                                <h6 className="font-weight-light">Đăng nhập để tiếp tục.</h6>
                                <Form className="pt-3">
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control type="email" placeholder="Email" size="lg" className="h-auto" />
                                    </Form.Group>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control type="password" placeholder="Mật khẩu" size="lg" className="h-auto" />
                                    </Form.Group>
                                    <div className="mt-3">
                                        <button type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.handleLogin.bind(this)}>Đăng nhập</button>
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" />
                                                <i className="input-helper"></i>
                                                Keep me signed in
                                            </label>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
