import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { useHistory } from "react-router-dom";
import Alert from '../components/Alert';
import Common from '../../utils/common';

function List() {

  const [selected_import, setSelectedImport] = useState(null);
  const [stockTransactions, setStockTransactions] = useState([]);
  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  let history = useHistory();

  function handleInsert() {
    history.push("/stocks/insertImportRequest");
  }

  function handleView() {
    if (!selected_import) {
      setAlertMessage('Vui lòng chọn phiếu đề nghị NK để xem')
      setAlertShow(true)
      return;
    }
    history.push("/stocks/viewImportRequest/" + selected_import.id);
  }

  function handleEdit() {
    if (!selected_import) {
      setAlertMessage('Vui lòng chọn phiếu đề nghị NK để sửa')
      setAlertShow(true)
      return;
    }
    history.push("/stocks/editImportRequest/" + selected_import.id);
  }

  function handleCreateImport(){
    if (!selected_import) {
      setAlertMessage('Vui lòng chọn phiếu đề nghị NK để tạo PNK')
      setAlertShow(true)
      return;
    }
    history.push("/stocks/createImport/" + selected_import.id);
  }

  useEffect(() => {
    fetchStockTransactions()
  }, [])

  function fetchStockTransactions() {
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'stocks_transaction_requests').then((data) => {
      if (data.success) {
        setStockTransactions(data.data)
      }
    })
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Danh sách Phiếu đề nghị NK </h3>
        <div className='fl-right mb-10'>
          <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm Phiếu Nhập Kho" onClick={() => handleInsert()}><i className="mdi mdi-plus-box"></i></button>
          <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Thêm Phiếu Nhập Kho" onClick={() => handleView()}><i className="mdi mdi-eye"></i></button>
          <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa Phiếu Nhập Kho" onClick={() => handleEdit()}><i className="mdi mdi-pencil"></i></button>
          <button type="button" className="btn btn-info btn-icon small_button ml-10" title="Tạo Nhập Kho" onClick={() => handleCreateImport()}>Tạo PNK</button>                    
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover customers">
                    <thead>
                      <tr>
                        <th style={{ width: '150px' }}> Trạng thái </th>
                        <th style={{ width: '150px' }}> Ngày chứng từ </th>
                        <th style={{ width: '150px' }}> Số chứng từ </th>
                        <th style={{ width: '150px' }}> Diễn giải </th>
                        <th style={{ width: '120px' }}> Đối tượng </th>
                        <th style={{ width: '120px' }}> Người giao hàng </th>
                        <th style={{ width: '120px' }}> Loại chứng từ </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockTransactions.map(function (stockTransaction, index) {
                        return (
                          <tr key={"stockTransaction-" + index} className={selected_import && selected_import.id === stockTransaction.id ? 'selected-row' : ''} onClick={() => setSelectedImport(stockTransaction)}>
                            <td className='center'>
                              {Common.convertStatusImportRequest(stockTransaction.status)}
                            </td>
                            <td className='center'>
                              {Common.prettyDate(stockTransaction.transaction_date)}
                            </td>
                            <td className='center'>
                              {stockTransaction.transaction_number}
                            </td>
                            <td>
                              {stockTransaction.transaction_explain}
                            </td>
                            <td>
                              {stockTransaction.deliver_unit_name}
                            </td>
                            <td>
                              {stockTransaction.deliver_person}
                            </td>                            
                            <td>
                              {Common.convertTransType(stockTransaction.transaction_type)}
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
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}

export default List
