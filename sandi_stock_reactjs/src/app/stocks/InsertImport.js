import React, { useRef, useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import Modal from '../components/Modal';

function Insert() {

  //#region state manager  

  const [showMaterialSelectModel, setShowMaterialSelectModel] = useState(false);
  const [showPositionSelectModel, setShowPositionSelectModel] = useState(false);
  const [items, setItems] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectPositionRow, setSelectPositionRow] = useState(-1);
  //const items = [{ code: 'adfsdsdfdf', name: 'adfasdfaddf' }];
  const [styles, setStyles] = useState(null);
  const [input_material_name, setInputMaterialName] = useState('');
  const [input_material_code, setInputMaterialCode] = useState('');
  const [products, setProducts] = useState([]);
  const [filter_products, setFilterProducts] = useState([]);
  const [stock_transaction, setStockTransaction] = useState({
    id: 0,
    transaction_number: "",
    stock_id: "",
    deliver_person: "",
    deliver_unit: "",
    deliver_address: "",
    explain: "",
    attach: ""
  });
  const handleStockTransactionChange = (event) => {
    event.persist();
    setStockTransaction({ ...stock_transaction, [event.target.name]: event.target.value });
  };
  const wrapperRef = useRef(null);
  const wrapperPositionRef = useRef(null);
  //#endregion
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

  function handleItemsChange(index, event) {
    let items_copy = [...items];
    let item = { ...items_copy[index] };
    if (event.target.name === "quantity" || event.target.name === "price") {
      const re = /^[0-9,]*\.?[0-9]?[0-9]?$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        item = { ...item, [event.target.name]: addCommas(removeNonNumeric(event.target.value)) };
        items_copy[index] = item;
        setItems(items_copy)
      }
    } else {
      item = { ...item, [event.target.name]: event.target.value };
      items_copy[index] = item;
      setItems(items_copy)
    }
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
    fetchPositions();
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectPositionRow])

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      let input_material_code = document.querySelector('#input_material_code');
      let input_material_name = document.querySelector('#input_material_name');
      if (!input_material_code.contains(event.target) && !input_material_name.contains(event.target)) {
        setShowMaterialSelectModel(false)
      }
    }
    if (selectPositionRow >= 0 && wrapperPositionRef.current && !wrapperPositionRef.current.contains(event.target)) {
      let input_position = document.querySelector('#position_' + selectPositionRow);
      if (!input_position.contains(event.target)) {
        setShowPositionSelectModel(false)
      }
    }
  }

  function setSelectedProduct(product) {
    var temps = items;
    temps.push({
      code: product.code,
      name: product.name,
      unit: product.unit,
      unit_to_kg: product.unit_to_kg,
      tk_co: product.tk_co,
      tk_no: product.tk_no,
      quantity: '',
      price: '',
      position: ''
    });
    setItems(temps);
    setShowMaterialSelectModel(false)
    setInputMaterialCode('')
    setInputMaterialName('')
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

  function fetchPositions() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'stock_shelfs/').then((data) => {
        if (data.success) {
          setPositions(data.data)
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
    setShowMaterialSelectModel(true)
  }

  function onPositionFocus(index, event) {
    let rect = event.target.getBoundingClientRect();
    const position = window.pageYOffset;
    setStyles({
      position: 'absolute',
      bottom: window.innerHeight - rect.top + 10 - position,
      left: rect.right - 500
    })
    setSelectPositionRow(index)
    setShowPositionSelectModel(true)
  }

  function setSelectedPosition(position) {
    let items_copy = [...items];
    let item = { ...items_copy[selectPositionRow] };
    item = { ...item, 'position': position.code };
    items_copy[selectPositionRow] = item;
    setItems(items_copy)
    setShowPositionSelectModel(false)
    setInputMaterialCode('')
    setInputMaterialName('')
  }

  function handlePositionChange(i, e) {
    e.persist();
  }

  function handleSaveStockTransaction() {
    console.log(stock_transaction)
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Thêm mới phiếu nhập kho</h3>
        <div>
          <button type="button" onClick={() => handleSaveStockTransaction()} className="btn btn-primary btn-icon small_button" style={{ margin: '0px 10px' }} ><i className="mdi mdi-content-save"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button" ><i className="mdi mdi-keyboard-return"></i></button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample">
                <Form.Group className="row">
                  <label htmlFor="transaction_number" className="col-sm-2 col-form-label">Số chứng từ</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" name="transaction_number" value={stock_transaction.transaction_number} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                  <label htmlFor="field" className="col-sm-2 col-form-label">Nhập hàng tại kho</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Người giao hàng</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" name="deliver_person" value={stock_transaction.deliver_person} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                  <label htmlFor="name" className="col-sm-2 col-form-label">Đơn vị</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" name="deliver_unit" value={stock_transaction.deliver_unit} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="deliver_address" className="col-sm-2 col-form-label">Địa chỉ</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" name="deliver_address" value={stock_transaction.deliver_address} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="explain" className="col-sm-2 col-form-label">Diễn giải</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" name="explain" value={stock_transaction.explain} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="attach" className="col-sm-2 col-form-label">Kèm theo</label>
                  <div className="col-sm-10">
                    <Form.Control type="text" name="attach" value={stock_transaction.attach} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
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
                                <Form.Control type="text" name="quantity" value={item.quantity} onChange={(e) => handleItemsChange(i, e)} className="form-control right" placeholder="" />
                              </td>
                              <td className='right'>
                                {item.unit_to_kg}
                              </td>
                              <td className='right'>
                                {(Math.round(removeNonNumeric(item.quantity) * item.unit_to_kg * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 })}
                              </td>
                              <td>
                                <Form.Control
                                  id={"position_" + i}
                                  type="text"
                                  autoComplete="off"
                                  value={item.position}
                                  onFocus={(event) => onPositionFocus(i, event)}
                                  onChange={(e) => handlePositionChange(i, e)}
                                  className="form-control"
                                  placeholder="" />
                              </td>
                              <td className='right'>
                                <Form.Control type="text" name="price" value={item.price} onChange={(e) => handleItemsChange(i, e)} className="form-control right" placeholder="" />
                              </td>
                              <td className='right'>
                                {(Math.round(removeNonNumeric(item.quantity) * removeNonNumeric(item.price) * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}

                        <tr className='no-border-row'>
                          <td className='center'>

                          </td>
                          <td>
                            <Form.Control id="input_material_code"
                              name='input_material_code'
                              value={input_material_code}
                              onFocus={() => onFocus()}
                              onChange={(e) => setInputMaterialCode(e.target.value)}
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              placeholder="" />
                          </td>
                          <td>
                            <Form.Control id="input_material_name"
                              name='input_material_name'
                              value={input_material_name}
                              onFocus={() => onFocus()}
                              onChange={(e) => setInputMaterialName(e.target.value)}
                              type="text"
                              className="form-control"
                              autoComplete="off"
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
      <div ref={wrapperRef}>
        <Modal showOverlay={false} style={styles} size={'md'} show={showMaterialSelectModel} onClose={() => { setShowMaterialSelectModel(false) }}>
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

      <div ref={wrapperPositionRef}>
        <Modal showOverlay={false} style={styles} size={'md'} show={showPositionSelectModel} onClose={() => { setShowPositionSelectModel(false) }}>
          <Modal.Header>
            <Modal.Title>
              Chọn vị trí kho
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive" style={{ maxHeight: '250px' }}>
              <table className="table table-bordered table-hover selectable inside_table">
                <thead>
                  <tr>
                    <th style={{ width: '250px' }}> Mã kệ </th>
                    <th style={{ width: '450px' }}> Tên kệ </th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map(function (position, i) {
                    return (
                      <tr key={"item-" + i} onClick={() => setSelectedPosition(position)}>
                        <td className='relative'>{position.code}</td>
                        <td className='relative'>{position.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
      </div>

    </div>
  )
}

export default Insert
