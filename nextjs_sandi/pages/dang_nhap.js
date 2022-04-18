import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchWrapper } from '../helpers/fetch-wrapper';

export default function Home() {
  const router = useRouter();
  let checkBoxRef = React.createRef()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("remember") == 'true'){ 
      setRemember(localStorage.getItem("remember"))
      setEmail(localStorage.getItem("email"))
      setPassword(localStorage.getItem("password"))
    }
  }, [])

  const handleClick = (e) =>  {    
    if (remember && email !== "") {
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      localStorage.setItem("remember", true)
    } else {
      localStorage.setItem("email", "")
      localStorage.setItem("password", "")
      localStorage.setItem("remember", false)
    }
    
    const body = { 
        email: email,
        password:password
    }
    fetchWrapper.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'users/login', body).then((data) => 
    {
        localStorage.setItem("user_full_name", data.data.full_name)
        localStorage.setItem("user_id", data.data.id)
        localStorage.setItem("user_email", data.data.email)  
        window.location = '/'
    })
  }
  const setCheckRemember =(e) =>{
    let isChecked = checkBoxRef.current.checked
    setRemember(isChecked)
  }

  return (
    <>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li className="active">Đăng nhập</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="page-section pt-10 pb-10 pt-sm-30">
        <div className="container">
            <div className="row">
              <div  className="col-sm-12 col-md-12 col-xs-12 col-lg-3 mb-30"></div>
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">                    
                        <div className="login-form">
                            <h4 className="login-title">Thông tin đăng nhập</h4>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-20">
                                     <label>Địa chỉ email <span className="required">*</span></label>
                                    <input className="mb-0" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Địa chỉ email"/>
                                </div>
                                <div className="col-12 mb-20">
                                    <label>Mật khẩu <span className="required">*</span></label>
                                    <input className="mb-0" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                        <input type="checkbox" ref={checkBoxRef} id="remember_me" checked={remember} onChange={() => setCheckRemember()}/>
                                        <label for="remember_me">Nhớ mật khẩu</label>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                                    <a href="#"> Quên mật khẩu?</a>
                                </div>
                                <div className="col-md-12">
                                    <button onClick={handleClick} className="register-button mt-0">Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
