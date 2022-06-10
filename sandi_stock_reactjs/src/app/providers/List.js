import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DataTable from 'react-data-table-component';
import { useHistory } from "react-router-dom";
import Alert from '../components/Alert';

function List() {

  const [selected_provider, setSelectedProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  let history = useHistory();

  function handleInsert() {
    history.push("/providers/insert");
  }

  function handleEdit() {
    if (!selected_provider) {
      setAlertMessage('Vui lòng chọn đối tác để sửa')
      setAlertShow(true)
      return;
    }
    history.push("/providers/edit/" + selected_provider.id);
  }

  function handleDelete() {
    if (!selected_provider) {
      setAlertMessage('Vui lòng chọn đối tác để xóa')
      setAlertShow(true)
      return;
    }
    history.push("/providers/edit/" + selected_provider.id);
  }

  useEffect(() => {
    fetchProviders()
  }, [])

  function fetchProviders() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'providers').then((data) => {
        if (data.success) {
          setProviders(data.data)
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
        <h3 className="page-title"> Danh sách nhà cung cấp </h3>
        <div className='fl-right mb-10'>
          <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm nhóm hàng hóa" onClick={() => handleInsert()}><i className="mdi mdi-plus-box"></i></button>
          <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa nhóm hàng hóa" onClick={() => handleEdit()}><i className="mdi mdi-pencil"></i></button>
          {/* <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem nhóm hàng hóa" onClick={() => handleView()}><i className="mdi mdi-eye"></i></button> */}
          <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa nhóm hàng hóa" onClick={() => handleDelete()}><i className="mdi mdi-delete"></i></button>
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
                        <th style={{ width: '50px' }}> STT </th>
                        <th style={{ width: '80px' }}> Mã NCC </th>
                        <th style={{ width: '50%' }}> Tên NCC </th>
                        <th style={{ width: '50%' }}> Địa chỉ </th>
                        <th style={{ width: '120px' }}> Loại NCC </th>
                        <th style={{ width: '120px' }}> Lĩnh vực </th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map(function (provider, index) {
                        return (
                          <tr key={"provider-" + index} className={selected_provider && selected_provider.id === provider.id ? 'selected-row' : ''} onClick={() => setSelectedProvider(provider)}>
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
