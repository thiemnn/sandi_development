
import React, { useState, useEffect } from 'react';

function DetailSection({ relation_id }) {
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState(null)
    const [properties, setProperties] = useState(null)
    const [bread_crumbs, setBreadCrumbs] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [displayTab, setDisplayTab] = useState(1)
    const [productQuantity, setProductQuantity] = useState(1)

    let breadcrumbs = new Array()
    const handleClick = (tab_id) => {
        setDisplayTab(tab_id)
    }

    const handleChangeQuantity = (inc) => {
        if(inc > 0 || productQuantity > 1){
            setProductQuantity(productQuantity + inc)
        }
    }

    function DisplayImage({image}){
        return(
            <div className="lg-image">
                <a className="popup-img venobox vbox-item" href={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} data-gall="myGallery">
                    <img src={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} alt="product image" />
                </a>
            </div>
        )
    }

    function DisplayImageSmall({image}){
        return(
            <div className="sm-image"><img src={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="product image thumb" /></div>
        )
    }

    useEffect(() => {
        if (relation_id) {
            fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'products/' + relation_id)
                .then((res) => res.json())
                .then((data) => {
                    setImages(data.data.images);
                    setProperties(data.data.properties);
                    setBreadCrumbs(JSON.parse(sessionStorage.getItem("breadcrumbs")))
                    setProduct(data.data.product);       
                    setLoaded(true)
                })
        }
      }, [relation_id])
    
    if (loaded && product) {
        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="/san_pham">Sản phẩm</a></li>
                                {bread_crumbs && bread_crumbs.map((breadcrumb) => {
                                    return (
                                        <li key={breadcrumb.url_seo}><a href={"/" + breadcrumb.url_seo}>{breadcrumb.name}</a></li>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content-wraper pt-10 pb-10 pt-sm-30">
                    <div className="container">
                        <div className="row single-product-area">
                            <div className="col-lg-5 col-md-12">
                                <div className="product-details-left">
                                    <div className="product-details-images slider-navigation-1">
                                        {!(images && images.length >0) && (
                                            <div className="lg-image">
                                                <a className="popup-img venobox vbox-item" href={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} data-gall="myGallery">
                                                    <img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="product image" />
                                                </a>
                                            </div>
                                        )}                                            
                                        {images && images.map((image, idx) => (
                                            <div className="lg-image">
                                                <a className="popup-img venobox vbox-item" href={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} data-gall="myGallery">
                                                    <img src={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} alt="product image" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="product-details-thumbs slider-thumbs-1">
                                        {!(images && images.length >0) && (
                                            <div className="sm-image"><img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="product image thumb" /></div>
                                        )}                                        
                                        {images && images.map((image, idx) => (
                                            <div className="sm-image"><img src={image.image_url.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="product image thumb" /></div>                                           
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-6">
                                <div className="product-details-view-content pt-30">
                                    <div className="product-info">
                                        <h2>{product['name']}</h2>
                                        <span className="product-details-ref">Mã sản phẩm: {product.code}</span>
                                        <div dangerouslySetInnerHTML={{ __html: product.solid_work_code }}>

                                        </div>
                                        <div className="product-desc">
                                            <p className="product-des" dangerouslySetInnerHTML={{ __html: product.short_description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-area pt-35">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="nav-align-top mb-4">
                                    <ul className="nav nav-pills mb-3" role="tablist">
                                        <li key='tab1' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link active"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab1"
                                                aria-controls="tab1"
                                                aria-selected="true"
                                                onClick={() => handleClick(1)}
                                            >
                                                Đặc tính
                                            </button>
                                        </li>
                                        <li key='tab2' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab2"
                                                aria-controls="tab2"
                                                aria-selected="false"
                                                onClick={() => handleClick(2)}
                                            >
                                                Ứng dụng
                                            </button>
                                        </li>
                                        <li key='tab3' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab3"
                                                aria-controls="tab3"
                                                aria-selected="false"
                                                onClick={() => handleClick(3)}
                                            >
                                                Hướng dẫn sử dụng
                                            </button>
                                        </li>
                                        <li key='tab4' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab4"
                                                aria-controls="tab4"
                                                aria-selected="false"
                                                onClick={() => handleClick(4)}
                                            >
                                                Thuộc tính
                                            </button>
                                        </li>
                                        <li key='tab5' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab5"
                                                aria-controls="tab5"
                                                aria-selected="false"
                                                onClick={() => handleClick(5)}
                                            >
                                                File tài liệu
                                            </button>
                                        </li>
                                        <li key='tab6' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab6"
                                                aria-controls="tab6"
                                                aria-selected="false"
                                                onClick={() => handleClick(6)}
                                            >
                                                Video hướng dẫn
                                            </button>
                                        </li>
                                        <li key='tab7' className="nav-item">
                                            <button
                                                type="button"
                                                className="nav-link"
                                                role="tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab7"
                                                aria-controls="tab7"
                                                aria-selected="false"
                                                onClick={() => handleClick(7)}
                                            >
                                                Yêu cầu báo giá
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className={!(displayTab == 1) ? "hidden" : "tab-pane fade show active"} id="tab1" role="tabpanel">
                                            <div>
                                                <div className="product-des" dangerouslySetInnerHTML={product.long_description && { __html: product.long_description.replaceAll("src=\"../storage", "src=\""+process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage") }} />
                                            </div>
                                        </div>
                                        <div className={!(displayTab == 2) ? "hidden" : "tab-pane fade"} id="tab2" role="tabpanel">
                                            <div>
                                                <div className="product-des" dangerouslySetInnerHTML={product.application && { __html: product.application.replaceAll("src=\"../storage", "src=\""+process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage") }} />
                                            </div>                                            
                                        </div>
                                        <div className={!(displayTab == 3) ? "hidden" : "tab-pane fade"} id="tab3" role="tabpanel">
                                            <div>
                                                <div className="product-des" dangerouslySetInnerHTML={product.user_manual && { __html: product.user_manual.replaceAll("src=\"../storage", "src=\""+process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage") }} />
                                            </div>                                            
                                        </div>
                                        <div className={!(displayTab == 4) ? "hidden" : "tab-pane fade"} id="tab4" role="tabpanel">
                                            <div className='properties'>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Tên thuộc tính</th>
                                                            <th>Giá trị</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {properties && properties.map((property, idx) => (
                                                            <tr>
                                                                <td className="product-quantity">
                                                                    {property.property_name}
                                                                </td>
                                                                <td className="pro-title">
                                                                    {property.value} {property.property_unit && "(" + property.property_unit + ")"}
                                                                </td>
                                                            </tr>
                                                        ))}                                                        
                                                    </tbody>
                                                </table>
                                            </div>                                            
                                        </div>
                                        <div className={!(displayTab == 5) ? "hidden" : "tab-pane fade"} id="tab5" role="tabpanel">
                                            <p>
                                                Nội dung đang cập nhật
                                            </p>
                                        </div>
                                        <div className={!(displayTab == 6) ? "hidden" : "tab-pane fade center"} id="tab6" role="tabpanel">
                                            <div>
                                                <iframe width="420" height="315" src="https://www.youtube.com/embed/nxe_0jh83Is">
                                                </iframe>
                                            </div>
                                        </div>
                                        <div className={!(displayTab == 7) ? "hidden" : "tab-pane fade"} id="tab7" role="tabpanel">
                                            <div className='form-group quotes'>
                                                <div className="row mb-10">
                                                    <div className='col-md-4 col-4'>
                                                        <label className='form-label'>Têm sảm phẩm<span className="required">*</span></label>
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <input type="text" readOnly className='form-control' value={product.name} placeholder="" />
                                                    </div>
                                                </div>
                                            {properties && properties.map((property, idx) => (
                                                <div className="row mb-10">
                                                    <div className='col-md-4 col-4'>
                                                        <label className='form-label'>{property.property_name} {property.property_unit && "(" + property.property_unit + ")"}<span className="required">*</span></label>
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <input type="text" className='form-control' value={property.value} placeholder="" />
                                                    </div>
                                                </div>
                                            ))}
                                                <div className="row mb-10">
                                                    <div className='col-md-4 col-4'>
                                                        <label className='form-label'>Số lượng <span className="required">*</span></label>
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" readOnly value={productQuantity} type="text" />
                                                            <div className="dec qtybutton" onClick={() => handleChangeQuantity(-1)}><i className="fa fa-angle-down"></i></div>
                                                            <div className="inc qtybutton" onClick={() => handleChangeQuantity( 1)}><i className="fa fa-angle-up"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className='col-md-4 col-4'>
                                                    </div>
                                                    <div className="col-md-8 col-8">
                                                        <div className='cart-quantity'>
                                                            <button className="add-to-cart" type="submit">Gửi yêu cầu báo giá</button>
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
                </div>
            </>
        )
    } else {
        return (<></>)
    }    
}

export default DetailSection