import React, { Component } from 'react'

export class List extends Component {

  state = {
    providers:[]
  };
  
  handleInsert(){
    this.props.history.push("/providers/insert");
  }

  handleEdit(data, event){
    this.props.history.push("/providers/edit/" + data.id);
  }

  handleDelete(data, event){
    console.log(data)
    //this.props.history.push("/providers/edit/" + data.id);
  }

  componentDidMount() {
    this.fetchProviders()    
  }
  async fetchProviders(){
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "providers");
      const data = await response.json();      
      this.setState({
        providers: data.data
      });
      console.log(this.state.providers)
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    var context = this;
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Danh sách nhà cung cấp </h3>      
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
                          <th style={{ width: '80px' }}> Mã NCC </th>
                          <th style={{ width: '50%' }}> Tên NCC </th>
                          <th style={{ width: '50%' }}> Địa chỉ </th>
                          <th style={{ width: '120px' }}> Loại NCC </th>
                          <th style={{ width: '120px' }}> Lĩnh vực </th>
                          <th style={{ width: '60px' }}> Thao tác </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.providers.map(function (provider, index) {
                          return (
                            <tr key={"provider-" + index}>
                              <td className='center'>
                                {index + 1}
                              </td>
                              <td>
                                {provider.code}
                              </td>
                              <td>
                                {provider.name}
                              </td>
                              <td>
                                {provider.address}
                              </td>
                              <td>
                                {provider.type_name}
                              </td>
                              <td>
                                {provider.field_name}
                              </td>
                              <td className='center'>
                                <button type="button" className="btn btn-success btn-icon small_button" onClick={context.handleEdit.bind(context, provider)}><i className="mdi mdi-pencil"></i></button>
                                <button type="button" className="btn btn-danger btn-icon small_button ml-10" onClick={context.handleDelete.bind(context, provider)}><i className="mdi mdi-delete"></i></button>
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
