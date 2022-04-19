import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

function SearchProductSection({search, category_id, opt_1, opt_2, opt_3}) {
    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState(null)
    const [per_page, setPer_Page] = useState(16)
    const [page, setPage] = useState(1)
    const [product_count, setProduct_Count] = useState(0)
    
    const [searchOptions, setSearchOptions] = useState(null)
    const [selectedCategoryId,setSelectedCategoryId] = useState(category_id)
    const [keyword,setKeyword] = useState(search)
    const [opt1,setOpt1] = useState(opt_1 == "true" ? true : false)
    const [opt2,setOpt2] = useState(opt_2 == "true" ? true : false)
    const [opt3,setOpt3] = useState(opt_3 == "true" ? true : false)
    const [order_by, setOrderBy] = useState(1)

    useEffect(() => {
        if(sessionStorage.getItem("categories")){
          var categories = JSON.parse(sessionStorage.getItem("categories"));      
          var optionList = new Array();
          optionList.push({id:0, name:"Tất cả"})
          categories.map((item) => {
            optionList.push({id:item.id, name:item.name})
            if(item.childs && item.childs.length > 0){
              item.childs.map((child) => {          
                optionList.push({id:child.id, name: "-" + child.name})
              })
            }
          })
          setSearchOptions(optionList)
        } 
      }, [])

    function DisplayCategorySelection({optionList}){
        return (
            <select className="nice-select" defaultValue={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)}>
                {optionList.map((opt) => (<option key={opt.id} value={opt.id} >{opt.name}</option>)
                )}
            </select>
        )    
      }

    function handleSearchClick(){
        window.location="search_product?search="+keyword+"&category_id="+selectedCategoryId+"&opt1="+opt1+"&opt2="+opt2+"&opt3="+opt3
    }

    function privousPage(){
        if(page > 1){
            setPage(page - 1);
        }
    }
    function nextPage(){
        if(page < Math.ceil(product_count / per_page)){
            setPage(page + 1);
        }
    }
    function gotoPage(page_index){
        setPage(page_index);
    }

    function DisplayPaginator() {
        var start_page = page < 3 ? 1 : page - 2;
        var page_count = Math.ceil(product_count / per_page);        
        var end_page = page > page_count - 2 ? page_count : page + 2;
        
        let pages = [];
        for(var i = start_page; i<= end_page; i++){
            pages.push(i);
        }
        return (
            <div className="paginatoin-area">
                <div className="row">
                    <div className="col-lg-6 col-md-6 pt-xs-15">
                        <p>Hiển thị {Math.min(per_page,product_count)}/{product_count} sản phẩm</p>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <ul className="pagination-box pt-xs-20 pb-xs-15">
                            <li><a onClick={() => privousPage()} className="Previous"><i className="fa fa-chevron-left"></i> Trước</a>
                            </li>
                            {pages.map((page_index)=>(
                                 <li key={page_index} className={page_index == page ? 'active' : undefined} ><a onClick={() => gotoPage(page_index)}>{page_index}</a></li>
                            ))}
                            <li>
                                <a onClick={() => nextPage()} className="Next"> Sau <i className="fa fa-chevron-right"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'products?category_id='+ category_id + 
        '&search=' + search + 
        '&opt1=' + opt1 + 
        '&opt2=' + opt2 + 
        '&opt3=' + opt3 + 
        '&order_by=' + order_by + 
        '&per_page=' + per_page + 
        '&page=' + page)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data.products);
                setProduct_Count(data.data.product_count)
                setLoaded(true)
            })
    }, [page, order_by])   

    if (loaded) {
        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><a href="/">Trang chủ</a></li>
                                <li key={'tim_kiem'} className="active">Tìm kiếm</li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="content-wraper pt-10 pb-10 pt-sm-30">
                    <div className="container">
                        <div className='row mb-10 search-form'>                            
                            <div className="col-lg-2">
                                Tìm trong danh mục:
                            </div>
                            <div className="col-lg-4">
                                <DisplayCategorySelection optionList={searchOptions}/>
                            </div>
                        </div>
                        <div className='row mb-10 search-form'>
                            <div className="col-lg-2">
                                Từ khóa tìm kiếm:
                            </div>
                            <div className="col-lg-4">
                                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}/>
                            </div>                            
                        </div>
                        <div className='row mb-10 search-form'>
                            <div className="col-lg-3">
                                Tìm trong đặc tính:
                            </div>
                            <div className="col-lg-3">
                                <input type="checkbox" className='checkbox' name="searchOpt[]" checked={opt1} onChange={() => setOpt1(!opt1)}/>
                            </div>
                        </div>
                        <div className='row mb-10 search-form'>
                            <div className="col-lg-3">
                                Tìm trong hướng dẫn sử dụng:
                            </div>
                            <div className="col-lg-3">
                                <input type="checkbox" className='checkbox' name="searchOpt[]" checked={opt2} onChange={() => setOpt2(!opt2)}/>
                            </div>
                        </div>
                        <div className='row mb-10 search-form'>
                            <div className="col-lg-3">
                                Tìm trong ứng dụng:
                            </div>
                            <div className="col-lg-3">
                                <input type="checkbox" className='checkbox' name="searchOpt[]" checked={opt3} onChange={() => setOpt3(!opt3)}/>
                            </div>
                        </div>
                        <div className='row mb-10 search-form'>
                            <div className="col-lg-2">
                                
                            </div>
                            <div className="col-lg-4">
                                <button className="li-btn-3" onClick={handleSearchClick}>Tìm kiếm</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="shop-top-bar">
                                    <div className="shop-bar-inner">
                                        <div className="product-view-mode">
                                            <ul className="nav shop-item-filter-list" role="tablist">
                                                <li className="active" role="presentation"><a aria-selected="true" className="active show" data-toggle="tab" role="tab" aria-controls="grid-view" href="#grid-view"><i className="fa fa-th"></i></a></li>
                                                <li role="presentation"><a data-toggle="tab" role="tab" aria-controls="list-view" href="#list-view"><i className="fa fa-th-list"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="toolbar-amount">
                                            <span>Hiển thị {Math.min(per_page, product_count)}/{product_count} sản phẩm</span>
                                        </div>
                                    </div>
                                    <div className="product-select-box">
                                        <div className="product-short">
                                            <p>Sắp xếp theo:</p>
                                            <select className="nice-select" defaultValue={order_by} onChange={e => setOrderBy(e.target.value)}>
                                                <option value="1">Thứ tự từ A-Z</option>
                                                <option value="2">Sản phẩm mới nhất</option>
                                                <option value="3">Sản phẩm xem nhiều nhất</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="shop-products-wrapper">
                                    <div className="tab-content">
                                        <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                            <div className="product-area shop-product-area">
                                                <div className="row">
                                                    {products && products.map((product, index) => (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 mt-40" key={index}>
                                                            <div className="single-product-wrap">
                                                                <div className="product-image">
                                                                    <a href={product.url_seo}>
                                                                        <img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} alt={product.name} />
                                                                    </a>
                                                                    <span className={product.is_new ? "sticker" : "sticker hidden"}>Mới</span>
                                                                </div>
                                                                <div className="product_desc">
                                                                    <div className="product_desc_info">
                                                                        <h4>
                                                                            <a className="product_name" href={product.url_seo}>{product.name}</a>
                                                                        </h4>
                                                                        <p className='center'>
                                                                            Liên hệ: 0903 223 663
                                                                        </p>
                                                                    </div>
                                                                    <div className="add-actions">
                                                                        <ul className="add-actions-link">
                                                                            <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                                            <li><a href={product.url_seo} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye"></i></a></li>
                                                                            <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view" className="tab-pane fade product-list-view" role="tabpanel">
                                            <div className="row">
                                                <div className="col">
                                                    {products && products.map((product, index) => (
                                                        <div className="row product-layout-list" key={index}>
                                                            <div className="col-lg-3 col-md-3 ">
                                                                <div className="product-image">
                                                                    <a href={product.url_seo}>
                                                                        <img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} alt={product.name} />
                                                                    </a>
                                                                    <span className={product.is_new ? "sticker" : "sticker hidden"}>Mới</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-9 col-md-9">
                                                                <div className="product_desc">
                                                                    <div className="product_desc_info">
                                                                        <h4><a className="product_name" href={product.url_seo}>{product.name}</a></h4>
                                                                        <p dangerouslySetInnerHTML={product.short_description && { __html: product.short_description.replace("src=\"../storage", "src=\"" + process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage") }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <DisplayPaginator />
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

export default SearchProductSection