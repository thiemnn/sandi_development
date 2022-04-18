import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../helpers/fetch-wrapper';
export default function Home() {
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerMobile, setCustomerMobile] = useState("")
  const [customerMessage, setCustomerMessage] = useState("")

  const [showNameError, setshowNameError] = useState(false)
  const [showEmailError, setshowEmailError] = useState(false)
  const [showMobileError, setshowMobileError] = useState(false)
  const [showMessageError, setshowMessageError] = useState(false)

  function isValidEmail(myval) {
    var validCharactersRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validCharactersRegex.test(myval.trim());
  }
  function isValidMobile(myval){
    return myval.length >= 10
  }

  const handleClick = (e) =>  {  
    var valid = true;
    var validEmail = customerEmail && isValidEmail(customerEmail) ? true : false
    var validMobile = customerMobile && isValidMobile(customerMobile) ? true : false
    if (!customerName || !validEmail || !validMobile || !customerMessage) {
      valid = false
    }
    setshowNameError(customerName ? false : true)
    setshowEmailError(validEmail ? false : true)
    setshowMobileError(validMobile ? false : true)
    setshowMessageError(customerMessage ? false : true)
    if (!valid) {
      return
    }
    const body = {
      full_name: customerName,
      email: customerEmail,
      mobile: customerMobile,
      message: customerMessage,
    }
    fetchWrapper.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'users/addContact', body).then((data) => {
      window.location = '/ve_chung_toi'
    })
  }

  return (
    <>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li className="active">Liên hệ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
        {/* <div className="container mb-60">
          <div id="google-map"></div>
        </div> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Liên lạc với chúng tôi</h3>
                <p className="contact-page-message mb-25">.</p>
                <div className="single-contact-block">
                  <h4><i className="fa fa-fax"></i> Địa chỉ</h4>
                  <p>Số 522 Phúc Diễn, Q. Nam Từ Liêm, Tp.Hà Nội</p>
                </div>
                <div className="single-contact-block">
                  <h4><i className="fa fa-phone"></i> Điện thoại</h4>
                  <p>0903 223 663</p>
                </div>
                <div className="single-contact-block last-child">
                  <h4><i className="fa fa-envelope-o"></i> Email</h4>
                  <p>kinhdoanh.sandivietnam@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="contact-form-content pt-sm-55 pt-xs-55">
                <h3 className="contact-page-title">Liên hệ với chúng tôi</h3>
                <div className="contact-form">
                    <div className="form-group">
                      <label>Họ và tên <span className="required">*</span></label>
                      <input type="text" name="customerName" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                      <span className='error-text' style={{ display: showNameError ? "block" : "none" }}>Chưa nhập họ và tên</span>
                    </div>
                    <div className="form-group">
                      <label>Địa chỉ email <span className="required">*</span></label>
                      <input type="email" name="customerEmail" id="customerEmail" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required />
                      <span className='error-text' style={{ display: showEmailError ? "block" : "none" }}>Chưa nhập địa chỉ email</span>
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại <span className="required">*</span></label>
                      <input type="mobile" name="customerMobile" id="customerMobile" value={customerMobile} onChange={e => setCustomerMobile(e.target.value)} required />
                      <span className='error-text' style={{ display: showMobileError ? "block" : "none" }}>Chưa nhập số điện thoại</span>
                    </div>
                    <div className="form-group mb-30">
                      <label>Nội dung <span className="required">*</span></label>
                      <textarea name="customerMessage" id="customerMessage" value={customerMessage} onChange={e => setCustomerMessage(e.target.value)} required></textarea>
                      <span className='error-text' style={{ display: showMessageError ? "block" : "none" }}>Chưa nhập nội dung</span>
                    </div>
                    <div className="form-group">
                      <button onClick={handleClick} className="li-btn-3">Gửi</button>
                    </div>
                </div>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
