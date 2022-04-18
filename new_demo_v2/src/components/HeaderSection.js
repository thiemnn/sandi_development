function HeaderSection() {
    const options = [
        {"id":"0", "name":"Tất cả"},
        {"id":"1", "name":"Dây băng tải"},
        {"id":"2", "name":"- -  Băng tải PVC"},
        {"id":"3", "name":"- -  Băng tải PU"},
        {"id":"4", "name":"- -  Băng tải lưới"},
        {"id":"4", "name":"- -  Băng tải thành phẩm"},
        {"id":"5", "name":"Động cơ băng tải"},
        {"id":"6", "name":"- -  Động Cơ SPG"},
        {"id":"7", "name":"- -  Động Cơ ZD"},
        {"id":"8", "name":"- -  Động Cơ LUYANG"},
        {"id":"9", "name":"- -  Động Cơ Wanshsin"},
        {"id":"5", "name":"Phụ Kiện Băng Tải"},
        {"id":"6", "name":"- -  Con Lăn Băng Tải"},
        {"id":"7", "name":"- -  Pulley Đai Răng"},
        {"id":"8", "name":"- -  Dây Đai"},
        {"id":"9", "name":"- -  Gân Dẫn Hướng"},
        {"id":"5", "name":"Hệ thống băng tải"},
        {"id":"5", "name":"Nhôm Định Hình"},
        {"id":"5", "name":"Thảm Cao Su ESD"},
    ]
    const menus = [
        {"href":"abc.html", "name": "Trang chủ"},
        {"href":"abc.html", "name": "Về chúng tôi"},
        {"href":"abc.html", "name": "Sản phẩm", "children": [
            {"href":"abc.html", "name": "Dây băng tải", "children":[
                {"href":"abc.html", "name": "Băng tải PVC"},
                {"href":"abc.html", "name": "Băng tải PU"},
                {"href":"abc.html", "name": "Băng tải lưới"},
                {"href":"abc.html", "name": "Băng tải thành phẩm"},
            ]},
            {"href":"abc.html", "name": "Động cơ băng tải", "children":[
                {"href":"abc.html", "name": "Động Cơ SPG"},
                {"href":"abc.html", "name": "Động Cơ ZD"},
                {"href":"abc.html", "name": "Động Cơ LUYANG"},
                {"href":"abc.html", "name": "Động Cơ Wanshsin"},
            ]},
            {"href":"abc.html", "name": "Phụ Kiện Băng Tải", "children":[
                {"href":"abc.html", "name": "Con Lăn Băng Tải"},
                {"href":"abc.html", "name": "Pulley Đai Răng"},
                {"href":"abc.html", "name": "Dây Đai"},
                {"href":"abc.html", "name": "Gân Dẫn Hướng"},
            ]},
            {"href":"abc.html", "name": "Hệ thống băng tải"},
            {"href":"abc.html", "name": "Nhôm Định Hình"},
            {"href":"abc.html", "name": "Thảm Cao Su ESD"},
        ]},
        {"href":"abc.html", "name": "Bản vẽ kỹ thuật"},
        {"href":"/detail", "name": "Tin tức"},
        {"href":"/detail", "name": "Liên hệ"},
    ]
    function RecursiveComponent({ items, inner }) {
        return items.map((item) => (            
            <DisplayItem  menuItem = {item} inner = {inner}/>
        ))
    }
    function DisplayItem({menuItem, inner}) {
        if (menuItem.children) {
            if (!inner) {
                return (
                    <li class="dropdown-holder"><a class="hasChild" href={menuItem.href}>{menuItem.name}</a>
                        <ul class="hb-dropdown">
                            <RecursiveComponent items = {menuItem.children} inner = {true}/>
                        </ul>
                    </li>
                )
            } else {
                return (
                    <li class="sub-dropdown-holder"><a href={menuItem.href}>{menuItem.name}</a>
                        <ul class="hb-dropdown hb-sub-dropdown">
                            <RecursiveComponent items = {menuItem.children} inner = {true}/>
                        </ul>
                    </li>
                )
            }
        } else {
            return (
                <li><a href={menuItem.href}>{menuItem.name}</a></li>
            )
        }
    }

    return (
        <div class="body-wrapper">
            <header>
                <div class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="logo pb-sm-30 pb-xs-30">
                                    <a href="/">
                                        <img src="images/menu/logo/3.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                                <form action="#" class="hm-searchbox">
                                    <select class="nice-select select-search-category">
                                        {options.map((opt) => (
                                            <option value={opt.id}>{opt.name}</option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Nhập từ khóa tìm kiếm ..." />
                                    <button class="li-btn" type="submit"><i class="fa fa-search"></i></button>
                                </form>
                                <div class="header-middle-right">
                                    <ul class="hm-menu">
                                        <li class="hm-wishlist">
                                            <a href="wishlist.html">
                                                <span class="cart-item-count wishlist-item-count">0</span>
                                                <i class="fa fa-heart-o"></i>
                                            </a>
                                        </li>
                                        <li class="hm-minicart">
                                            <div class="hm-minicart-trigger">
                                                <span class="item-icon"></span>
                                                <span class="item-text">800.000đ
                                                    <span class="cart-item-count">2</span>
                                                </span>
                                            </div>
                                            <span></span>
                                            <div class="minicart">
                                                <ul class="minicart-product-list">
                                                    <li>
                                                        <a href="single-product.html" class="minicart-product-image">
                                                            <img src="images/product/small-size/5.jpg" alt="cart products" />
                                                        </a>
                                                        <div class="minicart-product-details">
                                                            <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                                                            <span>£40 x 1</span>
                                                        </div>
                                                        <button class="close" title="Remove">
                                                            <i class="fa fa-close"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <a href="single-product.html" class="minicart-product-image">
                                                            <img src="images/product/small-size/6.jpg" alt="cart products" />
                                                        </a>
                                                        <div class="minicart-product-details">
                                                            <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                                                            <span>£40 x 1</span>
                                                        </div>
                                                        <button class="close" title="Remove">
                                                            <i class="fa fa-close"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                                <p class="minicart-total">SUBTOTAL: <span>£80.00</span></p>
                                                <div class="minicart-button">
                                                    <a href="shopping-cart.html" class="li-button li-button-fullwidth li-button-dark">
                                                        <span>View Full Cart</span>
                                                    </a>
                                                    <a href="checkout.html" class="li-button li-button-fullwidth">
                                                        <span>Checkout</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-bottom header-sticky d-none d-lg-block d-xl-block">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="hb-menu">
                                    <nav>
                                        <ul>
                                            {<RecursiveComponent items = {menus} inner = {false}/>}                                            
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobile-menu-area d-lg-none d-xl-none col-12">
                    <div class="container">
                        <div class="row">
                            <div class="mobile-menu">
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderSection