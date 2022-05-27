import React, { Component } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import Select from 'react-select';

export class Insert extends Component {

  state = {
    startDate: new Date(),
    testString: process.env.REACT_APP_TEST_STRING,
    code:''
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

  render() {
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
