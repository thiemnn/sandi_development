import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../helpers/fetch-wrapper';
export default function Home() {

  const [full_name, setFull_Name] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  
  const [showFull_NameError, setshowFull_NameError] = useState(false)
  const [showEmailError, setshowEmailError] = useState(false)
  const [showMobileError, setshowMobileError] = useState(false)
  const [showPasswordError, setshowPasswordError] = useState(false)
  const [showConfirmPasswordError, setshowConfirmPasswordError] = useState(false)

  function isValidEmail(myval) {
    var validCharactersRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validCharactersRegex.test(myval.trim());
  }
  function isValidMobile(myval){
    return myval.length >= 10
  }
  const handleClick = (e) => {
    var valid = true;
    var validConfirm = confirm_password == password ? true : false
    var validEmail = email && isValidEmail(email) ? true : false
    var validMobile = mobile && isValidMobile(mobile) ? true : false
    if (!full_name || !validEmail || !validMobile || !password || !validConfirm) {
      valid = false
    }
    setshowFull_NameError(full_name ? false : true)
    setshowEmailError(validEmail ? false : true)
    setshowMobileError(validMobile ? false : true)
    setshowPasswordError(password ? false : true)
    setshowConfirmPasswordError(validConfirm ? false : true)
    if (!valid) {
      return
    }
    const body = {
      full_name: full_name,
      email: email,
      mobile: mobile,
      password: password,
    }
    fetchWrapper.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'users/register', body).then((data) => {
      window.location = '/dang_nhap'
    })
  }

  return (
    <>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li className="active">Đăng ký</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-section pt-10 pb-10 pt-sm-30">
        <div className="container">
            <div className="row">
              <div  className="col-sm-12 col-md-12 col-xs-12 col-lg-3 mb-30"></div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
                    <form action="#">
                        <div className="login-form">
                            <h4 className="login-title">Thông tin đăng ký</h4>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-20">
                                     <label>Họ và tên <span className="required">*</span></label>
                                    <input className="mb-0" type="text" value={full_name} onChange={e => setFull_Name(e.target.value)} placeholder="Họ và tên"/>
                                    <span className='error-text' style={{ display: showFull_NameError ? "block" : "none" }}>Chưa nhập họ và tên</span>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <label>Địa chỉ email <span className="required">*</span></label>
                                    <input className="mb-0" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Địa chỉ email"/>
                                    <span className='error-text' style={{ display: showEmailError ? "block" : "none" }}>Chưa nhập email hoặc email chưa đúng</span>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <label>Điện thoại <span className="required">*</span></label>
                                    <input className="mb-0" type="mobile" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Điện thoại"/>
                                    <span className='error-text' style={{ display: showMobileError ? "block" : "none" }}>Chưa nhập số điện thoại hoặc số điện thoại chưa đúng</span>
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label>Mật khẩu <span className="required">*</span></label>
                                    <input className="mb-0" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu"/>
                                    <span className='error-text' style={{ display: showPasswordError ? "block" : "none" }}>Chưa nhập mật khẩu</span>
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label>Xác nhận mật khẩu <span className="required">*</span></label>
                                    <input className="mb-0" type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)} placeholder="Xác nhận mật khẩu"/>
                                    <span className='error-text' style={{ display: showConfirmPasswordError ? "block" : "none" }}>Xác nhận mật khẩu chưa đúng</span>
                                </div>
                                <div className="col-12">
                                    <button onClick={handleClick} className="register-button mt-0">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
