import React, { Component } from 'react';
import { fetchWrapper } from '../../utils/fetch-wrapper';

export class List extends Component {

  state = { 
    customers:[],
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

  componentDidMount() {
    this.fetchCustomers()
  }

  fetchCustomers(){
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'customers').then((data) => {
      if (data.success) {
        this.setState({
          customers: data.data
        });
      }
    })
  }

  render() {
    var context = this;
    return (
      <div>   
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
                                <button type="button" className="btn btn-danger btn-icon small_button ml-10" onClick={context.handleDelete.bind(context, customer)}><i className="mdi mdi-delete"></i></button>
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
