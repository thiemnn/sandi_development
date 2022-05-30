import React, { Component } from 'react'
import 'react-complex-tree/lib/style.css';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';

const readOrganization = (template, data = { items: {} }) => {
  template.map((organization, i) => {    
    data.items[organization.id.toString()] = {
      "index": organization.id.toString(),
      "canMove": true,
      "hasChildren": organization.childs && organization.childs.length > 0 ? true : false,
      "children": organization.childs && organization.childs.length > 0 ? organization.childs : null,
      "data": organization.name,
      "canRename": true,
    };
  })
  return data;
};

export class List extends Component {

  state = { 
    customers:[],
    organizations:[],
    show_model:false
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

  handleOpenModel(data, event){
    this.setState({
      show_model: true
    })
  }
  handleCloseModel(data, event){
    this.setState({
      show_model: false
    })
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
        organizations: readOrganization(data.data.organizations)
      });
    } catch (error) {
      console.error(error);
    }
  }

  setSelectedItems(data){
    console.log(data)
  }

  render() {
    var context = this;
    var tree_data = this.state.organizations.items
    return (
      <div>
        <style>{`
        :root {        
          --rct-item-height: 32px;
        }
        .rct-tree-item-li {
          font-size: 1.2rem;
        }
      `}</style>
        {tree_data &&
          <UncontrolledTreeEnvironment
            dataProvider={new StaticTreeDataProvider(tree_data, (item, data) => ({ ...item, data }))}
            getItemTitle={item => item.data}
            viewState={{}}
            defaultInteractionMode={'click-arrow-to-expand'}
            onSelectItems={items => this.setSelectedItems(items)}
          >
            <Tree treeId="tree_view_1" rootItem="1" treeLabel="This is tree example" />
          </UncontrolledTreeEnvironment>
        }        

        <Modal showOverlay={true} show={this.state.show_model} onClose={this.handleCloseModel.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              Thêm tổ chức
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <label htmlFor="address" className="col-form-label">Họ và tên</label>
              <Form.Control type="text" className="form-control" placeholder="" />
            </Form.Group>
            <Form.Group>
              <label htmlFor="address" className="col-form-label">Địa chỉ</label>
              <Form.Control type="text" className="form-control" placeholder="" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleCloseModel.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>

        <div>
          <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleOpenModel.bind(this)}>Thêm tổ chức</button>
          <button type="button" className="btn btn-primary btn-icon small_button" style={{ margin: '10px 10px' }} onClick={this.handleOpenModel.bind(this)}>Thêm tài khoản</button>
          <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleOpenModel.bind(this)}>Phân quyền cho tổ chức</button>
        </div>  

        <div className="page-header">
          <h3 className="page-title"> Danh sách khách hàng </h3>      
          <div>
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleInsert.bind(this)}><i className="mdi mdi-plus-box"></i></button>
          </div>          
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: '50px' }}> STT </th>
                          <th style={{ width: '80px' }}> Mã KH </th>
                          <th style={{ width: '50%' }}> Tên KH </th>
                          <th style={{ width: '50%' }}> Địa chỉ </th>
                          <th style={{ width: '120px' }}> Loại KH </th>
                          <th style={{ width: '120px' }}> Lĩnh vực </th>
                          <th style={{ width: '60px' }}> Thao tác </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.customers.map(function (customer, index) {
                          return (
                            <tr key={"customer-" + index}>
                              <td className='center'>
                                {index + 1}
                              </td>
                              <td>
                                {customer.code}
                              </td>
                              <td>
                                {customer.name}
                              </td>
                              <td>
                                {customer.address}
                              </td>
                              <td>
                                {customer.type_name}
                              </td>
                              <td>
                                {customer.field_name}
                              </td>
                              <td className='center'>
                                <button type="button" className="btn btn-success btn-icon small_button" onClick={context.handleEdit.bind(context, customer)}><i className="mdi mdi-pencil"></i></button>
                                <button type="button" className="btn btn-danger btn-icon small_button" onClick={context.handleDelete.bind(context, customer)} style={{ margin: '0px 10px' }}><i className="mdi mdi-delete"></i></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </form>                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default List
