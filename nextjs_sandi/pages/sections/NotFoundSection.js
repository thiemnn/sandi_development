import React from "react";

export default function NotFoundSection() {
  return (
    <div className="error404-area pt-30 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="error-wrapper text-center ptb-50 pt-xs-20">
              <div className="error-text">
                <h1>404</h1>
                <h2>Không tồn tại trang này</h2>
                <p>Trang này không tồn tại hoặc đã bị xóa.</p>
              </div>
              <div className="error-button">
                <a href="/">Trở về trang chủ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
