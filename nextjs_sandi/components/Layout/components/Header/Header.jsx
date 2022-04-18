import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Header() {

  function DisplaySearchSelection({optionList}){
    return (
      <select className="nice-select select-search-category">
        {optionList.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
      </select>
    )    
  }
  function RecursiveComponent({ items, inner }) {
    if(items)
      return items.map((item) => (
        <DisplayItem key={item.id} menuItem={item} inner={inner} />
      ))
    else 
      return <></>
  }
  function DisplayItem({ menuItem, inner }) {
    if (menuItem.childs) {
      if (!inner) {
        return (
          <li className="dropdown-holder"><a className="hasChild" href={menuItem.url_seo}>{menuItem.name}</a>
            <ul className="hb-dropdown">
              <RecursiveComponent items={menuItem.childs} inner={true} />
            </ul>
          </li>
        )
      } else {
        return (
          <li className="sub-dropdown-holder"><a href={menuItem.url_seo}>{menuItem.name}</a>
            <ul className="hb-dropdown hb-sub-dropdown">
              <RecursiveComponent items={menuItem.childs} inner={true} />
            </ul>
          </li>
        )
      }
    } else {
      return (
        <li ><a href={menuItem.url_seo}>{menuItem.name}</a></li>
      )
    }
  }

  function handleLogout(){
    localStorage.removeItem("user_full_name")
    localStorage.removeItem("user_id")
    setFull_Name("")
  }

  const [dataMenus, setDataMenus] = useState(null)
  const [searchOptions, setSearchOptions] = useState(null)
  const [full_name, setFull_Name] = useState("")

  useEffect(() => {
    if(localStorage.getItem("user_full_name")){ 
      setFull_Name(localStorage.getItem("user_full_name"))
    }   

    if(sessionStorage.getItem("menus")){
      setDataMenus(JSON.parse(sessionStorage.getItem("menus")))
    } else{
      fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'menus/')
      .then((res) => res.json())
      .then((data) => {
        setDataMenus(data.data)
        sessionStorage.setItem("menus",JSON.stringify(data.data))
      })
    }

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
    } else{
      fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'categories/')
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("categories",JSON.stringify(data.data.categories))
        sessionStorage.setItem("original_categories",JSON.stringify(data.data.original_categories))
        var categories = data.data.categories;        
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
      })
    }
  }, [])

  if(searchOptions){
    return(
    <div className="body-wrapper">   
      <header>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4">
                        <div className="header-top-left">
                            <ul className="phone-wrap">
                                <li><span>Hot line: </span><a href="#">0903 223 663</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <div className="header-top-right">
                            <ul className="ht-menu">
                                { 
                                  full_name && 
                                  <li>
                                      <a href="/user_info">{full_name}</a>
                                  </li>
                                }
                                { 
                                  full_name && 
                                  <li className='logout'>
                                      <a onClick={() => handleLogout()}>Đăng xuất</a>
                                  </li>
                                }
                                { 
                                  !full_name && 
                                  <li>
                                      <a href="/dang_nhap">Đăng nhập</a>
                                  </li>
                                }
                                { 
                                  !full_name && 
                                  <li>
                                      <a href="/dang_ky">Đăng ký</a>
                                  </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="logo pb-sm-30 pb-xs-30">
                  <a href="/">
                    <img src="images/menu/logo/3.jpg" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                <form action="#" className="hm-searchbox">
                  {<DisplaySearchSelection optionList={searchOptions}/>}
                  <input type="text" placeholder="Nhập từ khóa tìm kiếm ..." />
                  <button className="li-btn" type="submit"><i className="fa fa-search"></i></button>
                </form>
                <div className="header-middle-right">
                  <ul className="hm-menu">
                    <li className="hm-wishlist">
                      <a href="wishlist.html">
                        <span className="cart-item-count wishlist-item-count">0</span>
                        <i className="fa fa-heart-o"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hb-menu">
                  <nav>
                    <ul>
                      {<RecursiveComponent items={dataMenus} inner={false} />}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu-area d-lg-none d-xl-none col-12">
          <div className="container">
            <div className="row">
              <div className="mobile-menu">
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    )
  } else{
    return(
      <></>
    )
  }
}
