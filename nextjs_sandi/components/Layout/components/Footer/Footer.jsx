import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      {/* <div className="footer-static-top">
        <div className="container">
          <div className="footer-shipping pt-60 pb-55 pb-xs-25">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="images/shipping-icon/1.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Free Delivery</h2>
                    <p>And free returns. See checkout for delivery dates.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="images/shipping-icon/2.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Safe Payment</h2>
                    <p>Pay with the world's most popular and secure payment methods.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="images/shipping-icon/3.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Shop with Confidence</h2>
                    <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="images/shipping-icon/4.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>24/7 Help Center</h2>
                    <p>Have a question? Call a Specialist or chat online.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="footer-static-middle">
        <div className="container">
          <div className="footer-logo-wrap pt-50 pb-35">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="footer-logo">
                  <img src="images/menu/logo/3.jpg" alt="Footer Logo" />
                  {/* <p className="info">
                    Sandi Việt Nam được thành lập với phương châm trở thành nhà cung cấp, gia công chế tạo mặt băng tải chuyên nghiêp.
                  </p> */}
                </div>
                <ul className="des">
                  <li>
                    <span>Địa chỉ: </span>
                    Số 522 Phúc Diễn, Q. Nam Từ Liêm, Tp.Hà Nội
                  </li>
                  <li>
                    <span>Điện thoại: </span>
                    <a href="#">0903 223 663</a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a href="mailto://kinhdoanh.sandivietnam@gmail.com">kinhdoanh.sandivietnam@gmail.com</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Sản phẩm</h3>
                  <ul>
                    <li><a href="#">Dây băng tải</a></li>
                    <li><a href="#">Động cơ băng tải</a></li>
                    <li><a href="#">Phụ kiện băng tải</a></li>
                    <li><a href="#">Hệ thống băng tải</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Về công ty</h3>
                  <ul>
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Điều kiện giao hàng</a></li>
                    <li><a href="#">Điều khoản và điều kiện</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-newsletter">
                  <h4>Đăng ký để nhận bản tin</h4>
                  <form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" target="_blank" >
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form form-group" >
                        <input id="mc-email" type="email" autoComplete="off" placeholder="Nhập địa chỉ email" />
                        <button className="btn" id="mc-submit">Đăng ký</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
