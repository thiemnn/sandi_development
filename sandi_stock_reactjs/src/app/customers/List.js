import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import DataTable from 'react-data-table-component';
import { useHistory } from "react-router-dom";
import Alert from '../components/Alert';

function List() {

  const [selected_customer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  let history = useHistory();

  function handleInsert() {
    history.push("/customers/insert");
  }

  function handleEdit() {
    if (!selected_customer) {
      setAlertMessage('Vui lòng chọn khách hàng để sửa')
      setAlertShow(true)
      return;
    }
    history.push("/customers/edit/" + selected_customer.id);
  }

  function handleView() {
    if(!selected_customer){      
      setAlertMessage('Vui lòng chọn khách hàng để xem')
      setAlertShow(true)
      return;
    }
    history.push("/customers/edit/" + selected_customer.id);
  }

  function handleDelete() {
    if(!selected_customer){
      setAlertMessage('Vui lòng chọn khách hàng để xóa')
      setAlertShow(true)
      return;
    } 
    history.push("/customers/edit/" + selected_customer.id);
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  function fetchCustomers() {
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'customers').then((data) => {
      if (data.success) {
        console.log(data.data)
        setCustomers(data.data)
      }
    })
  }

  const columns = [
    {
      name: 'Mã khách hàng',
      selector: row => row.code,
      sortable: true,
    },
    {
      name: 'Tên khách hàng',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Địa chỉ',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Loại khách hàng',
      selector: row => row.type_name,
      sortable: true,
    },
    {
      name: 'Lĩnh vực',
      selector: row => row.field_name,
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '40px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        borderLeft: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        '&:last-of-type': {
          borderRight: '1px solid #ccc',
        },
        fontSize: '16px'
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        borderLeft: '1px solid #ccc',
        '&:last-of-type': {
          borderRight: '1px solid #ccc',
        },
        fontSize: '16px'
      },
    },
  };


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Danh sách khách hàng </h3>
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
                  {/* <DataTable
                      columns={this.columns}
                      data={customers}
                      customStyles={this.customStyles}
                    /> */}
                  <table className="table table-bordered table-hover customers">
                    <thead>
                      <tr>
                        <th style={{ width: '50px' }}> STT </th>
                        <th style={{ width: '80px' }}> Mã KH </th>
                        <th style={{ width: '50%' }}> Tên KH </th>
                        <th style={{ width: '50%' }}> Địa chỉ </th>
                        <th style={{ width: '120px' }}> Loại KH </th>
                        <th style={{ width: '120px' }}> Lĩnh vực </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(function (customer, index) {
                        return (
                          <tr key={"customer-" + index} className={selected_customer && selected_customer.id === customer.id ? 'selected-row' : ''} onClick={() => setSelectedCustomer(customer)}>
                            <td className='center'>
                              {index + 1}
                            </td>
                            <td>
                              {customer.code}
                            </td>
                            <td>
                              {customer.name}
                            </td>
                            <td>
                              {customer.address}
                            </td>
                            <td>
                              {customer.type_name}
                            </td>
                            <td>
                              {customer.field_name}
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
