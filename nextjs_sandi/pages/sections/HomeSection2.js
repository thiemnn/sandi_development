import React, { useState, useEffect } from 'react';

export default function HomeSection() {

  const [loaded, setLoaded] = useState(false)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'categories/directChild/0')
            .then((res) => res.json())
            .then((data) => {
              setLoaded(true)
              setCategories(data.data);
            })
  }, [])

  if(categories){
    return (
      <>
        <div class="slider-with-banner">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="slider-area">
                  <div class="slider-active owl-carousel">
                    <div class="single-slide align-center-left  animation-style-01 bg-1">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Dây băng tải</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/bang-tai">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide align-center-left animation-style-02 bg-2">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Động cơ băng tải</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/dong-co-bang-tai">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide align-center-left animation-style-01 bg-3">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Hộp số</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/phu-kien-bang-tai">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide align-center-left animation-style-02 bg-4">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Nhôm định hình</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/nhom-dinh-hinh">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide align-center-left animation-style-02 bg-5">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Thảm cao su ESD</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/tham-cao-su-esd">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide align-center-left animation-style-02 bg-6">
                      <div class="slider-progress"></div>
                      <div class="slider-content">
                        <h2>Phụ kiện băng tải</h2>
                        <div class="default-btn slide-btn">
                          <a class="links" href="http://demo.newsunsoftware.com/phu-kien-bang-tai">Mua hàng</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="col-lg-4 col-md-4 text-center pt-xs-30">
                <div class="li-banner">
                  <a href="#">
                    <img src="http://admin.newsunsoftware.com/storage/tin-tuc/bang-tai-nhom-dinh-hinh-1a.jpg" alt="" />
                  </a>
                </div>
                <div class="li-banner mt-15 mt-sm-30 mt-xs-30">
                  <a href="#">
                    <img src="http://admin.newsunsoftware.com/storage/bang tai/phu-kien-bang-tai.jpg" alt="" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div class="product-area pt-60 pb-50">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="li-product-tab">
                  <ul class="nav li-product-menu">
                    <li><a class="active" data-toggle="tab" href="#li-new-product"><span>Sản phẩm mới nhất</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-content">
              <div id="li-new-product" class="tab-pane active show" role="tabpanel">
                <div class="row">
                  <div class="product-active owl-carousel">
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">
                            <img src="http://admin.newsunsoftware.com/storage/bang%20tai/SBPV23BL2ZNA.png" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/bang-tai-pvc-den-karo-2-3mm-chong-tinh-dien">Băng tải PVC đen Karo 2.3mm chống tĩnh điện</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-area pt-60 pb-50">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="li-product-tab">
                  <ul class="nav li-product-menu">
                    <li><a class="active" data-toggle="tab" href="#li-new-product"><span>Sản phẩm xem nhiều nhất</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-content">
              <div id="li-new-product" class="tab-pane active show" role="tabpanel">
                <div class="row">
                  <div class="product-active owl-carousel">
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">
                            <img src="http://admin.newsunsoftware.com/storage/Dong co/spg/s9i200gt-3b.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/dong-co-spg-200w-3-pha-s9i200gt">Động cơ SPG 200W 3 pha S9I200GT</a></h4>
                          </div>
                          <div class="add-actions">
                            <ul class="add-actions-link">
                              <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                              <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-area pt-60 pb-50">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="li-product-tab">
                  <ul class="nav li-product-menu">
                    <li><a class="active" data-toggle="tab" href="#li-new-product"><span>Tin tức mới nhất</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-content">
              <div id="li-new-product" class="tab-pane active show" role="tabpanel">
                <div class="row">
                  <div class="product-active owl-carousel">
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="single-product-wrap">
                        <div class="product-image">
                          <a href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">
                            <img src="http://admin.newsunsoftware.com/storage/bang tai/bang-tai-pvc-la-gi.jpg" alt="Li's Product Image" />
                          </a>
                          <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                          <div class="product_desc_info">
                            <h4><a class="product_name" href="http://demo.newsunsoftware.com/tim-hieu-bang-tai-pvc-la-gi">Tìm hiểu băng tải pvc là gì?</a></h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else{
    return(
      <></>
    )
  }
  
}
