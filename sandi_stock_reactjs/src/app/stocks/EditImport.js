import React, { useRef, useState, useEffect } from 'react'
import { Form, FormControl } from 'react-bootstrap';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import Common from '../../utils/common';

function Insert(props) {

  //#region state manager  
  let history = useHistory();
  const [showMaterialSelectModel, setShowMaterialSelectModel] = useState(false);
  const [showPositionSelectModel, setShowPositionSelectModel] = useState(false);
  const [items, setItems] = useState([]);

  //all the categories in form
  const [products, setProducts] = useState([]);
  const [positions, setPositions] = useState([]);

  const [selectPositionRow, setSelectPositionRow] = useState(-1);
  //const items = [{ code: 'adfsdsdfdf', name: 'adfasdfaddf' }];
  const [styles, setStyles] = useState(null);
  const [input_material_name, setInputMaterialName] = useState('');
  const [input_material_code, setInputMaterialCode] = useState('');

  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);

  const [deliver_code_label, setDeliverCodeLabel] = useState('Mã nhân viên');
  const [deliver_name_label, setDeliverNameLabel] = useState('Tên nhân viên giao hàng');

  const [filter_products, setFilterProducts] = useState([]);
  const today = new Date();
  const defaultDateValue = today.toISOString().split('T')[0];
  const [stock_transaction, setStockTransaction] = useState({
    id: 0,
    transaction_number: "PNK220624001",
    transaction_type: 5,
    stock_id: "",
    stock_name: "",
    deliver_unit_code: "",
    deliver_unit_name: "",
    deliver_person: "",
    transaction_date: defaultDateValue,
    explain: "",
    attach: "",    
    transaction_status: 1
  });
  const handleStockTransactionChange = (event) => {
    event.persist();
    if (event.target.name !== "stock_name" && event.target.name !== "deliver_unit_code" && event.target.name !== "deliver_unit_name") {
      setStockTransaction({ ...stock_transaction, [event.target.name]: event.target.value });
    }
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
    let transaction_id = parseInt(props.match.params.id);
    console.log(transaction_id)
    fetchTransactions(transaction_id)
  }, [])

  function fetchTransactions(transaction_id) {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'stocks_transactions/' + transaction_id).then((data) => {
        if (data.success) {
          console.log(data.data)
          let transaction = data.data.transaction
          let transaction_details = data.data.transaction_details
          const today = new Date(transaction.transaction_date);
          const defaultDateValue = today.toISOString().split('T')[0];
          setStockTransaction({
            ...stock_transaction,
            "id": transaction_id,
            "transaction_number": transaction.transaction_number,
            "transaction_type": transaction.transaction_type,
            "stock_id": transaction.stock_id,
            "stock_name": transaction.stock_name,
            "deliver_unit_code": transaction.deliver_unit_code,
            "deliver_unit_name": transaction.deliver_unit_name,
            "deliver_person": transaction.deliver_person,
            "transaction_date": defaultDateValue,
            "explain": transaction.transaction_explain,
            "attach": transaction.transaction_attach,
            "transaction_status": transaction.status
          });
          let transaction_type = data.data.transaction.transaction_type
          if (transaction_type === 1 || transaction_type === 5) {
            setDeliverCodeLabel('Mã nhân viên')
            setDeliverNameLabel('Tên nhân viên giao hàng')
          }
          if (transaction_type === 3 || transaction_type === 4) {
            setDeliverCodeLabel('Mã khách hàng')
            setDeliverNameLabel('Tên khách hàng')
          }
          if (transaction_type === 2) {
            setDeliverCodeLabel('Mã đối tác')
            setDeliverNameLabel('Tên đối tác')
          }
          var temps = [];
          transaction_details.forEach(element => {
            temps.push({
              index: temps[temps.length - 1] ? temps[temps.length - 1].index + 1 : 1,
              code: element.material_code,
              name: element.material_name,
              unit: element.unit,
              unit_to_kg: element.unit_to_kg,
              tk_co: element.tk_co,
              tk_no: element.tk_no,
              quantity_expect: addCommas(removeNonNumeric(element.quantity_expect)),
              quantity: addCommas(removeNonNumeric(element.quantity)),
              price: addCommas(removeNonNumeric(element.price)),
              position: element.position_code
            });
          });
          setItems(temps);
        } else {
          console.log(data)
        }
      })
    } catch (error) {
      console.error(error);
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
    fetchPositions();
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectPositionRow])

  function handleClickOutside(event) {
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
      index: items[items.length - 1] ? items[items.length - 1].index + 1 : 1,
      code: product.code,
      name: product.name,
      unit: product.unit,
      unit_to_kg: product.unit_to_kg,
      tk_co: product.tk_co,
      tk_no: product.tk_no,
      quantity: '',
      quantity_expect: '',
      price: '',
      position: ''
    });
    setItems(temps);
    setShowMaterialSelectModel(false)
    setInputMaterialCode('')
    setInputMaterialName('')
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
    const body = {
      transaction_number: stock_transaction.transaction_number,
      stock_id: stock_transaction.stock_id,
      transaction_type: stock_transaction.transaction_type,
      deliver_unit_code: stock_transaction.deliver_unit_code,
      deliver_unit_name: stock_transaction.deliver_unit_name,
      deliver_person: stock_transaction.deliver_person,
      transaction_date: stock_transaction.transaction_date,
      transaction_attach: stock_transaction.attach,
      transaction_explain: stock_transaction.explain,
      transaction_status: stock_transaction.transaction_status,
      materials: items
    }
    try {
      fetchWrapper.put(process.env.REACT_APP_API_URL + 'stocks_transactions/' + stock_transaction.id + '/update', body).then((data) => {
        if (data.success) {
          history.push("/stocks/listImport");
        } else {
          setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
          setAlertShow(true)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const status = [
    { value: 1, label: "Nháp" },
    { value: 2, label: "Xác nhận" },
    { value: 3, label: "Đã nhập" },
    { value: -1, label: "Hủy bỏ" }
  ]

  function handleReturn() {
    history.push('/stocks/listImport')
  }

  function setTransactionStatus(e){
    setStockTransaction({ ...stock_transaction, "transaction_status": e.value });
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Sửa phiếu nhập kho</h3>
        <div>
          <button type="button" onClick={() => handleSaveStockTransaction()} className="btn btn-primary btn-icon small_button" style={{ margin: '0px 10px' }} ><i className="mdi mdi-content-save"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button" onClick={handleReturn}><i className="mdi mdi-keyboard-return"></i></button>
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
                    <Form.Control type="text" autoComplete="off" name="transaction_number" value={stock_transaction.transaction_number} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                  <label htmlFor="transaction_date" className="col-sm-2 col-form-label">Ngày chứng từ</label>
                  <div className="col-sm-4">
                    <Form.Control type="date" autoComplete="off" name="transaction_date" value={stock_transaction.transaction_date} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="transaction_type" className="col-sm-2 col-form-label">Loại nhập kho</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{Common.convertTransType(stock_transaction.transaction_type)}</div>
                  </div>
                  <label htmlFor="field" className="col-sm-2 col-form-label">Nhập hàng tại kho</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{stock_transaction.stock_name}</div>
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="deliver_unit_code" className="col-sm-2 col-form-label">{deliver_code_label}</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{stock_transaction.deliver_unit_code}</div>
                  </div>
                  <label htmlFor="deliver_unit_name" className="col-sm-2 col-form-label">{deliver_name_label}</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{stock_transaction.deliver_unit_name}</div>
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  {(stock_transaction.transaction_type !== 1 && stock_transaction.transaction_type !== 5) && (
                    <>
                      <label htmlFor="name" className="col-sm-2 col-form-label">Người giao hàng</label>
                      <div className="col-sm-4">
                        <Form.Control type="text" autoComplete="off" name="deliver_person" value={stock_transaction.deliver_person} onChange={handleStockTransactionChange} className="form-control" placeholder="" />
                      </div>
                    </>
                  )}
                  <label htmlFor="explain" className="col-sm-2 col-form-label">Diễn giải</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{stock_transaction.transaction_explain}</div>
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="attach" className="col-sm-2 col-form-label">Kèm theo</label>
                  <div className="col-sm-4">
                    <div className='form_value'>{stock_transaction.transaction_attach}</div>
                  </div>
                  <label htmlFor="explain" className="col-sm-2 col-form-label">Trạng thái</label>
                  <div className="col-sm-4">
                    <Select
                      defaultValue={status[0]}                      
                      value={status.filter((item) => item.value === stock_transaction.transaction_status)[0]}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="transaction_status"
                      options={status}                      
                      onChange={e => setTransactionStatus(e)} 
                    />
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
                          <th style={{ width: '150px' }}> SL đề xuất</th>
                          <th style={{ width: '150px' }}> SL thực nhập</th>
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
                                {item.code}
                              </td>
                              <td className='relative'>
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
                              <td className='right'>
                                {item.quantity_expect}
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

      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}

export default Insert
