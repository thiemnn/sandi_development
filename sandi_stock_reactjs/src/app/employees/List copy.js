import React, {useState,Component } from 'react'
import 'react-complex-tree/lib/style.css';
import { UncontrolledTreeEnvironment, ControlledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';

const readOrganization = (template, data = { items: {} }) => {
  template.map((organization, i) => {    
    data.items[organization.id.toString()] = {
      "index": organization.id.toString(),
      "desc" : organization.description,
      "name" : organization.name,
      "code" : organization.code,
      "canMove": true,
      "hasChildren": organization.childs && organization.childs.length > 0 ? true : false,
      "children": organization.childs && organization.childs.length > 0 ? organization.childs : null,
      "data": organization.name,
      "canRename": true,
    };
  })
  return data.items;
};

function DisplayTree({organizations}) {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  if (organizations && Object.keys(organizations).length > 0) {
    return (
      <ControlledTreeEnvironment
        items={organizations}
        getItemTitle={item => item.data}
        viewState={{
          ['tree_organizations']: {
            focusedItem,
            expandedItems,
            selectedItems,
          },
        }}
        defaultInteractionMode={'click-arrow-to-expand'}
        onFocusItem={item => setFocusedItem(item.index)}
        onExpandItem={item => setExpandedItems([...expandedItems, item.index])}
        onCollapseItem={item =>
          setExpandedItems(expandedItems.filter(expandedItemIndex => expandedItemIndex !== item.index))
        }
        onSelectItems={items => setSelectedItems(items)}
      >
        <Tree treeId="tree_organizations" rootItem="12" treeLabel="Cơ cấu tổ chức" />
      </ControlledTreeEnvironment>
    )
  }
  else {
    return (
      <></>
    )
  }
}



export class List extends Component {

  state = {
    ran_number: 0,
    customers: [],
    insert: false,
    update: false,
    organizations: {},
    origin_organizations: [],
    show_model: false,
    selected_organization_ids: [],
    organization_code: '',
    organization_name: '',
    organization_desc: ''
  }; 

  setOrganizationCode = data =>{
    this.setState({
      organization_code: data
    });
  };

  setOrganizationName = data =>{
    this.setState({
      organization_name: data
    });
  };

  setOrganizationDesc = data =>{
    this.setState({
      organization_desc: data
    });
  };
  
  handleInsert(){
    this.props.history.push("/customers/insert");
  }

  handleEdit(data, event){
    this.props.history.push("/customers/edit/" + data.id);
  }

  handleDelete(data, event){    
    //this.props.history.push("/customers/edit/" + data.id);
  }

  handleOpenOrganizationModel(data, event){
    this.setState({
      insert: true,
      organization_code: '',
      organization_name: '',
      organization_desc: '',
      show_model: true
    })
  }
  handleCloseOrganizationModel(data, event){
    this.setState({
      show_model: false
    })
  }
  async InsertOrganization() {
    const body = {
      code: this.state.organization_code,
      name: this.state.organization_name,
      description: this.state.organization_desc,
      parent_id: 2
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    const response = await fetch(process.env.REACT_APP_API_URL + 'organizations/insert', requestOptions);
    const data = await response.json();
    this.fetchOrganization();
  }
  handleSaveOrganization(data, event){
    // var is_insert = this.state.insert
    // var is_update = this.state.update
    // this.setState({
    //   show_model: false,
    //   insert: false,
    //   update: false
    // })
    // if (is_insert) {
    //   // if(this.state.selected_organization_ids.length < 1){
    //   //   console.log('Please select parrent organization')
    //   //   return
    //   // }
    //   this.InsertOrganization();      
    // }
    // if(is_update){

    // }
    // console.log({
    //   origin_organizations: this.state.origin_organizations,
    //   organization_code: this.state.organization_code,
    //   organization_name: this.state.organization_name,
    //   organization_desc: this.state.organization_desc,
    //   selected_organization_ids: this.state.selected_organization_ids
    // })
    this.setState({
      show_model: false
    })
    this.InsertOrganization();
  }

  setSelectedItems(data){
    console.log(data)
    // this.setState({
    //   selected_organization_ids: data
    // });
  }
  

  componentDidMount() {
    this.fetchCustomers()    
    this.fetchOrganization()    
  }

  async fetchCustomers(){
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "customers");
      const data = await response.json();      
      this.setState({
        customers: data.data
      });
    } catch (error) {
      console.error(error);
    }
  }

  async fetchOrganization(){
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "organizations");
      const data = await response.json();      
      this.setState({
        ren_number: 1 + Math.random() * (100 - 1),
        organizations: readOrganization(data.data.organizations)
      });

      console.log(this.state.organizations)
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Quản lý nhân viên </h3>  
        </div>
        <div className="row">
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Cơ cấu tổ chức</h4>
                <style>{`
                  :root {        
                    --rct-item-height: 32px;
                  }
                  .rct-tree-item-li {
                    font-size: 1.2rem;
                  }
                `}</style>
                { 
                  <DisplayTree organizations={this.state.organizations}/>
                  // <UncontrolledTreeEnvironment
                  //   dataProvider={new StaticTreeDataProvider(this.state.organizations, (item, data) => ({ ...item, data }))}
                  //   getItemTitle={item => item.data}
                  //   viewState={{}}
                  //   defaultInteractionMode={'click-arrow-to-expand'}
                  //   onSelectItems={items => this.setSelectedItems(items)}
                  // >
                  //   <Tree treeId="tree_view_1" rootItem="12" treeLabel="This is tree example" />
                  // </UncontrolledTreeEnvironment>
                }
                <div style={{ margin: '10px 0px 0px 0px' }}>
                  <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleOpenOrganizationModel.bind(this)}><i className="mdi mdi-plus-box"></i> Thêm</button>
                  <button type="button" className="btn btn-success btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }} onClick={this.handleOpenOrganizationModel.bind(this)}><i className="mdi mdi-pencil"></i> Sửa</button>
                  <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }} onClick={this.handleOpenOrganizationModel.bind(this)}><i className="mdi mdi-eye"></i> Xem</button>                  
                  <button type="button" className="btn btn-primary btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }} onClick={this.handleOpenOrganizationModel.bind(this)}><i className="mdi mdi-settings"></i> Phân quyền</button>

                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div>
                  <h4 className="card-title" style={{ float: "left" }}>Danh sách nhân viên</h4>
                  <div style={{ float: "right", margin: "10px 10px 10px 10px" }}>
                    <button type="button" className="btn btn-primary btn-icon small_button"><i className="mdi mdi-plus-box"></i> Thêm</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Họ và tên</th>
                        <th>Tài khoản</th>
                        <th>Giới tính</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>Phạm Thị Hoài</td>
                        <td>hoaipt@sandi.com</td>
                        <td>Nữ</td>
                        <td className='center'>
                          <button type="button" className="btn btn-success btn-icon small_button" ><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-warning btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-account-key"></i></button>                          
                          <button type="button" className="btn btn-danger btn-icon small_button" style={{ margin: '0px 0px 0px 10px' }}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* md, lg, sm */}
        <Modal showOverlay={true} size={'md'} show={this.state.show_model} onClose={this.handleCloseOrganizationModel.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              Thêm tổ chức
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <label htmlFor="address" className="col-form-label">Mã tổ chức</label>
              <Form.Control type="text" value={this.state.organization_code} onChange={e => this.setOrganizationCode(e.target.value)} className="form-control" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label htmlFor="address" className="col-form-label">Tên tổ chức</label>
              <Form.Control type="text" value={this.state.organization_name} onChange={e => this.setOrganizationName(e.target.value)} className="form-control" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label htmlFor="address" className="col-form-label">Mô tả</label>
              <textarea className="form-control" value={this.state.organization_desc} onChange={e => this.setOrganizationDesc(e.target.value)} rows="4"></textarea>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleSaveOrganization.bind(this)}>Lưu</button>
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={this.handleCloseOrganizationModel.bind(this)}>Đóng</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default List
