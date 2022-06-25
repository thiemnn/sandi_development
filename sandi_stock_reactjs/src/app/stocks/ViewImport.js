import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { useHistory } from "react-router-dom";
import Common from '../../utils/common';

function View(props) {

  //#region state manager  
  let history = useHistory();
  const [transaction, setTransaction] = useState({});
  const [transaction_details, setTransactionDetails] = useState([]);
  const [deliver_code_label, setDeliverCodeLabel] = useState('Mã nhân viên');
  const [deliver_name_label, setDeliverNameLabel] = useState('Tên nhân viên giao hàng');

  useEffect(() => {
    let transaction_id = parseInt(props.match.params.id);
    fetchTransactions(transaction_id)
  }, [])

  function handleReturn(){
    history.push('/stocks/listImport')
  }

  function fetchTransactions(transaction_id) {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'stocks_transactions/' + transaction_id).then((data) => {
        if (data.success) {
          console.log(data.data)
          setTransaction(data.data.transaction)
          setTransactionDetails(data.data.transaction_details)
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
        } else {
          console.log(data)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Phiếu nhập kho {transaction.transaction_number}</h3>
        <div>
          <button type="button" className="btn btn-primary btn-icon small_button" style={{ margin: '0px 10px' }} ><i className="mdi mdi-content-save"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button"  onClick={handleReturn}><i className="mdi mdi-keyboard-return"></i></button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample">
                <Form.Group className="row">
                  <label htmlFor="transaction_number" className="col-sm-2">Số chứng từ</label>
                  <div className="col-sm-4">
                    {transaction.transaction_number}
                  </div>
                  <label htmlFor="transaction_date" className="col-sm-2">Ngày chứng từ</label>
                  <div className="col-sm-4">
                    {Common.prettyDate(transaction.transaction_date)}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="transaction_type" className="col-sm-2">Loại nhập kho</label>
                  <div className="col-sm-4">
                    {Common.convertTransType(transaction.transaction_type)}
                  </div>
                  <label htmlFor="field" className="col-sm-2">Nhập hàng tại kho</label>
                  <div className="col-sm-4">
                    {transaction.stock_name}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="deliver_unit_code" className="col-sm-2">{deliver_code_label}</label>
                  <div className="col-sm-4">
                    {transaction.deliver_unit_code}
                  </div>
                  <label htmlFor="deliver_unit_name" className="col-sm-2">{deliver_name_label}</label>
                  <div className="col-sm-4">
                    {transaction.deliver_unit_name}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  {(transaction.transaction_type !== 1 && transaction.transaction_type !== 5) && (
                    <>
                      <label htmlFor="name" className="col-sm-2">Người giao hàng</label>
                      <div className="col-sm-4">
                        {transaction.deliver_person}
                      </div>
                    </>
                  )}
                  <label htmlFor="explain" className="col-sm-2">Diễn giải</label>
                  <div className="col-sm-4">
                    {transaction.transaction_explain}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label htmlFor="attach" className="col-sm-2">Kèm theo</label>
                  <div className="col-sm-4">
                    {transaction.transaction_attach}
                  </div>
                  <label htmlFor="explain" className="col-sm-2">Trạng thái</label>
                  <div className="col-sm-4">
                    {Common.convertStatus(transaction.status)}
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
                        {transaction_details.map(function (item, i) {
                          return (
                            <tr key={"item-" + i}>
                              <td className='center'>
                                {i + 1}
                              </td>
                              <td className='relative'>
                                {item.material_code}
                              </td>
                              <td className='relative'>
                                {item.material_name}
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
                              {item.quantity}
                              </td>
                              <td className='right'>
                                {item.unit_to_kg}
                              </td>
                              <td className='right'>
                                {(Math.round(Common.removeNonNumeric(item.quantity) * item.unit_to_kg * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 })}
                              </td>
                              <td className='center'>
                              {item.position_code}
                              </td>
                              <td className='right'>
                              {item.price}
                              </td>
                              <td className='right'>
                                {(Math.round(Common.removeNonNumeric(item.quantity) * Common.removeNonNumeric(item.price) * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 })}
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
    </div>
  )
}

export default View
