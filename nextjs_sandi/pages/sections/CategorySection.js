import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

function CategorySection({ relation_id }) {
    //console.log(relation_id)
    const [loaded, setLoaded] = useState(false)
    
    const [dataCategories, setDataCategories] = useState(null)
    const [category, setCategory] = useState(null)
    const [bread_crumbs, setBreadCrumbs] = useState(null)
    const [products, setProducts] = useState(null)
    const [filterOptions, setFilterOptions] = useState(null)
    const [filterNames, setFilterNames] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState(null)
    const [filter_options, setFilter_Options] = useState('')
    const [per_page, setPer_Page] = useState(9)
    const [page, setPage] = useState(1)
    const [product_count, setProduct_Count] = useState(0)
    const [show_group, setShowGroup] = useState(false)
    const [order_by, setOrderBy] = useState(1)
    let checkList = new Array()
    let breadcrumbs = new Array()

    function DisplaySubCategoryV1({ categoryItem, padding }) {
        if (categoryItem.childs) {
            return (
                <li className="has-sub"><a className={"padding_" + padding} href={categoryItem.url_seo}>{categoryItem.name}</a>
                    <ul>
                        {categoryItem.childs.map((child) => (
                            <DisplaySubCategory categoryItem={child} padding = {padding + 10} />
                        ))}
                    </ul>
                </li>
            )
        } else {
            return (
                <li ><a className={"padding_" + padding} href={categoryItem.url_seo}>{categoryItem.name}</a></li>
            )
        }
    }

    function DisplaySubCategoryV2({ categoryItem }){
        if (categoryItem.childs) {
            return(
                <li className="right-menu"><a href={categoryItem.url_seo}>{categoryItem.name}</a>
                    <ul className="cat-mega-menu">
                        <li className="right-menu cat-mega-title">
                            <ul>
                                {categoryItem.childs.map((child) => (
                                    <li><a href={child.url_seo}>{child.name}</a></li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </li>
            )
        }
        else{
            return(
                <li><a href={categoryItem.url_seo}>{categoryItem.name}</a></li>
            )
        }
    }

    function setCheckboxs(target){
        if(selectedOptions) 
        {
            checkList = selectedOptions
        }
        let checkbox_id = target.id.replace('check_', '')
        if (target.checked) {
            if (!checkList.includes(checkbox_id)) {
                checkList.push(checkbox_id)
            }
        }
        else {
            checkList = checkList.filter(item => item !== checkbox_id)
        }     
        setFilter_Options(checkList.toString())
    }

    function clearFilter(target){        
        checkList = new Array()   
        setSelectedOptions(new Array()) 
        setFilter_Options(checkList.toString())
    }

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'categories/' + relation_id + 
        '?filter_options=' + filter_options + 
        '&order_by=' + order_by + 
        '&per_page=' + per_page + 
        '&page=' + page)
            .then((res) => res.json())
            .then((data) => {
                var original_categories = JSON.parse(sessionStorage.getItem("original_categories"))
                var categoryItem = original_categories.filter(function (e) {
                    return e.id == relation_id;
                })[0];
                
                var current_category = categoryItem
                var parent_categories = new Array()
                setProducts(data.data.products);
                setCategory(categoryItem);
                setDataCategories(JSON.parse(sessionStorage.getItem("categories")))
                if(current_category){
                    parent_categories.push(current_category)
                    while(current_category.parent_id > 0){
                        current_category = original_categories.filter(function (e) {
                            return e.id == current_category.parent_id;
                        })[0];
                        parent_categories.push(current_category)
                    }
                }
                while(parent_categories.length > 0){
                    current_category = parent_categories.pop()
                    breadcrumbs.push(current_category)
                }  
                sessionStorage.setItem("breadcrumbs",JSON.stringify(breadcrumbs))
                setBreadCrumbs(breadcrumbs)
                setShowGroup(categoryItem && categoryItem.childs && categoryItem.childs.length > 0 && breadcrumbs.length < 2)
                setFilterOptions(data.data.filters)
                setSelectedOptions(data.data.filter_option_ids)
                setProduct_Count(data.data.product_count)
                const filter_names = new Array()
                data.data.filters.map(filter => {
                    if (!filter_names.includes(filter.filter_name)) {
                        filter_names.push(filter.filter_name)
                    }
                })
                setFilterNames(filter_names)
                setLoaded(true)
            })
    }, [relation_id, filter_options, order_by, per_page, page])      

    function DisplayFilter({ filterName }){  
        return(
            <div className="filter-sub-area pt-sm-10 pt-xs-10">
                <h5 className="filter-sub-titel">{filterName}</h5>
                <div className="size-checkbox">
                    <form action="#">
                        <ul>
                            {filterOptions.map(filterOption => (
                                (filterOption.filter_name == filterName) && 
                                    <li key={filterOption.option_id}><input type="checkbox" id={"check_"+filterOption.option_id} name = {"check_"+filterOption.option_id} checked={selectedOptions && selectedOptions.includes(filterOption.option_id.toString())} onChange={(e) => setCheckboxs(e.target)} /><a href="#">{filterOption.option_name}</a></li>
                            ))}
                        </ul>
                    </form>
                </div>
            </div>        
        );
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

    if (loaded) {
        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><a href="/">Trang chủ</a></li>
                                {!category &&
                                    <li key={'san_pham'} className="active">Sản phẩm</li>
                                }
                                {category &&
                                    <li key={'san_pham'}><a href="/san_pham">Sản phẩm</a></li>
                                }
                                {category && bread_crumbs.map((breadcrumb) => {
                                    if (category.url_seo != breadcrumb.url_seo)
                                        return (
                                            <li key={breadcrumb.url_seo}><a href={"/" + breadcrumb.url_seo}>{breadcrumb.name}</a></li>
                                        )
                                    else
                                        return (
                                            <li key={breadcrumb.url_seo} className="active">{breadcrumb.name}</li>
                                        )
                                }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                {!category && 
                    <div className="li-main-blog-page pt-60 pb-55">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row li-main-content">
                                        {dataCategories && dataCategories.map((category) => {
                                            if (category.name != "Ứng dụng") return (
                                                <div className="col-lg-4 col-md-6" key={category.url_seo}>
                                                    <div className="li-blog-single-item pb-25 div-300">
                                                        <a href={category.url_seo}><img className="img-full" src={category.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="" /></a>

                                                    </div>
                                                    <div className="li-blog-content center">
                                                        <div className="li-blog-details">
                                                            <h3 className="li-blog-heading pt-10 pb-25"><a href={category.url_seo}>{category.name}</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {category && show_group && 
                    <div className="li-main-blog-page pt-60 pb-55">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row li-main-content">
                                        {category.childs.map((category) => (
                                            <div className="col-lg-4 col-md-6" key={category.url_seo}>
                                                <div className="li-blog-single-item pb-25 div-300">
                                                    <a href={category.url_seo}><img className="img-full" src={category.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="" /></a>

                                                </div>
                                                <div className="li-blog-content center">
                                                    <div className="li-blog-details">
                                                        <h3 className="li-blog-heading pt-10 pb-25"><a href={category.url_seo}>{category.name}</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {category && !show_group && 
                    <div className="content-wraper pt-10 pb-10 pt-sm-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 order-1 order-lg-2">
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
                                                            <div className="col-lg-4 col-md-4 col-sm-6 mt-40" key={index}>
                                                                <div className="single-product-wrap">
                                                                    <div className="product-image">
                                                                        <a href={product.url_seo}>
                                                                            <img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt={product.name} />
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
                                                                <div className="col-lg-4 col-md-4 ">
                                                                    <div className="product-image">
                                                                        <a href={product.url_seo}>
                                                                            <img src={product.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt={product.name} />
                                                                        </a>
                                                                        <span className={product.is_new ? "sticker" : "sticker hidden"}>Mới</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8 col-md-8">
                                                                    <div className="product_desc">
                                                                        <div className="product_desc_info">
                                                                            <h4><a className="product_name" href={product.url_seo}>{product.name}</a></h4>
                                                                            <p dangerouslySetInnerHTML={product.short_description && { __html: product.short_description.replace("src=\"../storage", "src=\""+process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage") }} />
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
                                <div className="col-lg-3 order-2 order-lg-1">
                                    <div className="category-menu">
                                        <div className="category-heading">
                                            <h2 className="categories-toggle">
                                                <span>{category && category.name}</span>
                                                <span>{!category && "Sản phẩm"}</span>
                                            </h2>
                                        </div>
                                        <div id="cate-toggle" className="category-menu-list">
                                            <ul>
                                                {category && category.childs && category.childs.map((child, index) => (
                                                    <DisplaySubCategoryV2 categoryItem={child} key={index}/>
                                                ))}
                                                {!category && dataCategories && dataCategories.map((child, index) => (
                                                    <DisplaySubCategoryV2 categoryItem={child} key={index}/>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {
                                        filterNames.length > 0 &&
                                        <div className="sidebar-categores-box">
                                            <div className="sidebar-title">
                                                <h2>Lọc sản phẩm</h2>
                                            </div>
                                            <button onClick={(e) => clearFilter(e.target)} className="btn-clear-all mb-sm-30 mb-xs-30">Xóa điều kiện lọc</button>
                                            {filterNames.map(filterName => (
                                                <DisplayFilter key={filterName} filterName={filterName} />
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    } else {
        return (<></>)
    }
}

export default CategorySection