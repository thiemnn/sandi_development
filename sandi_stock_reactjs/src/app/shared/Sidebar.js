import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/providers', state: 'providersOpen'},
      {path:'/customers', state: 'customersOpen'},
      {path:'/employees', state: 'employeesOpen'},
      {path:'/categories', state: 'categoriesOpen'},
      {path:'/stocks', state: 'stocksOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo-sandi.png")} /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-sandi-small.png")} /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                    <img className="img-xs rounded-circle" src={ require("../../assets/images/faces/face8.jpg")} alt="profile" />
                      <div className="dot-indicator bg-success"></div>
                    </div>
                    <div className="text-wrapper">
                      <p className="profile-name">Allen Moreno</p>
                      <p className="designation">Premium user</p>
                    </div>
                    
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="d-flex">
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                        <i className="mdi mdi-account-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-alarm-check mr-0"></i>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Manage Accounts
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Check Inbox
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          <li className={ this.isPathActive('/providers') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.providersOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('providersOpen') } data-toggle="collapse">
              <i className="mdi mdi-truck menu-icon"></i>
              <span className="menu-title">Nhà cung cấp</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.providersOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/providers/insert') ? 'nav-link active' : 'nav-link' } to="/providers/insert">Thêm mới nhà cung cấp</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/providers/list') ? 'nav-link active' : 'nav-link' } to="/providers/list">Danh sách nhà cung cấp</Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/customers') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.customersOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('customersOpen') } data-toggle="collapse">
              <i className="mdi mdi-account-card-details menu-icon"></i>
              <span className="menu-title">Khách hàng</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.customersOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/customers/insert') ? 'nav-link active' : 'nav-link' } to="/customers/insert">Thêm mới khách hàng</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/customers/list') ? 'nav-link active' : 'nav-link' } to="/customers/list">Danh sách khách hàng</Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/employees') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.employeesOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('employeesOpen') } data-toggle="collapse">
              <i className="mdi mdi-account-multiple menu-icon"></i>
              <span className="menu-title">Nhân viên</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.employeesOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/employees/list') ? 'nav-link active' : 'nav-link' } to="/employees/list">Danh sách nhân viên</Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/categories') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.categoriesOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('categoriesOpen') } data-toggle="collapse">
              <i className="mdi mdi-puzzle menu-icon"></i>
              <span className="menu-title">Danh mục</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.categoriesOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/categories/materials') ? 'nav-link active' : 'nav-link' } to="/categories/materials">Danh mục vật tư</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/categories/commercials') ? 'nav-link active' : 'nav-link' } to="/categories/commercials">Danh mục hàng hóa</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/categories/products') ? 'nav-link active' : 'nav-link' } to="/categories/products">Danh mục sản phẩm</Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/stocks') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.stocksOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('stocksOpen') } data-toggle="collapse">
              <i className="mdi mdi-store menu-icon"></i>
              <span className="menu-title">Quản lý kho</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.stocksOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/stocks/list') ? 'nav-link active' : 'nav-link' } to="/stocks/list">Danh sách kho</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/stocks/listImport') ? 'nav-link active' : 'nav-link' } to="/stocks/listImport">Phiếu nhập kho</Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);