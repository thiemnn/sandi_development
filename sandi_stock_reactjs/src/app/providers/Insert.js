import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import Select from 'react-select';

export class Insert extends Component {

  state = {
    startDate: new Date(),
    testString: process.env.REACT_APP_TEST_STRING,
    code:'',
    items: [{full_name: '', position: '', mobile: '', email: ''}]
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  setCode = data =>{
    this.setState({
      code: data
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
    this.fetchUsers()
    this.postUser()
  }

  async fetchUsers() {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "providers");
      const data = await response.json();
      return console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }

  async postUser() {
    const body = {
      code: 'abc',
      name: 'abc',
      address: 'abc',
      email: 'abc',
      tax_code: 'abc',
      phone: 'abc',
      remark: 'abc',
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    const response = await fetch(process.env.REACT_APP_API_URL + 'providers/insert', requestOptions);
    const data = await response.json();
    return console.log(data);
  }

  types = [
    { value: '0', label: 'Chọn ...' },
    { value: '1', label: 'Loại 1' },
    { value: '2', label: 'Loại 2' },
    { value: '3', label: 'Loại 3' }
  ]
  fields = [
    { value: '0', label: 'Chọn ...' },
    { value: '1', label: 'Loại 1' },
    { value: '2', label: 'Loại 2' },
    { value: '3', label: 'Loại 3' }
  ]
  regions = [
    { value: '0', label: 'Chọn ...' },
    { value: '1', label: 'Loại 1' },
    { value: '2', label: 'Loại 2' },
    { value: '3', label: 'Loại 3' }
  ]

  handleItemFullNameChanged(i, event) {
    var items = this.state.items;
    items[i].full_name  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemPositionChanged(i, event) {
    var items = this.state.items;
    items[i].position  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemEmailChanged(i, event) {
    var items = this.state.items;
    items[i].email  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemMobileChanged(i, event) {
    var items = this.state.items;
    items[i].mobile  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items
    });
  }

  handleClick() {
    var items = this.state.items;

    items.push({full_name: '', position: '', mobile: '', email: ''});

    this.setState({
      items: items,
      message: "",
      code: ""
    });
  }

  render() {
    var context = this;
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Thêm mới nhà cung cấp</h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label htmlFor="code" className="col-sm-2 col-form-label">Mã nhà cung cấp</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" value={this.state.code} onChange={e => this.setCode(e.target.value)} id="code" placeholder="" />
                    </div>
                    <label htmlFor="type" className="col-sm-2 col-form-label">Loại nhà cung cấp</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.types[0]}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.types}
                    />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Tên nhà cung cấp</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" id="name" placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="field" className="col-sm-2 col-form-label">Lĩnh vực hoạt động</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.types[0]}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.types}
                    />
                    </div>
                    <label htmlFor="region" className="col-sm-2 col-form-label">Vùng miền</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.types[0]}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.types}
                    />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="address" className="col-sm-2 col-form-label">Địa chỉ</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" id="address" placeholder="" />
                    </div>
                  </Form.Group>                  
                  <Form.Group className="row">
                    <label htmlFor="remark" className="col-sm-2 col-form-label">Ghi chú</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" id="remark" placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" id="email" placeholder="" />
                    </div>
                    <label htmlFor="tax_code" className="col-sm-2 col-form-label">Mã số thuế</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" id="tax_code" placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Số điện thoại</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" id="phone" placeholder="" />
                    </div>
                    <label htmlFor="status" className="col-sm-2 col-form-label">Trạng thái</label>
                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          <i className="input-helper"></i>
                          Hoạt động
                        </label>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="submit" className="col-sm-2 col-form-label">Người liên lạc</label>
                    <div className="col-sm-10">
                      <div className="table-responsive">
                        <table className="table table-bordered inside_table">
                          <thead>
                            <tr>
                              <th style={{width: '50px'}}> STT </th>
                              <th> Họ và tên </th>
                              <th> Chức vụ </th>
                              <th> Điện thoại </th>
                              <th> Email </th>
                              <th style={{width: '50px'}}> Thao tác </th>
                            </tr>
                          </thead>
                          <tbody>    
                            {this.state.items.map(function(o, i) {
                              return (
                                <tr key={"item-" + i}>
                                  <td className='center'>
                                    {i + 1}
                                  </td>
                                  <td>
                                    <Form.Control type="text" value={o.full_name} onChange={context.handleItemFullNameChanged.bind(context, i)} className="form-control" placeholder="" />                                    
                                  </td>
                                  <td>
                                    <Form.Control type="text" value={o.position} onChange={context.handleItemPositionChanged.bind(context, i)} className="form-control" placeholder="" />                                    
                                  </td>
                                  <td>
                                    <Form.Control type="text" value={o.mobile} onChange={context.handleItemMobileChanged.bind(context, i)} className="form-control" placeholder="" />                                    
                                  </td>
                                  <td>
                                    <Form.Control type="text" value={o.email} onChange={context.handleItemEmailChanged.bind(context, i)} className="form-control" placeholder="" />                                    
                                  </td>
                                  <td>
                                    <button type="button" class="btn btn-danger btn-icon small_button" onClick={context.handleItemDeleted.bind(context, i)}><i class="mdi mdi-delete"></i></button>                            
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='right'>
                      <button type="button" class="btn btn-primary btn-icon small_button" onClick={this.handleClick.bind(this)}><i class="mdi mdi-plus-box"></i></button>
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="submit" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-4">
                      <button type="submit" className="btn btn-primary mr-2">Lưu</button>
                      <button className="btn btn-success">Quay lại</button>
                    </div>
                  </Form.Group>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Insert
