import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import Modal from '../components/Modal';

function Insert() {

  //#region state manager  

  const [showStockGroupModel, setShowStockGroupModel] = useState(false);
  const [items, setItems] = useState([]);
  //const items = [{ code: 'adfsdsdfdf', name: 'adfasdfaddf' }];
  const [styles, setStyles] = useState(null);
  const [input_material_name, setInputMaterialName] = useState('');
  const [input_material_code, setInputMaterialCode] = useState('');
  const [products, setProducts] = useState([]);
  const [filter_products, setFilterProducts] = useState([]);
  //#endregion
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");
  
  function handleItemsChange(index, event) {
    let items_copy = [...items];
    let item = { ...items_copy[index] };
    if (event.target.name === "quantity") {
      const re = /^[0-9,]*\.?[0-9]?[0-9]?$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        console.log(event.target.value)
        item = { ...item, [event.target.name]: addCommas(removeNonNumeric(event.target.value)) };
        //(1234.56789).toLocaleString('en', { maximumFractionDigits: 2 })
        items_copy[index] = item;
        setItems(items_copy)
      }
    } else {
      item = { ...item, [event.target.name]: event.target.value };
      items_copy[index] = item;
      setItems(items_copy)
    }
  }

  function fetchGeneralCate() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + "general_cate").then((data) => {
        if (data.success) {
          const types = data.data.filter(
            (cate) => cate.cate_type === 1
          );
          const cate_types = types.map(s => ({ value: s.cate_key, label: s.cate_name }));
          const fields = data.data.filter(
            (cate) => cate.cate_type === 2
          );
          const cate_fields = fields.map(s => ({ value: s.cate_key, label: s.cate_name }));
          const regions = data.data.filter(
            (cate) => cate.cate_type === 3
          );
          const cate_regions = regions.map(s => ({ value: s.cate_key, label: s.cate_name }));
          this.setState({
            cate_types: [{ value: 0, label: 'Chọn ...' }, ...cate_types],
            cate_fields: [{ value: 0, label: 'Chọn ...' }, ...cate_fields],
            cate_regions: [{ value: 0, label: 'Chọn ...' }, ...cate_regions]
          });
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  function insertProvider() {
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

  function handleSave() {
    this.insertProvider();
  }

  function handleReturn() {
    this.props.history.push("/providers/list");
  }

  const defaulOption = { value: '0', label: 'Chọn ...' }
  //#endregion

  //#region manage items
  function handleItemFullNameChanged(i, event) {
    var items = this.state.items;
    items[i].full_name = event.target.value;
    this.setState({
      items: items
    });
  }

  function handleItemPositionChanged(i, event) {
    var items = this.state.items;
    items[i].position = event.target.value;
    this.setState({
      items: items
    });
  }

  function handleItemEmailChanged(i, event) {
    var items = this.state.items;
    items[i].email = event.target.value;
    this.setState({
      items: items
    });
  }

  function handleItemMobileChanged(i, event) {
    var items = this.state.items;
    items[i].mobile = event.target.value;
    this.setState({
      items: items
    });
  }

  function handleDeleteItem(i) {
    var items = this.state.items;
    items.splice(i, 1);
    this.setState({
      items: items
    });
  }

  function handleAddItem() {
    var items = this.state.items;
    items.push({ full_name: '', position: '', mobile: '', email: '' });
    this.setState({
      items: items
    });
  }
  //#endregion

  function handleOpenStockModel() {
    let elem = document.querySelector('#input_material_name');
    let rect = elem.getBoundingClientRect();
    setStyles({
      position: 'absolute',
      bottom: window.innerHeight - rect.top + 10,
      left: rect.left
    })
    console.log(rect)
    setShowStockGroupModel(true)
  }

  useEffect(() => {
    const temp_products = products.filter(
      (product) => product.name.toLowerCase().includes(input_material_name.toLowerCase())
    );
    setFilterProducts(temp_products)
  }, [input_material_name])

  useEffect(() => {
    const temp_products = products.filter(
      (product) => product.code.toLowerCase().includes(input_material_code.toLowerCase())
    );
    setFilterProducts(temp_products)
  }, [input_material_code])

  useEffect(() => {
    fetchProducts();
  }, [])

  function setSelectedProduct(product) {
    console.log(product)
    var temps = items;
    temps.push({ code: product.code, name: product.name, unit: product.unit, unit_to_kg: product.unit_to_kg, tk_co: product.tk_co, tk_no: product.tk_no, quantity: ''});
    setItems(temps);
    setShowStockGroupModel(false)
  }

  function fetchProducts() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'products?type=1').then((data) => {
        if (data.success) {
          setProducts(data.data)
          setFilterProducts(data.data)
        } else {
          console.log(data)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  function onFocus() {    
    let elem = document.querySelector('#input_material_code');
    let rect = elem.getBoundingClientRect();
    const position = window.pageYOffset;
    setStyles({
      position: 'absolute',
      bottom: window.innerHeight - rect.top + 10 - position,
      left: rect.left
    })
    setShowStockGroupModel(true)
  }

  function onBlur() {

  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Thêm mới phiếu nhập kho</h3>
        <div>
          <button type="button" className="btn btn-primary btn-icon small_button" style={{ margin: '0px 10px' }} ><i className="mdi mdi-content-save"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button" ><i className="mdi mdi-keyboard-return"></i></button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample">
                <Form.Group className="row">
                  <label htmlFor="code" className="col-sm-2 col-form-label">Số chứng từ</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                  <label htmlFor="field" className="col-sm-2 col-form-label">Nhập hàng tại kho</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Người giao hàng</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                  <label htmlFor="name" className="col-sm-2 col-form-label">Đơn vị</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Địa chỉ</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="address" className="col-sm-2 col-form-label">Diễn giải</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="remark" className="col-sm-2 col-form-label">Kèm theo</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Chi tiết phiếu nhập kho</h4>
              <Form.Group className="row">
                <div className="col-sm-12">
                  <div className="table-responsive">
                    <table className="table table-bordered inside_table max_content">
                      <thead>
                        <tr>
                          <th style={{ width: '50px' }}> STT </th>
                          <th style={{ width: '250px' }}> Mã VT </th>
                          <th style={{ width: '450px' }}> Tên VT </th>
                          <th style={{ width: '80px' }}> TK nợ </th>
                          <th style={{ width: '80px' }}> TK có </th>
                          <th style={{ width: '50px' }}> DVT </th>
                          <th style={{ width: '150px' }}> SL </th>
                          <th style={{ width: '80px' }}> HSQĐ(kg) </th>
                          <th style={{ width: '150px' }}> SLQĐ(kg) </th>
                          <th style={{ width: '150px' }}> Vị trí </th>
                          <th style={{ width: '150px' }}> Đơn giá </th>
                          <th style={{ width: '150px' }}> Thành tiền </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(function (item, i) {
                          return (
                            <tr key={"item-" + i}>
                              <td className='center'>
                                {i + 1}
                              </td>
                              <td className='relative'>
                                <button type="button" className="btn btn-danger btn-icon line_inside_button" ><i className="mdi mdi-window-close"></i></button>{item.code}
                              </td>
                              <td className='relative'>
                                {/* <button type="button" className="btn btn-primary btn-icon line_inside_button"><i className="mdi mdi-plus"></i></button> */}
                                {item.name}
                              </td>
                              <td className='center'>
                                {item.tk_no}
                              </td>
                              <td className='center'>
                                {item.tk_co}
                              </td>
                              <td className='center'>
                                {item.unit}
                              </td>
                              <td>
                                <Form.Control type="text" name="quantity" value={item.quantity} onChange={(e) => handleItemsChange(i, e)} className="form-control" placeholder="" />
                              </td>
                              <td className='center'>
                                {item.unit_to_kg}
                              </td>
                              <td  className='center'>
                                {(Math.round(removeNonNumeric(item.quantity) * item.unit_to_kg * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 }) }
                              </td>
                              <td>
                                <Form.Control type="text" className="form-control" placeholder="" />
                              </td>
                              <td>
                                <Form.Control type="text" className="form-control" placeholder="" />
                              </td>
                              <td>
                              {(1234.56789).toLocaleString('en', { maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}

                        <tr className='no-border-row'>
                          <td className='center'>

                          </td>
                          <td>
                            <Form.Control id="input_material_code"
                              value={input_material_code}
                              onFocus={() => onFocus()}
                              onBlur={() => onBlur()}
                              onChange={(e) => setInputMaterialCode(e.target.value)}
                              type="text"
                              className="form-control"
                              placeholder="" />
                          </td>
                          <td>
                            <Form.Control id="input_material_name"
                              value={input_material_name}
                              onFocus={() => onFocus()}
                              onBlur={() => onBlur()}
                              onChange={(e) => setInputMaterialName(e.target.value)}
                              type="text"
                              className="form-control"
                              placeholder="" />
                          </td>
                          <td>
                            {/* <button type="button" id='add_new_line' className="btn btn-primary btn-icon small_button" onClick={() => handleOpenStockModel()}><i className="mdi mdi-plus-box"></i></button> */}
                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <Modal showOverlay={false} style={styles} size={'md'} show={showStockGroupModel} onClose={() => { setShowStockGroupModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            Chọn vật tư
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive" style={{ maxHeight: '250px' }}>
            <table className="table table-bordered table-hover selectable inside_table">
              <thead>
                <tr>
                  <th style={{ width: '250px' }}> Mã VT </th>
                  <th style={{ width: '450px' }}> Tên VT </th>
                </tr>
              </thead>
              <tbody>
                {filter_products.map(function (product, i) {
                  return (
                    <tr key={"item-" + i} onClick={() => setSelectedProduct(product)}>
                      <td className='relative'>{product.code}</td>
                      <td className='relative'>{product.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Insert
