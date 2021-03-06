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
                    Sandi Vi???t Nam ???????c th??nh l???p v???i ph????ng ch??m tr??? th??nh nh?? cung c???p, gia c??ng ch??? t???o m???t b??ng t???i chuy??n nghi??p.
                  </p> */}
                </div>
                <ul className="des">
                  <li>
                    <span>?????a ch???: </span>
                    S??? 522 Ph??c Di???n, Q. Nam T??? Li??m, Tp.H?? N???i
                  </li>
                  <li>
                    <span>??i???n tho???i: </span>
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
                  <h3 className="footer-block-title">S???n ph???m</h3>
                  <ul>
                    <li><a href="#">D??y b??ng t???i</a></li>
                    <li><a href="#">?????ng c?? b??ng t???i</a></li>
                    <li><a href="#">Ph??? ki???n b??ng t???i</a></li>
                    <li><a href="#">H??? th???ng b??ng t???i</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">V??? c??ng ty</h3>
                  <ul>
                    <li><a href="#">V??? ch??ng t??i</a></li>
                    <li><a href="#">Ch??nh s??ch b???o m???t</a></li>
                    <li><a href="#">??i???u ki???n giao h??ng</a></li>
                    <li><a href="#">??i???u kho???n v?? ??i???u ki???n</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-newsletter">
                  <h4>????ng k?? ????? nh???n b???n tin</h4>
                  <form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" target="_blank" >
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form form-group" >
                        <input id="mc-email" type="email" autoComplete="off" placeholder="Nh???p ?????a ch??? email" />
                        <button className="btn" id="mc-submit">????ng k??</button>
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
