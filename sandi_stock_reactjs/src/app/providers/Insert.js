import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { fetchWrapper } from '../../utils/fetch-wrapper';

export class Insert extends Component {

//#region state manager
  state = {
    cate_types:[],
    cate_fields:[],
    cate_regions:[],
    code:'',
    name:'',
    address:'',
    remark:'',
    email:'',
    tax_code:'',
    phone:'',
    type_id:0,
    field_id:0,
    region_id:0,
    items: [{full_name: '', position: '', mobile: '', email: ''}]
  };

  setCode = data =>{
    this.setState({
      code: data
    });
  };

  setName = data =>{
    this.setState({
      name: data
    });
  };

  setAddress = data =>{
    this.setState({
      address: data
    });
  };

  setRemark = data =>{
    this.setState({
      remark: data
    });
  };

  setEmail = data =>{
    this.setState({
      email: data
    });
  };

  setTaxCode = data =>{
    this.setState({
      tax_code: data
    });
  };

  setPhone = data =>{
    this.setState({
      phone: data
    });
  };

  setTypeId = data =>{
    this.setState({
      type_id: data.value
    });    
  }

  setFieldId = data =>{
    this.setState({
      field_id: data.value
    });    
  }

  setRegionId = data =>{
    this.setState({
      region_id: data.value
    });    
  }
//#endregion
  
//#region main process
  componentDidMount() {
    console.log(this.props)
    this.fetchGeneralCate()    
  }

  async fetchGeneralCate(){
    try {    
      fetchWrapper.get(process.env.REACT_APP_API_URL + "general_cate").then((data) => {
        if (data.success) {
          const types = data.data.filter(
            (cate) => cate.cate_type === 1
          );
          const cate_types = types.map(s => ({value: s.cate_key, label: s.cate_name}));
          const fields = data.data.filter(
            (cate) => cate.cate_type === 2
          );
          const cate_fields = fields.map(s => ({value: s.cate_key, label: s.cate_name}));
          const regions = data.data.filter(
            (cate) => cate.cate_type === 3
          );
          const cate_regions = regions.map(s => ({value: s.cate_key, label: s.cate_name}));
          this.setState({
            cate_types: [{ value: 0, label: 'Ch???n ...' },...cate_types],
            cate_fields: [{ value: 0, label: 'Ch???n ...' },...cate_fields],
            cate_regions: [{ value: 0, label: 'Ch???n ...' },...cate_regions]
          });
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  async insertProvider() {
    const body = {
      code: this.state.code,
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      tax_code: this.state.tax_code,
      phone: this.state.phone,
      remark: this.state.remark,
      type_id: this.state.type_id,
      field_id: this.state.field_id,
      region_id: this.state.region_id,
      contacts: this.state.items
    }
    fetchWrapper.post(process.env.REACT_APP_API_URL + 'providers/insert', body).then((data) => {
      if (data.success) {
        this.props.history.push("/providers/list");
      }
    })
  }

  handleSave(){
    this.insertProvider();
  }

  handleReturn(){
    this.props.history.push("/providers/list");
  }

  defaulOption = { value: '0', label: 'Ch???n ...' }
  //#endregion

//#region manage items
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

  handleDeleteItem(i) {
    var items = this.state.items;
    items.splice(i, 1);
    this.setState({
      items: items
    });
  }

  handleAddItem() {
    var items = this.state.items;
    items.push({full_name: '', position: '', mobile: '', email: ''});
    this.setState({
      items: items
    });
  }
//#endregion
  
  render() {
    var context = this;
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Th??m m???i nh?? cung c???p</h3>
          <div>
          <button type="button" className="btn btn-primary btn-icon small_button" style={{margin: '0px 10px'}} onClick={this.handleSave.bind(this)}><i className="mdi mdi-content-save"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button" onClick={this.handleReturn.bind(this)}><i className="mdi mdi-keyboard-return"></i></button>
          </div>          
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label htmlFor="code" className="col-sm-2 col-form-label">M?? nh?? cung c???p</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" value={this.state.code} onChange={e => this.setCode(e.target.value)} placeholder="" />
                    </div>
                    <label htmlFor="type" className="col-sm-2 col-form-label">Lo???i nh?? cung c???p</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.defaulOption}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.state.cate_types}
                      onChange={e => this.setTypeId(e)}
                    />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">T??n nh?? cung c???p</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" value={this.state.name} onChange={e => this.setName(e.target.value)} placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="field" className="col-sm-2 col-form-label">L??nh v???c ho???t ?????ng</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.defaulOption}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.state.cate_fields}
                      onChange={e => this.setFieldId(e)}
                    />
                    </div>
                    <label htmlFor="region" className="col-sm-2 col-form-label">V??ng mi???n</label>
                    <div className="col-sm-4">
                    <Select
                      defaultValue={this.defaulOption}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      options={this.state.cate_regions}
                      onChange={e => this.setRegionId(e)}
                    />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="address" className="col-sm-2 col-form-label">?????a ch???</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" value={this.state.address} onChange={e => this.setAddress(e.target.value)} placeholder="" />
                    </div>
                  </Form.Group>                  
                  <Form.Group className="row">
                    <label htmlFor="remark" className="col-sm-2 col-form-label">Ghi ch??</label>
                    <div className="col-sm-10">
                      <Form.Control type="text" className="form-control" value={this.state.remark} onChange={e => this.setRemark(e.target.value)} placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" value={this.state.email} onChange={e => this.setEmail(e.target.value)} placeholder="" />
                    </div>
                    <label htmlFor="tax_code" className="col-sm-2 col-form-label">M?? s??? thu???</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" value={this.state.tax_code} onChange={e => this.setTaxCode(e.target.value)} placeholder="" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">S??? ??i???n tho???i</label>
                    <div className="col-sm-4">
                      <Form.Control type="text" className="form-control" value={this.state.phone} onChange={e => this.setPhone(e.target.value)} placeholder="" />
                    </div>
                    <label htmlFor="status" className="col-sm-2 col-form-label">Tr???ng th??i</label>
                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          <i className="input-helper"></i>
                          Ho???t ?????ng
                        </label>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="submit" className="col-sm-2 col-form-label">Ng?????i li??n l???c</label>
                    <div className="col-sm-10">
                      <div className="table-responsive">
                        <table className="table table-bordered inside_table">
                          <thead>
                            <tr>
                              <th style={{width: '50px'}}> STT </th>
                              <th> H??? v?? t??n </th>
                              <th> Ch???c v??? </th>
                              <th> ??i???n tho???i </th>
                              <th> Email </th>
                              <th style={{width: '50px'}}> Thao t??c </th>
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
                                    <button type="button" className="btn btn-danger btn-icon small_button" onClick={context.handleDeleteItem.bind(context, i)}><i className="mdi mdi-delete"></i></button>                            
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='right_button'>
                      <button type="button" className="btn btn-primary btn-icon small_button" onClick={this.handleAddItem.bind(this)}><i className="mdi mdi-plus-box"></i></button>
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
