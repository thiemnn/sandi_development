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
              <li><a href="/">Trang ch???</a></li>
              <li className="active">????ng k??</li>
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
                            <h4 className="login-title">Th??ng tin ????ng k??</h4>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-20">
                                     <label>H??? v?? t??n <span className="required">*</span></label>
                                    <input className="mb-0" type="text" value={full_name} onChange={e => setFull_Name(e.target.value)} placeholder="H??? v?? t??n"/>
                                    <span className='error-text' style={{ display: showFull_NameError ? "block" : "none" }}>Ch??a nh???p h??? v?? t??n</span>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <label>?????a ch??? email <span className="required">*</span></label>
                                    <input className="mb-0" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="?????a ch??? email"/>
                                    <span className='error-text' style={{ display: showEmailError ? "block" : "none" }}>Ch??a nh???p email ho???c email ch??a ????ng</span>
                                </div>
                                <div className="col-md-12 mb-20">
                                    <label>??i???n tho???i <span className="required">*</span></label>
                                    <input className="mb-0" type="mobile" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="??i???n tho???i"/>
                                    <span className='error-text' style={{ display: showMobileError ? "block" : "none" }}>Ch??a nh???p s??? ??i???n tho???i ho???c s??? ??i???n tho???i ch??a ????ng</span>
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label>M???t kh???u <span className="required">*</span></label>
                                    <input className="mb-0" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="M???t kh???u"/>
                                    <span className='error-text' style={{ display: showPasswordError ? "block" : "none" }}>Ch??a nh???p m???t kh???u</span>
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label>X??c nh???n m???t kh???u <span className="required">*</span></label>
                                    <input className="mb-0" type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)} placeholder="X??c nh???n m???t kh???u"/>
                                    <span className='error-text' style={{ display: showConfirmPasswordError ? "block" : "none" }}>X??c nh???n m???t kh???u ch??a ????ng</span>
                                </div>
                                <div className="col-12">
                                    <button onClick={handleClick} className="register-button mt-0">????ng k??</button>
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
