import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import CryptoJS from 'crypto-js';

function Login() {
    const [input, setInput] = useState({ username: "", password: "" });
    const [remember, setRemember] = useState(false);
    const handleInputChange = (event) => {
        event.persist();
        setInput({ ...input, [event.target.name]: event.target.value });
    };
    const handleRememberChange = (event) => {
        event.persist();
        setRemember(event.target.checked)
    }
    let history = useHistory();
    function handleLogin() {
        const body = {
            email: input.username,
            password: input.password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        try {
            fetch(process.env.REACT_APP_API_URL + 'auth/login', requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        if (remember) {
                            localStorage.setItem('employee_email', data.data.employee.account);
                            localStorage.setItem('employee_password', data.data.employee.password);
                            localStorage.setItem('employee_remember', true);
                        } else{
                            localStorage.setItem('employee_remember', false);
                            localStorage.removeItem('employee_email')
                            localStorage.removeItem('employee_password')
                        }
                        localStorage.setItem('token', data.data.token);
                        history.push("/dashboard");
                    } else {
                        console.log('Thông tin đăng nhập không hợp lệ')
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const employee_remember = localStorage.getItem('employee_remember');  
        const data = {username: 'abc', password: 'abc'}
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_key').toString();   
        console.log(ciphertext)   
        var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret_key');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData)
        if (employee_remember && employee_remember === 'true') {
            setRemember(true)
            const employee_email = localStorage.getItem('employee_email');
            const employee_password = localStorage.getItem('employee_password');
            setInput({ ...input, "username": employee_email, "password": employee_password });
        } else{
            setRemember(false)
        }
    }, [])

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
                            <Form className="pt-3" autoComplete='on'>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control type="text" name='username' value={input.username} onChange={handleInputChange} placeholder="Email" autoComplete="on" size="lg" className="h-auto" />
                                </Form.Group>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control type="password" name='password' value={input.password} onChange={handleInputChange} placeholder="Mật khẩu" autoComplete="on" size="lg" className="h-auto" />
                                </Form.Group>
                                <div className="mt-3">
                                    <button type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => handleLogin()}>Đăng nhập</button>
                                </div>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                            <input type="checkbox" className="form-check-input" checked={remember} onChange={handleRememberChange} />
                                            <i className="input-helper"></i>
                                            Nhớ mật khẩu
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

export default Login
